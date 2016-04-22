// utility functions for handling user login state

define([
  'jquery',     // lib/jquery/jquery
], function($){
  // changeState takes in a user model argument and handles view changes based on user login state
  // user: null --> user logged out
  // user: exists --> given user is logged in
  var changeState = function(user) {
    if (user) {
      console.log("user logged in");
    }
    else {
      console.log("user logged out");
    }
  };
  
  var currentUser = null; // current user id - null by default until signin occurs
  
  return {
    changeState: changeState,
    currentUser: currentUser
  };
});