const faker = require('faker');
const { factory } = require('factory-girl');

const User = require('../src/app/models/User');
const List = require('../src/app/models/List');

factory.define('User', User, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password_testHash: faker.internet.password(),
});

factory.define('List', List, {
    title: faker.lorem.lines(1),
});

module.exports = factory;
