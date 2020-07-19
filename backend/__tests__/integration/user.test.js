const request = require('supertest');
const app = require('../../src/app');
const User = require("../../src/app/models/User");

describe('User Controller', () => {
    it('should create a new User', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: "Teste Testando",
                email: "teste@solar.com",
                password: "123456",
            });

        //const user = await User.create({ name: "Teste", email: "teste@solar.com", password: "1234" });
        //console.log(user);

        expect(response.body).toHaveProperty('id');
    })
});