'use strict';
module.exports = (sequelize, DataTypes) => {
  var Talent = sequelize.define('Talent', {
    talentName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Talent cannot be empty"
        }
      }
    },
    profileId: DataTypes.INTEGER
  }, {
    classMethods: {
      // associate: function(models) {
      //   // associations can be defined here
      //   Talent.belongsTo(models.Profile, {
      //     foreignKey: "profileId"
      //   })
      // }
    }
    
  });
  
  Talent.associate = function(models) {
    // associations can be defined here
    Talent.belongsTo(models.Profile, {
      foreignKey: "profileId"
    });
  };
  // Talent.prototype.stuff = function() {}
  return Talent;
};