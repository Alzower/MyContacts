import { useEffect, useState } from "react";
import {
  createContact,
  deleteContact,
  getContactsByUser,
  updateContact,
} from "../contacts.service";
import UpsertContact, { type ContactData } from "../modal/upsert-contact";
import type { Card } from "../models/card.model";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [contactsItems, setContactItems] = useState<Card[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactData | null>(
    null
  );

  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteUser = (id: string) => {
    deleteContact(id).then(() => {
      loadContacts();
    });
  };

  const transformContacts = (data: string): Card[] => {
    const contact = JSON.parse(data).contacts
    return contact.map(
      (item: {
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
      }) => ({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        phone: item.phone,
      })
    );
  };

  const disconnect = () => {
    localStorage.removeItem("jwt_token");
    navigate("/");
  };

  const loadContacts = () => {
    getContactsByUser().then((res) => {
      if (res && res.data) {
        setContactItems(transformContacts(res.data));
      }
    });
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleSave = (data: {
    firstName: string;
    lastName: string;
    phone: string;
  }) => {
    if (selectedContact) {
      if (!selectedContact.id) throw new Error("Contact ID is missing");
      updateContact(
        selectedContact.id,
        data.lastName,
        data.firstName,
        data.phone
      ).then(() => {
        loadContacts();
        handleClose();
      });
    } else {
      createContact(data.lastName, data.firstName, data.phone).then(() => {
        loadContacts();
        handleClose();
      });
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          handleOpen();
          setSelectedContact(null);
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Ajouter un contact
      </button>

      <button
        onClick={disconnect}
        className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Déconnecter
      </button>

      <UpsertContact
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        data={selectedContact || undefined}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {contactsItems.map((contact) => (
          <div
            key={contact.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-gray-800">
              {contact.firstName} {contact.lastName}
            </h2>
            <p className="text-gray-600">{contact.phone}</p>

            <div className="flex gap-2">
              <button
                onClick={() => deleteUser(contact.id)}
                className="mt-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>

              <button
                onClick={() => {
                  handleOpen();

                  setSelectedContact(contact);
                }}
                className="mt-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
