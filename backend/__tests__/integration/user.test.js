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

      const response = await request(app).post("/users").send(user);

      expect(response.body).toHaveProperty("id");
    });

    it("should not be able to create new user with same email", async () => {
      const user = await factory.attrs("User");

      await request(app).post("/users").send(user);

      const response = await request(app).post("/users").send(user);

      expect(response.status).toBe(400);
    });
  });

  describe("update", () => {
    it("should be able to update existing user", async () => {
      const user = await factory.attrs("User");

      const responseCreate = await request(app).post("/users").send(user);

      const updatedUser = {
        ...responseCreate.body,
        name: "Pelé dos Santos",
        password: "456574",
      };

      const responseUpdate = await request(app)
        .patch(`/users/${updatedUser.id}`)
        .send(updatedUser);

      expect(responseUpdate.body.name).toBe("Pelé dos Santos");
    });

    it("should return status 200 when the user is updated", async () => {
      const user = await factory.attrs("User");

      const responseCreate = await request(app).post("/users").send(user);

      const updatedUser = {
        ...responseCreate.body,
        name: "Pelé dos Santos",
        password: "456574",
      };

      const responseUpdate = await request(app)
        .patch(`/users/${updatedUser.id}`)
        .send(updatedUser);

      expect(responseUpdate.status).toBe(200);
    });
  });
});
