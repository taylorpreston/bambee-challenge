import request from "supertest";
import { server } from "./index";

let token: string = "";

beforeAll((done) => {
  request(server)
    .post("/v1/auth/login")
    .send({
      email: "taylor@test.com",
      password: "password",
    })
    .end((err, res) => {
      if (err) return done(err);
      token = res.body.accessToken;
      console.log("I AM TOKEN:", token);
      done();
    });
});

describe("API Tests", () => {
  let email = `taylor+${new Date().getTime().toString()}@test.com`;

  test("Smoke", (done) => {
    request(server)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.message = "Hello world!";
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  // V1 Tests
  test("Sign Up", (done) => {
    request(server)
      .post("/v1/auth/sign_up")
      .send({
        email: email,
        password: "password",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.accessToken = expect.any(String);
        res.body.refreshToken = expect.any(String);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("Login", (done) => {
    request(server)
      .post("/v1/auth/login")
      .send({
        email: "taylor@test.com",
        password: "password",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.accessToken = expect.any(String);
        res.body.refreshToken = expect.any(String);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("Get all tasks", (done) => {
    request(server)
      .get("/v1/tasks")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body = expect.any(Array);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("Create a new task", (done) => {
    request(server)
      .post("/v1/tasks/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Task",
        description: "Test Description",
        status: "New",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body = expect.any(Object);
        res.body.title = expect.any("Test Task");
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("Get a task", (done) => {
    request(server)
      .get("/v1/tasks/1")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body = expect.any(Object);
        res.body.title = expect.any("Test Task");
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("Update a task", (done) => {
    request(server)
      .put("/v1/tasks/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: 1,
        title: `Test Task 45`,
        description: "Test Description",
        status: "Completed",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        console.log("RES:", res.body);
        res.body.task = expect.any(Object);
        res.body.task.title = expect.any("Test Task 45");
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("Update a task fails for In Progress V1", (done) => {
    request(server)
      .put("/v1/tasks/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: 1,
        title: `Test Task 46`,
        description: "Test Description",
        status: "In Progress",
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .expect((res) => {
        res.body.task = expect.any(Object);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("Update a task v2", (done) => {
    request(server)
      .put("/v2/tasks/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: 1,
        title: `Test Task 47`,
        description: "Test Description",
        status: "In Progress",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body = expect.any(Object);
        res.body.title = expect.any("Test Task 47");
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

afterAll((done) => {
  server.close(done);
});
