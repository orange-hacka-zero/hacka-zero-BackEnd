import router from "@routes";
import request from "supertest";
import app from "@/server";

app.use("/", router);

describe("Home Routes testing", function () {
  test("responds to /", async () => {
    const res = await request(app).get("/");
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual("ok");
  });
});

describe("User Routes testing", function () {
  test("responds to POST in /user/new_user", async () => {
    const res = await request(app).post("/user/new_account");

    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      id: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
      role: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});

describe("Auth Routes testing", function () {
  test("responds to POST in /auth/login", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "user-Y0c3tn@techMeets.com",
      password: "ZWVPwRRtEGZ90EW",
    });

    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      token: expect.any(String),
      user: {
        id: expect.any(String),
        role: expect.any(String),
      },
    });
  });

  test("responds to POST in /auth/login with wrong email and password", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "email",
      password: "password",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Ocorreu um erro no login" });
  });
});
