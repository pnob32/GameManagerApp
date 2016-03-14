// User collection definition

define([
  'backbone',         // lib/backbone/backbone
  'models/usermodel'  // 
], function(Backbone, User){
  
  var Users = Backbone.Collection.extend({
    url: '/users',
    model: User
  });
  
  return Users;
});