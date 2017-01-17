define(["knockout", "text!./index.html", "hasher", "bootstrap", "bootbox", "socketio"], function (ko, template, hasher, bootstrap, bootbox, socketio) {
    function channelViewModel(params) {
        var self = this;

        self.id = ko.observable(params.id);
        self.name = ko.observable(params.name);

        self.entry = ko.observable();
        self.messages = ko.observableArray();
        self.owner = ko.observable();
        // var socketio = new io.Socket();
        var socket = socketio.connect("http://localhost:1337");

        self.Load = function () {
            $.get('/api/channel/messages/' + self.name()).done(function (items) {
                self.messages(items);
            }).fail(function (err) {
                if (err.responseJSON.status == 401) {
                    bootbox.confirm("Join channel ?", function (result) {
                        if (result) {
                            $.post("/api/channel/join/" + self.name()).done(function () {
                                self.Load();
                            });
                        }
                    });
                }
            });
            socket.on('new-message',function (message) {
                console.log("new-message"); 
                console.log(message); 
            });
        }

        self.Post = function () {
            $.ajax({
                type: "POST",
                url: "/api/channel/post/" + self.name(),
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({content: self.entry()}),
                success: function (item) {
                    socket.emit('message', {message: item});
                    self.messages.push(item);
                    self.entry("");
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }

        setInterval(function () {
            self.Load();
        }, 2000);

        self.Load();


    }

    return {viewModel: channelViewModel, template: template};
});