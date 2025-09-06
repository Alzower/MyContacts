import express from "express";
import {
  createContactController,
  deleteContactController,
  getContactsController,
  updateContactController,
} from "../controllers/contactController";

const contactsRouter = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 */
contactsRouter.post("/", createContactController);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all contacts for the authenticated user
 *     tags: [Contacts]
 */

contactsRouter.get("/", getContactsController);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     tags: [Contacts]
 */
contactsRouter.delete("/:id", deleteContactController);

/**
 * @swagger
 * /{id}:
 *   patch:
 *     summary: Update a contact by ID
 *     tags: [Contacts]
 */
contactsRouter.patch("/:id", updateContactController);

export default contactsRouter;
