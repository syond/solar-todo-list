const request = require("supertest");
const app = require("../../src/app");
const bcrypt = require("bcrypt");

const factory = require("../factories");
const User = require("../../src/app/models/User");

describe("User Controller", () => {
  beforeEach(async () => {
    await User.sync({ force: true });
  });

  describe("store", () => {
    it("should return status 400 when email is not provided", async () => {
      const userWithoutEmail = {
        name: "Josley Souza",
        email: undefined,
        password: "12345",
      };

      const response = await request(app).post("/users").send(userWithoutEmail);

      expect(response.status).toBe(400);
    });

    it("should return status 400 when password is not provided", async () => {
      const userWithoutPassword = {
        name: "Josley Souza",
        email: "josley@gmail.com",
        password: undefined,
      };

      const response = await request(app)
        .post("/users")
        .send(userWithoutPassword);

      expect(response.status).toBe(400);
    });

    it("should return status 400 when name is not provided", async () => {
      const userWithoutName = {
        name: undefined,
        email: "josley@gmail.com",
        password: "51561",
      };

      const response = await request(app).post("/users").send(userWithoutName);

      expect(response.status).toBe(400);
    });

    it("should encrypt the user password when new user is created", async () => {
      const user = await factory.create("User", {
        password_testHash: "123456",
      });

      const compareHash = await bcrypt.compare("123456", user.password);

      expect(compareHash).toBe(true);
    });

    it("should be able to create a new user", async () => {
      //Using "attrs" function to not create a instance of User inside the database
      const user = await factory.attrs("User");

      const userPasswordAttrChange = {
        ...user,
        password: user.password_testHash,
      };

      const response = await request(app)
        .post("/users")
        .send(userPasswordAttrChange);

      expect(response.body).toHaveProperty("id");
    });

    it("should return status 201 when new user is created", async () => {
      //Using "attrs" function to not create a instance of User inside the database
      const user = await factory.attrs("User");

      const userPasswordAttrChange = {
        ...user,
        password: user.password_testHash,
      };

      const response = await request(app)
        .post("/users")
        .send(userPasswordAttrChange);

      expect(response.status).toBe(201);
    });

    it("should not be able to create new user with same email", async () => {
      const user = await factory.attrs("User");
      const anotherUser = await factory.attrs("User");

      const userPasswordAttrChange = {
        ...user,
        password: user.password_testHash,
      };

      await request(app).post("/users").send(userPasswordAttrChange);

      const userWithSameEmail = {
        ...anotherUser,
        password: anotherUser.password_testHash,
        email: userPasswordAttrChange.email,
      };

      const response = await request(app)
        .post("/users")
        .send(userWithSameEmail);

      expect(response.status).toBe(400);
    });
  });

  describe("update", () => {
    it("should be able to update existing user", async () => {
      const user = await factory.attrs("User");

      const userPasswordAttrChange = {
        ...user,
        password: user.password_testHash,
      };

      const responseCreate = await request(app)
        .post("/users")
        .send(userPasswordAttrChange);

      const updatedUser = {
        ...responseCreate.body,
        name: "Pelé dos Santos",
        password: "456574",
      };

      const responseUpdate = await request(app)
        .put(`/users/${updatedUser.id}`)
        .send(updatedUser);

      expect(responseUpdate.body.name).toBe("Pelé dos Santos");
    });

    it("should return status 200 when the user is updated", async () => {
      const user = await factory.attrs("User");

      const userPasswordAttrChange = {
        ...user,
        password: user.password_testHash,
      };

      const responseCreate = await request(app)
        .post("/users")
        .send(userPasswordAttrChange);

      const updatedUser = {
        ...responseCreate.body,
        name: "Pelé dos Santos",
        password: "456574",
      };

      const responseUpdate = await request(app)
        .put(`/users/${updatedUser.id}`)
        .send(updatedUser);

      expect(responseUpdate.status).toBe(200);
    });

    it("should return status 400 if the user not exist", async () => {
      const response = await request(app).put("/users/5");

      expect(response.status).toBe(400);
    });
  });
});
