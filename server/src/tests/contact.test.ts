import request from "supertest";
import app from "../app";
import mongoose from "mongoose";

describe("Contacts integration tests", () => {

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  describe("POST /contacts", () => {
    it("crée un contact avec succès", async () => {
      // Créer un utilisateur pour ce test
      const userData = { email: "user1@example.com", password: "password123" };
      await request(app).post("/auth/register").send(userData);
      const loginRes = await request(app).post("/auth/login").send(userData);
      const jwtToken = loginRes.body.jwt_token;

      const contactData = { firstName: "John", lastName: "Doe", phone: "0612345678" };

      const res = await request(app)
        .post("/contacts")
        .set("Authorization", `Bearer ${jwtToken}`)
        .send(contactData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message", "Contact created");
      expect(res.body.contact).toMatchObject(contactData);
    });

    it("erreur si champ manquant", async () => {
      const userData = { email: "user2@example.com", password: "password123" };
      await request(app).post("/auth/register").send(userData);
      const loginRes = await request(app).post("/auth/login").send(userData);
      const jwtToken = loginRes.body.jwt_token;

      const res = await request(app)
        .post("/contacts")
        .set("Authorization", `Bearer ${jwtToken}`)
        .send({ firstName: "Jane" });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error", "firstName, lastName and phone are required");
    });
  });

  describe("GET /contacts", () => {
    it("récupère tous les contacts de l'utilisateur", async () => {
      const userData = { email: "user3@example.com", password: "password123" };
      await request(app).post("/auth/register").send(userData);
      const loginRes = await request(app).post("/auth/login").send(userData);
      const jwtToken = loginRes.body.jwt_token;

      const contactData = { firstName: "Alice", lastName: "Smith", phone: "0623456789" };
      await request(app).post("/contacts").set("Authorization", `Bearer ${jwtToken}`).send(contactData);

      const res = await request(app).get("/contacts").set("Authorization", `Bearer ${jwtToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.contacts.length).toBeGreaterThan(0);
    });
  });

  describe("PUT /contacts/:id", () => {
    it("met à jour un contact avec succès", async () => {
      const userData = { email: "user4@example.com", password: "password123" };
      await request(app).post("/auth/register").send(userData);
      const loginRes = await request(app).post("/auth/login").send(userData);
      const jwtToken = loginRes.body.jwt_token;

      const contactData = { firstName: "Bob", lastName: "Brown", phone: "0611223344" };
      const createRes = await request(app).post("/contacts").set("Authorization", `Bearer ${jwtToken}`).send(contactData);
      const contactId = createRes.body.contact.id;

      const updatedData = { firstName: "Bobby", lastName: "Brown", phone: "0622334455" };
      const res = await request(app)
        .patch(`/contacts/${contactId}`)
        .set("Authorization", `Bearer ${jwtToken}`)
        .send(updatedData);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Contact updated");
      expect(res.body.contact).toMatchObject(updatedData);
    });

    it("erreur si phone invalide", async () => {
      const userData = { email: "user5@example.com", password: "password123" };
      await request(app).post("/auth/register").send(userData);
      const loginRes = await request(app).post("/auth/login").send(userData);
      const jwtToken = loginRes.body.jwt_token;

      const contactData = { firstName: "Charlie", lastName: "Day", phone: "0611223344" };
      const createRes = await request(app).post("/contacts").set("Authorization", `Bearer ${jwtToken}`).send(contactData);
      const contactId = createRes.body.contact.id;

      const res = await request(app)
        .patch(`/contacts/${contactId}`)
        .set("Authorization", `Bearer ${jwtToken}`)
        .send({ ...contactData, phone: "123" });
        console.log(res.error)

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid phone number format");
    });
  });

  describe("DELETE /contacts/:id", () => {
    it("supprime un contact avec succès", async () => {
      const userData = { email: "user6@example.com", password: "password123" };
      await request(app).post("/auth/register").send(userData);
      const loginRes = await request(app).post("/auth/login").send(userData);
      const jwtToken = loginRes.body.jwt_token;

      const contactData = { firstName: "David", lastName: "White", phone: "0611223344" };
      const createRes = await request(app).post("/contacts").set("Authorization", `Bearer ${jwtToken}`).send(contactData);
      const contactId = createRes.body.contact.id;

      const res = await request(app)
        .delete(`/contacts/${contactId}`)
        .set("Authorization", `Bearer ${jwtToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Contact deleted");
    });
  });
});
