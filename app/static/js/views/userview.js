// edit user template

define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',   // lib/backbone/backbone
  // MVC
  'models/usermodel',
  'collections/usercollection',
  // template import
  'text!./../../templates/userlist.html'
], function($, _, Backbone, User, Users, userlistTemplate){
  
  var EditUserView = Backbone.View.extend({
    el: '.page',

    events: {
      'submit .edit-user-form': 'saveUser',
      'click .delete': 'deleteUser'
    },
    
    saveUser: function (ev) { // event listener gets event object
      console.log("editting user");

      var userDetails = $(ev.currentTarget).serializeObject();

      user = new User();
      user.save(userDetails, {
        success: function (user) {
          router.navigate('', {trigger:true});
        }
      });
      return false;
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
    
    render: function (options) {
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
            var compiledTemplate = _.template(userlistTemplate, userObj);
            that.$el.append(compiledTemplate);
            //that.$el.html(that.template(userObj));
          }
         })
      } else {
        user = new User();
        
        console.log("in userEdit render func: user null");

        var compiledTemplate = _.template(userlistTemplate);
        compiledTemplate({user: user});// userObj);
        this.$el.append(compiledTemplate);
        //this.$el.html(this.template(userObj));
      }
    }
  });
  
  return EditUserView;
});
