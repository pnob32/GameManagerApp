// edit user template

define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',   // lib/backbone/backbone
  'userutils',
  // MVC
  'models/usermodel',
  'collections/usercollection',
  // template import
  'text!./../../templates/usercreation.html',
  'text!./../../templates/userlogin.html'
], function($, _, Backbone, UserUtils, User, Users, usercreationTemplate, userloginTemplate){

	/*$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };*/
  
  var router;
  
  var EditUserView = Backbone.View.extend({
    el: '.page',
    
    setRouter: function (r) {
      router = r;
    },
    
    events: {
      //'click #usr-submit': 'saveUser',
      'submit .edit-user-form': 'saveUser',
      'submit .login-user-form': 'loginUser',
      'click .delete': 'deleteUser'
    },
    
    saveUser: function (ev) { // event listener gets event object
      
      //var userDetails = $(ev.currentTarget).serializeObject();
      var userDetails = {
        firstname: $('#usr-fname').val(),
        lastname: $('#usr-lname').val(),
        age: $('#usr-age').val(),
        email: $('#usr-email').val()
      };
      
      console.log("editting user - click event");
      console.log(userDetails);
      
      user = new User();
      user.save(userDetails, {
        success: function (user) {
          console.log("user save success");
          router.navigate('', {trigger:true});
        },
        
        error: function (errorcode) {
          console.log("user save threw error");
          console.log(errorcode);
        }
      });
      return false;
    },
    
    loginUser: function (ev) {  // event listener for login template submit
      
      
      console.log("logging in user");
      var that = this;
      
      //router.navigate('#/login/' + $('#usr-email').val(), {trigger:true});
      
      /*var userEmail = {
        email: $('#usr-email').val()
      }
      
      
      user = new User({email: options.email)});
      user.fetch({
        success: function (user) {
          console.log("successfully got user:");
          console.log(user);
          UserUtils.currentUser = user;
        },
        
        error: function (errorcode) {
          console.log("unable to find user in server");
        }
      });*/
    },
    
    authenticateUser: function (credentials) {
      var that = this;
      this.$el.children().detach();
      
      this.user = new User({email: credentials.email});
      this.user.fetch({
        success: function (user) {
          var userObj = {user: user};
          that.$el.append('welcome!');
        },
        error: function (errorcode) {
          console.log("could not find user");
        }
      })
    },
    
    deleteUser: function (ev) {
      console.log("deleting user");

      this.user.destroy({
        success: function () {
          router.navigate('', {trigger:true});
        }
      });
      return false;
    },
    
    renderEdit: function (options) {
      console.log("rendering edit user view");
      var that = this;
      this.$el.children().detach();
      if (options.id) {
        
        console.log("in userEdit render func: user has id");

         // GET details
         that.user = new User({id: options.id});
         that.user.fetch({
          success: function (user) {
            var userObj = {user: user};
            var compiledTemplate = _.template(usercreationTemplate, userObj);
            that.$el.append(compiledTemplate);
            //that.$el.html(that.template(userObj));
          }
         })
      } else {
        user = new User();
        
        console.log("in userEdit render func: user null");

        var compiledTemplate = _.template(usercreationTemplate);
        compiledTemplate({user: user});// userObj);
        this.$el.append(compiledTemplate);
        //this.$el.html(this.template(userObj));
      }
    },

    renderLogin: function(options) {
      console.log("rendering login user view");
      this.$el.children().detach();
      
      user = new User();
      
      var compiledTemplate = _.template(userloginTemplate);
      this.$el.append(compiledTemplate);
    },
    
    renderLogout: function(options) {
      console.log("user trying to log out");
    },
    
    unRender: function() {
      this.$el.children().detach();
    }
  });
  
  return EditUserView;
});
