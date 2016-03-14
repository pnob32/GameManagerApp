// router js file... routes url changes to given functions
define([
  'jquery',     // lib/jquery/jquery 
  'underscore', // lib/underscore/underscore
  'backbone',   // lib/backbone/backbone
  'views/userview'
], function($, _, Backbone, EditUserView){
  
  var editUserView = new EditUserView();
  
  var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'edit': 'editUser',
      'create-account': 'createUser',
      'login': 'userLogin',
      // Default
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function() {
    console.log("creating routes");
    var router = new Router;
    router.on('route:home', function() {
      console.log('home page');
    });
    router.on('route:editUser', function() {
      console.log("edit user");
      editUserView.render({id: null});
    });
    router.on('route:createUser', function () {
      console.log("create user");
      editUserView.render({id: null});
      //editUser.render({id: id});
    });
    router.on('route:userLogin', function () {
      editUserView.render({id: null});
      //editUser.render({id: id});
    });
    router.on('route:defaultAction', function(actions) {
      console.log('No route:', actions);
    });
    
    // tell backbone to start listening for routes
    Backbone.history.start();
    console.log("Backbone running");
  };
  
  return {
    initialize: initialize
  };
});
