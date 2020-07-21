const request = require("supertest");
const app = require("../../src/app");
const bcrypt = require("bcrypt");

const User = require("../../src/app/models/User");

describe("User Controller", () => {
  beforeEach(async () => {
    await User.sync({ force: true });
  });

  it("should encrypt the user password when new user is created", async () => {
    const user = await User.create({
      name: "Teste Testando",
      email: "teste@solar.com",
      password_testHash: "123456",
    });

    const compareHash = await bcrypt.compare("123456", user.password);

    expect(compareHash).toBe(true);
  });

  it("should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "Teste Testando",
      email: "teste@solar.com",
      password_testHash: "123456",
    });

    expect(response.body).toHaveProperty("id");
  });

  it("should not be able to register with duplicated email", async () => {
    await request(app).post("/users").send({
      name: "Teste Testando",
      email: "teste@solar.com",
      password_testHash: "123456",
    });

    const response = await request(app).post("/users").send({
      name: "Teste Testando",
      email: "teste@solar.com",
      password_testHash: "123456",
    });

    expect(response.status).toBe(400);
  });
});
