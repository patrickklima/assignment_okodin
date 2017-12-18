'use strict';
module.exports = (sequelize, DataTypes) => {
  var Favorite = sequelize.define('Favorite', {
    favoriteThing: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Favorite cannot be empty"
        }
      }
    },
    profileId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Favorite.belongsTo(models.Profile, {
          foreignKey: "profileId"
        });
      }
    }
  });
  return Favorite;
};