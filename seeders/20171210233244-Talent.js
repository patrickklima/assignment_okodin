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
     return queryInterface.bulkInsert('Talents', [{
        talentName: 'swordplay',
        profileId: 1
      }, 
      {
        talentName: 'sailing',
        profileId: 1
      },
      {
        talentName: 'swordplay',
        profileId: 2
      }, 
      {
        talentName: 'helmet-making',
        profileId: 2
      },
      {
        talentName: 'eating',
        profileId: 3
      },
      {
        talentName: 'cooking',
        profileId: 3
      },
      {
        talentName: 'killin it',
        profileId: 4
      },
      {
        talentName: 'slaying',
        profileId: 4
      },
      {
        talentName: 'singing',
        profileId: 5
      },
      {
        talentName: 'opera',
        profileId: 5
      },
      {
        talentName: 'deadlifts',
        profileId: 6
      },
      {
        talentName: 'arm curls',
        profileId: 6
      },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    var models = require('./../models');
    return queryInterface.bulkDelete('Talents', null, {}, models.Talent);

  }
};
