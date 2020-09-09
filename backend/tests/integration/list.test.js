const request = require("supertest");
const app = require("../../src/app");
const factory = require("../factories");

const User = require("../../src/app/models/User");

describe("List Controller", () => {
  beforeEach(async () => {
    await User.sync({ force: true });
  });

  describe("index", () => {
    //1 - Criar o usuário
    //2 - Criar listas associadas ao ID do usuário
    //3 - Fazer um Join das tabelas USERS e LISTS associadas ao ID no request.headers.authorization.id
    //4 - Exibir title das listas usando o resultado do Join
  });
  describe("store", () => {
    it("should be able to create a new list for a user", async () => {
      //1 - Criar o usuário
      const user = await factory.attrs("User");

      const responseUser = await request(app).post("/users").send(user);

      //2 - Criar a lista associando o ID do usuário       
      const list = await factory.attrs("List");

      const listForUse = {
        ...list,
        user_id: responseUser.body.id,
      }

      const responseList = await request(app).post("/lists").send(listForUse);

      expect(responseList.body).toHaveProperty("id");
    });
  });
  describe("show", () => {});
  describe("update", () => {});
  describe("delete", () => {});
});
