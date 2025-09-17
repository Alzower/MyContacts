import request from "supertest";
import app from "../app"; 

describe("Auth integration tests - /register", () => {
  it("POST /auth/register → crée un utilisateur avec succès", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "test@example.com", password: "secret123" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "User is registered");
  });

  it("POST /auth/register → erreur si email manquant", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ password: "secret123" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Email and password are required");
  });

  it("POST /auth/register → erreur si email invalide", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "invalid-email", password: "secret123" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty(
      "error",
      "Invalid email address. Please provide a valid email."
    );
  });

  it("POST /auth/register → erreur si email déjà existant", async () => {
    await request(app)
      .post("/auth/register")
      .send({ email: "duplicate@example.com", password: "secret123" });

    const res = await request(app)
      .post("/auth/register")
      .send({ email: "duplicate@example.com", password: "secret123" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty(
      "error",
      "User with this email already exists"
    );
  });
});




describe("Auth integration tests - /login", () => {
  const userData = { email: "login@example.com", password: "mypassword" };

  beforeAll(async () => {
    await request(app).post("/auth/register").send(userData);
  });

  it("POST /auth/login → connexion réussie", async () => {
    const res = await request(app).post("/auth/login").send(userData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("jwt_token");
    expect(typeof res.body.jwt_token).toBe("string");
  });

  it("POST /auth/login → erreur si email inexistant", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "notfound@example.com", password: "pwd123" });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "User not found");
  });


  it("POST /auth/login → erreur si email ou mot de passe manquant", async () => {
    const res = await request(app).post("/auth/login").send({ email: userData.email });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Email and password are required");
  });
});