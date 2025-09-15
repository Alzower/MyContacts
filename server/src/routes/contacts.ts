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
 * /contacts/:
 *   post:
 *     summary: Create a new contact
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Contact's first name
 *               lastName:
 *                 type: string
 *                 description: Contact's last name
 *               phone:
 *                 type: string
 *                 description: Contact's phone number
 *     responses:
 *       201:
 *         description: Contact successfully created
 *       401:
 *         description: Unauthorized - JWT missing or invalid
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */
contactsRouter.post("/", createContactController);

/**
 * @swagger
 * /contacts/:
 *   get:
 *     summary: Get all contacts for the authenticated user
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contacts
 *       401:
 *         description: Unauthorized - JWT missing or invalid
 *       500:
 *         description: Server error
 */

contactsRouter.get("/", getContactsController);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the contact to delete
 *     responses:
 *       200:
 *         description: Contact successfully deleted
 *       401:
 *         description: Unauthorized - JWT missing or invalid
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */

contactsRouter.delete("/:id", deleteContactController);

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Update a contact by ID
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the contact to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Contact's first name
 *               lastName:
 *                 type: string
 *                 description: Contact's last name
 *               phone:
 *                 type: string
 *                 description: Contact's phone number
 *     responses:
 *       200:
 *         description: Contact successfully updated
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized - JWT missing or invalid
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
contactsRouter.patch("/:id", updateContactController);

export default contactsRouter;
