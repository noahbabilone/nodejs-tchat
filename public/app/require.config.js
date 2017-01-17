var require = ({
    waitSeconds: 200,
    shim: {
        'sbadmin': {deps: ['jquery', 'bootstrap']},
        'socketio': {exports: 'io'}
    },
    paths: {
        jquery: '../../bower_components/jquery/dist/jquery.min',
        knockout: '../../bower_components/knockout/dist/knockout.debug',
        bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap',
        crossroads: "../../bower_components/crossroads/dist/crossroads",
        signals: "../../bower_components/js-signals/dist/signals",
        hasher: "../../bower_components/hasher/dist/js/hasher",
        text: '../../bower_components/text/text',
        moment: '../../bower_components/moment/moment',
        bootbox: '../../bower_components/bootbox.js/bootbox',
        sbadmin: '../../javascripts/sb-admin-2',
        socketio: '../../bower_components/socket.io-client/dist/socket.io',
        alertify: '../../bower_components/alertify/alertify'
    }
});