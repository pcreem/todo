'use strict';
const bcrypt = require('bcrypt-nodejs')
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Users', [{
      email: 'user1@example.com',
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
      name: "user1",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'user2@example.com',
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
      name: "user2",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    return queryInterface.bulkInsert('Lists',
      Array.from({ length: 3 }).map(d =>
        ({
          status: 'unfinished',
          item: faker.commerce.productName(),
          deadline: faker.date.future(),
          category: faker.commerce.department(),
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      ), {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', null, {});
    return queryInterface.bulkDelete('Restaurants', null, {});
  }
};