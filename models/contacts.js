const fs = require("fs/promises");
const path = require("path");
const contactPatch = path.resolve("models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactPatch);
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    error.message = "file reading error";
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.filter((contact) => contact.id.toString() === contactId);
  } catch (error) {
    error.message = "Not found";
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(
      (contact) => contact.id.toString() === contactId
    );
    if (index === -1) {
      return null
    }
    const[resault] = contacts.splice(index, 1)
    await fs.writeFile(contactPatch, JSON.stringify(contacts, null, 2));
    return resault
  } catch (error) {
    error.message = "Not found";
    throw error;
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    const contacts = await listContacts();
    const newContact = {
      id: contacts.length + 1,
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactPatch, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    error.message = "file adding error" + error;
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id.toString() === contactId
  );
  if (index === -1) {
    return null
  }
  contacts[index] = { ...contacts[index], ...body };
  console.log(contacts[index]);
  await fs.writeFile(contactPatch, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
