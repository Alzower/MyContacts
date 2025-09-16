// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";

export type ContactData = {
  id?: string;
  lastName: string;
  firstName: string;
  phone: string;
};

type UpsertContactProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: ContactData) => void;
  data?: ContactData;
};

function UpsertContact({ open, onClose, onSave, data }: UpsertContactProps) {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (data) {
      setLastName(data.lastName);
      setFirstName(data.firstName);
      setPhone(data.phone);
    } else {
      setLastName("");
      setFirstName("");
      setPhone("");
    }
  }, [data, open]);

  const handleSave = () => {
    onSave({ lastName, firstName, phone });
    setLastName("");
    setFirstName("");
    setPhone("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      handler={onClose}
      size="sm"
      className="rounded-2xl shadow-xl bg-white p-3"
    >
      <DialogHeader className="text-xl font-bold text-gray-800 mb-4">
        Ajouter / Modifier un contact
      </DialogHeader>

      <DialogBody divider className="space-y-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-gray-700 font-medium">
            Prénom
          </label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:border-blue-500 text-gray-900"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-gray-700 font-medium">
            Nom de famille
          </label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:border-blue-500 text-gray-900"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-gray-700 font-medium">
            Numéro de téléphone
          </label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:border-blue-500 text-gray-900"
          />
        </div>
      </DialogBody>

      <DialogFooter className="flex justify-end gap-3 mt-3">
        <button onClick={onClose} className="rounded-lg text-black">
          Annuler
        </button>
        <button onClick={handleSave} className="rounded-lg text-black">
          Sauvegarder
        </button>
      </DialogFooter>
    </Dialog>
  );
}

export default UpsertContact;
