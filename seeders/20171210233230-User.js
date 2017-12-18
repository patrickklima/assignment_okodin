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
     return queryInterface.bulkInsert('Users', [{
        username: 'viking-joe',
        email: "joe@viking.com",
        profileId: 1
      },
      {
        username: 'viking-jane',
        email: "jill@viking.com",
        profileId: 2
      },
      {
        username: 'asterix_guy',
        email: "asterix@viking.com",
        profileId: 3
      },
      {
        username: 'sexy-viking',
        email: "iamsexy@viking.com",
        profileId: 4
      },
      {
        username: 'singing-viking',
        email: "lalala@viking.com",
        profileId: 5
      },{
        username: 'young-jock',
        email: "doyouevenliftbro@viking.com",
        profileId: 6
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    var models = require('./../models');
    return queryInterface.bulkDelete('Users', null, {}, models.User);

  }
};
