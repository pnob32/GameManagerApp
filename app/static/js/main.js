// config file for require.js 
// initializes dependecies 

require.config({
  shim: {
    "bootstrap": { "deps" :['jquery']}
  },
  paths: {
    jquery: 'libs/jquery/jquery',
    bootstrap: 'libs/bootstrap/bootstrap',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone'
  }
});

require([
  'jquery',
  'app',
  'bootstrap'
], function($, App) {
  // DOM ready...
  $(function() {
    console.log("initializing app");
    App.initialize();
  });
});