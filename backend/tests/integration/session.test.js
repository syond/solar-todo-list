const request = require("supertest");
const app = require("../../src/app");
const factory = require("../factories");

const User = require("../../src/app/models/User");

describe("Session Controller", () => {
  beforeEach(async () => {
    await User.sync({ force: true });
  });

  //Esse teste ta dando "Invalid Password" não sei porque. No Insomnia funciona normalmente.
  describe("login", () => {
    // it("should generate a token to the user", async() => {});

    // it("should expire token", async() => {});

    it("should be able to login with existing user", async () => {
      const user = await factory.attrs("User");

      const userPasswordAttrChange = {
        ...user,
        password: user.password_testHash,
      };

      const responseCreate = await request(app)
        .post("/users")
        .send(userPasswordAttrChange);

      const userLoginData = {
        email: responseCreate.body.email,
        password: responseCreate.body.password,
      };

      const responseLogin = await request(app)
        .post("/login")
        .send(userLoginData);

      expect(responseLogin.body).toHaveProperty("accessToken");
    });
  });

  // describe("logout", () => {
  //   it("should logout the logged user", async() => {
  //     const user = await factory.attrs("User");

  //     const userPasswordAttrChange = {
  //       ...user,
  //       password: user.password_testHash,
  //     };

  //     const responseCreate = await request(app)
  //       .post("/users")
  //       .send(userPasswordAttrChange);

  //     const userLoginData = {
  //       email: responseCreate.body.email,
  //       password: responseCreate.body.password,
  //     };

  //     const responseLogin = await request(app)
  //       .post("/login")
  //       .send(userLoginData);

      
  // });
});
