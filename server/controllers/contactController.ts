import { Request, Response } from "express";
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
    const contacts = await mongoose
      .model("contacts", ContactModel)
      .find({ user: req.user.objectId });
    res.status(200).send(contacts);
  } catch (error) {
    res.status(500).send(error);
  }
};
