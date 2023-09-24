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
    const randomIp = Math.floor(Math.random() * 255) + 1;

    const res = await request(app)
      .post("/user/new_account")
      .set("ip", `${randomIp}.${randomIp}.${randomIp}.${randomIp}}`);

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

describe("Autenticante Routes testing", function () {
  test("responds to POST in /auth/login", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "user-HGe4zeehyi@techMeets.com",
      password: "ezjWSaPxDs7nhd7",
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

/* describe("Events Routes testing", function () {
  test("responds to POST in /events/create", async () => {
    const res = await request(app).post("/events/create").send({
      date: new Date(),
      description: "Evento de teste para o jest",
      name: "Teste de evento",
      link: "orangeJuice.com",
      modalities: "ONLINE",
      address: "Rua dos testes, 123",
      paymentType: "FREE",
    });

    console.log({ res });

    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      description: expect.any(String),
      link: expect.any(String),
      modalities: expect.any(String),
      paymentType: expect.any(String),
      date: expect.any(String),
      address: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("responds to GET in /events/get_all", async () => {
    const res = await request(app).get("/events/get_all");

    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining(
        [
          {
            id: expect.any(String),
            name: expect.any(String),
            description: expect.any(String),
            date: expect.any(String),
            time: expect.any(String),
            price: expect.any(Number),
            address: expect.any(String),
            city: expect.any(String),
            uf: expect.any(String),
            user_id: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
        ] || []
      )
    );
  });
}); */
