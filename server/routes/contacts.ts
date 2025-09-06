import express from "express";
import {
  createContactController,
  getContactsController,
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

export default contactsRouter;
