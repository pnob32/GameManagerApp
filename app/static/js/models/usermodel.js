// User Model definition

define([
  'backbone',   // lib/backbone/backbone
], function(Backbone){
  var User = Backbone.Model.extend({
    urlRoot: '/users'
  });
  
  return User;
});