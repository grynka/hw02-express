const mongoose = require("mongoose");
const app = require("../app");
const request = require("supertest");

require("dotenv").config();

mongoose.set("strictQuery", false);

const user = {
  email: "kia@i.ua",
  password: "123456"
};

beforeEach(async () => {
  await mongoose.connect(process.env.HOST);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Login tests", () => {
  test("Login route with user", async () => {
    const res = await request(app).post("/api/auth/login").send(user);
    expect(res.status).toBe(200);
  });
  it("return token", async () => {
    const res = await request(app).post("/api/auth/login").send(user);
    expect(res.body.token).toBeTruthy;
  })
  it("return object user", async () => {
    const res = await request(app).post("/api/auth/login").send(user);
    expect(res.body.user.email).toBeTruthy;
    expect(res.body.user.subscription).toBeTruthy;
  })
});
