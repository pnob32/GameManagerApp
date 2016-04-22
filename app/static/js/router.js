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
      //'login/:email': 'authentication',
      //'logout': 'userLogout',
      // Default
      '*actions': 'defaultAction'
    }
  });
  
  var router = new Router()
  
  var initialize = function() {
    
    editUserView.setRouter(router);
    
    console.log("creating routes");
    router.on('route:home', function() {
      editUserView.unRender();
    });
    router.on('route:editUser', function() {
      console.log("edit user");
      editUserView.renderEdit({id: null});
    });
    router.on('route:createUser', function () {
      console.log("create user");
      editUserView.renderEdit({id: null});
      //editUser.render({id: id});
    });
    router.on('route:userLogin', function () {
      editUserView.renderLogin();
    });
    /*router.on('route:authentication', function (email) {
      console.log("authenticating user: " + email);
      editUserView.authenticateUser({email: email});
    });*/
    /*router.on('route:userLogout', function () {
      editUserView.logout();
    });*/
    router.on('route:defaultAction', function(actions) {
      console.log('No route:', actions);
    });
    
    // tell backbone to start listening for routes
    Backbone.history.start();
    console.log("Backbone running");
  };
  
  return {
    initialize: initialize,
		router: router
  };
});
