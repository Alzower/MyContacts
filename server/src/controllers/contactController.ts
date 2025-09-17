import { Response } from "express";
import { AuthRequest } from "../models/auth-request.model";
import mongoose from "mongoose";
import { ContactModel } from "../models/contact.model";

const phoneRegex = /^(?:\d{10}|\d{2}(?:\s\d{2}){4})$/;

export const createContactController = async (req: AuthRequest, res: Response) => {
  const { firstName, lastName, phone } = req.body;

  if (!firstName || !lastName || !phone) {
    return res.status(400).json({ error: "firstName, lastName and phone are required" });
  }

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: "Invalid phone number format" });
  }

  try {
    if (!req.user) throw new Error("User not authenticated");

    const contact = await mongoose.model("contacts", ContactModel).create({
      firstName,
      lastName,
      phone,
      user: req.user.objectId,
    });

    res.status(201).json({ message: "Contact created", contact });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const getContactsController = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) throw new Error("User not authenticated");

    const contacts = await mongoose
      .model("contacts", ContactModel)
      .find({ user: req.user.objectId });

    res.status(200).json({ contacts });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const deleteContactController = async (req: AuthRequest, res: Response) => {
  const contactId = req.params.id;
  if (!contactId) return res.status(400).json({ error: "Contact ID is required" });

  try {
    const contact = await mongoose.model("contacts", ContactModel).findOne({ id: contactId });
    if (!contact) return res.status(404).json({ error: "Contact not found" });

    if (contact.user.toString() !== req.user?.objectId)
      return res.status(403).json({ error: "Forbidden" });

    await contact.deleteOne();
    res.status(200).json({ message: "Contact deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const updateContactController = async (req: AuthRequest, res: Response) => {
  const contactId = req.params.id;
  const { firstName, lastName, phone } = req.body;

  if (!contactId) return res.status(400).json({ error: "Contact ID is required" });
  if (phone && !phoneRegex.test(phone)) return res.status(400).json({ error: "Invalid phone number format" });

  try {
    const contact = await mongoose
      .model("contacts", ContactModel)
      .findOneAndUpdate(
        { id: contactId, user: req.user?.objectId },
        { firstName, lastName, phone },
        { new: true }
      );

    if (!contact) return res.status(404).json({ error: "Contact not found or you are not the owner" });

    res.status(200).json({ message: "Contact updated", contact });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
