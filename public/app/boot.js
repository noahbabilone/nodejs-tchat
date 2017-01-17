define(['jquery', 'knockout', './router'], function ($, ko, router) {
  
  ko.components.register('channel', { require: 'views/channel/index' });
  ko.components.register('channelList', { require: 'views/channelList/index' });
  ko.applyBindings({ route: router.currentRoute }, document.getElementById('page'));
  

});