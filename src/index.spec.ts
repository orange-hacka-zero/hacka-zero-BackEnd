import router from "@routes";
import request from "supertest";
import app from "@/server";

app.use("/", router);

describe("Home Routes testing", function () {
  test("responds to /", async () => {
    const res = await request(app).get("/");
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual("Hello World!");
  });
});

it("testing test", () => {
  expect(true).toBe(true);
});
