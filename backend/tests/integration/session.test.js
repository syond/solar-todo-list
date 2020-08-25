const request = require("supertest");
const app = require("../../src/app");
const bcrypt = require("bcrypt");
const factory = require("../factories");

const User = require("../../src/app/models/User");

describe("Session Controller", () => {
  beforeEach(async () => {
    await User.sync({ force: true });
  });
  describe("login", () => {
    it("should be able to login with existing user", async () => {
      const user = await factory.attrs("User");
      const list = await factory.attrs("List");

      const responseCreate = await request(app).post("/users").send(user);

      const { email, password_testHash } = responseCreate.body;

      const responseLogin = await request(app)
        .post("/login")
        .send({ email: email, password: password_testHash });

      expect(responseLogin.body).toHaveProperty("accessToken");
    });
  });
  describe("logout", () => {});
});
