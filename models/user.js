'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "username cannot be empty"
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "email cannot be empty"
        },
        isEmail: {
          msg: "please enter a complete email address"
        }
      }
    },
    profileId: {
      type:DataTypes.INTEGER,
    }
  }, {
    classMethods: {
      // associate: function(models) {
      //   // associations can be defined here
      //   User.hasOne(models.Profile, {
      //     foreignKey: "userId"
      //   });
      // }
    }
  });
  
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Profile, {
      foreignKey: "userId"
    });
  };
  
  return User;
};