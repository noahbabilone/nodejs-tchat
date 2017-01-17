define(["knockout", "text!./index.html", "hasher", "bootstrap", "bootbox", "alertify"], function (ko, template, hasher, bootstrap, bootbox, alertify) {
  function channelListViewModel(params) {
    var self = this;
    
    self.channels = ko.observableArray();


    self.Load = function () {
        $.get('/api/channel/all').done(function(items) {
            self.channels(items);
        });
    }

    self.CreateChannel = function() {
        bootbox.prompt('Channel Name', function(value) {
            if(value != null)
                $.ajax({
                    type: "POST",
                    url : "/api/channel/create",
                    contentType : 'application/json',
                    dataType : 'json',
                    data : JSON.stringify({ name : value}),
                    success : function() {
                        alertify.success("Channel created with success");
                        self.Load();
                    },
                    error : function(err) {
                        // alertify.error("Failed to create channel");
                        if(err.responseJSON.error.code == 11000)
                            bootbox.alert("The channel " + value + " already exists, Dumbass !");
                    }
                });
        });
    }

    self.Load();
  }
  
  return { viewModel: channelListViewModel, template: template };
});