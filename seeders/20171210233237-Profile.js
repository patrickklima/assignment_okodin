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
    return queryInterface.bulkInsert('Profiles', [{
      userId: 1,
      picUrl: '/assets/images/viking_guy.jpg',
      age: 22,
      height: 90,//cm
      location: 'Asgard',
      gender: 'm',
      isSingle: true,
      hasKids: false,
      aboutMe: "a man of few words"
      
    },
    {
      userId: 2,
      picUrl: '/assets/images/viking_girl.jpg',
      age: 20,
      height: 85,//cm
      location: 'Olympus',
      gender: 'f',
      isSingle: true,
      hasKids: false,
      aboutMe: "a woman of few words"
      
    },
    {
      userId: 3,
      picUrl: '/assets/images/viking_asterix_guy.jpg',
      age: 29,
      height: 120,//cm
      location: 'Olympus',
      gender: 'm',
      isSingle: true,
      hasKids: false,
      aboutMe: "the biggest man in any room"
      
    },
    {
      userId: 4,
      picUrl: '/assets/images/viking_sexy_girl.jpg',
      age: 24,
      height: 87,//cm
      location: 'Asgard',
      gender: 'f',
      isSingle: true,
      hasKids: true,
      aboutMe: "my axes bring all the boys to the yard"
      
    },
    {
      userId: 5,
      picUrl: '/assets/images/viking_singing_girl.jpg',
      age: 22,
      height: 100,//cm
      location: 'Asgard',
      gender: 'f',
      isSingle: false,
      hasKids: false,
      aboutMe: "it ain't over until I sing"
      
    },
    {
      userId: 6,
      picUrl: '/assets/images/viking_young_jock.jpg',
      age: 25,
      height: 90,//cm
      location: 'Olympus',
      gender: 'm',
      isSingle: true,
      hasKids: false,
      aboutMe: "always workin out"
      
    }
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
    return queryInterface.bulkDelete('Profiles', null, {}, models.Profile);
  }
};
