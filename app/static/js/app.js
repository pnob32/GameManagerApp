// app.js
// controller js script that initializes out of main...
// outsources from other require.js modules to make stuff work

define([
  'jquery',     // lib/jquery/jquery
  'router'      // request router.js
], function($, Router){
  var initialize = function() {
    // AJAX prefilter defined here... might not need this anymore
    /*$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
      options.url = 'http://backbone-beginner.herokuapp.com' + options.url;
    });*/
    
    console.log("initializing router");
    Router.initialize();
    console.log(Router);
  }
  return {
    initialize: initialize
  };
});