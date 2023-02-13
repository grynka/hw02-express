const fs = require('fs/promises')
const path = require("path");
const contactPatch = path.resolve("./contacts.json");

const listContacts = async () => {
  fs.readFile(contactPatch)
  .then((data) =>  {return JSON.parse(data)})
  .catch((err) => console.log(err.message));
}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
