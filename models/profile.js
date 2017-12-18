'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    userId: DataTypes.INTEGER,
    picUrl: DataTypes.STRING,
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "age cannot be empty"
        },
        isInt: {
          msg: "age must be an integer"
        }
      }  
    },
    height: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "height cannot be empty"
        },
        isInt: {
          msg: "height must be an integer"
        }
      }  
    },
    location: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "location cannot be empty"
        },
        
      }  
    },
      
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "gender cannot be empty"
        },
        
      }  
    },
      
    isSingle: DataTypes.BOOLEAN,
    hasKids: DataTypes.BOOLEAN,
    aboutMe: DataTypes.TEXT
  }, {
    classMethods: {
      // associate: function(models) {
      //   // associations can be defined here
      //   Profile.hasOne(models.User, {
      //     foreignKey: "profileId"
      //   });
      //   Profile.hasMany(models.Talent, {
      //     foreignKey: "profileId"
      //   });
      //   Profile.hasMany(models.Favorite, {
      //     foreignKey: "profileId"
      //   });
      // }
    }
  });
  Profile.associate = function(models) {
    // associations can be defined here
    Profile.hasOne(models.User, {
      foreignKey: "profileId"
    });
    Profile.hasMany(models.Talent, {
      foreignKey: "profileId"
    });
    Profile.hasMany(models.Favorite, {
      foreignKey: "profileId"
    });
  };

  return Profile;
};