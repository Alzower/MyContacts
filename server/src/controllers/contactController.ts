import { Response } from "express";
import { AuthRequest } from "../models/auth-request.model";
import mongoose from "mongoose";
import { ContactModel } from "../models/contact.model";

export const createContactController = async (
  req: AuthRequest,
  res: Response
) => {
  const { firstName, lastName, phone } = req.body;
  if (!firstName || !lastName || !phone) {
    return res.status(400).send("firstName, lastName and phone are required");
  }
  try {
    if (!req.user) {
      throw new Error("User not authenticated");
    }
    await mongoose.model("contacts", ContactModel).create({
      firstName,
      lastName,
      phone,
      user: req.user.objectId,
    });
    res.status(201).send("Contact created");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getContactsController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      throw new Error("User not authenticated");
    }
    const contacts = await mongoose
      .model("contacts", ContactModel)
      .find({ user: req.user.objectId });
    res.status(200).send(contacts);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteContactController = async (
  req: AuthRequest,
  res: Response
) => {
  const contactId = req.params.id;
  if (!contactId) {
    return res.status(400).send("Contact ID is required");
  }
  try {
    const contact = await mongoose
      .model("contacts", ContactModel)
      .findOneAndDelete({ id: contactId });
    if (!contact) {
      return res.status(404).send("Contact not found");
    }
    if (contact.user.toString() !== req.user?.objectId) {
      return res.status(403).send("Forbidden");
    }
    res.status(200).send("Contact deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateContactController = async (
  req: AuthRequest,
  res: Response
) => {
  const contactId = req.params.id;
  const { firstName, lastName, phone } = req.body;
  if (!contactId) {
    return res.status(400).send("Contact ID is required");
  }
  try {
    const contact = await mongoose
      .model("contacts", ContactModel)
      .findOneAndUpdate(
        { id: contactId, user: req.user?.objectId },
        { firstName, lastName, phone },
        { new: true }
      );
    if (!contact) {
      return res.status(404).send("Contact not found or you are not the owner");
    }
    res.status(200).send(contact);
  } catch (error) {
    res.status(500).send(error);
  }
};
