'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Favorites', [{
      favoriteThing: 'raiding',
      profileId: 1
    },
    {
      favoriteThing: 'brawling',
      profileId: 1
    },
    {
      favoriteThing: 'singing',
      profileId: 2
    },
    {
      favoriteThing: 'raiding',
      profileId: 2
    },
    {
      favoriteThing: 'meat',
      profileId: 3
    },
    {
      favoriteThing: 'buffets',
      profileId: 3
    },
    {
      favoriteThing: 'parties',
      profileId: 4
    },
    {
      favoriteThing: 'dancing all nite',
      profileId: 4
    },
    {
      favoriteThing: 'opera houses',
      profileId: 5
    },
    {
      favoriteThing: 'stages',
      profileId: 5
    },
    {
      favoriteThing: 'getting swoll',
      profileId: 6
    },
    {
      favoriteThing: 'crushing it',
      profileId: 6
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    var models = require('./../models');
    return queryInterface.bulkDelete('Favorites', null, {}, models.Favorite);
  }
};
