const request = require("supertest");
const app = require("../../src/app");
const bcrypt = require("bcrypt");
const factory = require("../factories");

const User = require("../../src/app/models/User");

describe("List Controller", () => {
  beforeEach(async () => {
    await User.sync({ force: true });
  });

  describe("index", () => {});
  describe("store", () => {
    // it("should be able to create a new list", async () => {
    //   const user = await factory.attrs("User");
    //   const list = await factory.attrs("List");

    //   console.log(responseCreate.body);
    // });
  });
  describe("show", () => {});
  describe("update", () => {});
  describe("delete", () => {});
});
