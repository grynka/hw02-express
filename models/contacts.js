const fs = require('fs/promises')
const path = require("path");
const contactPatch = path.resolve("models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactPatch);
    const result = JSON.parse(data);
    return result;
  }

    catch(error) {
      error.message = "file reading error"
      throw error;
    }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactPatch);
    const result = JSON.parse(data);
    return result.filter((item) => item.id === contactId);
  }

    catch(error) {
      error.message = "Not found"
      throw error;
    }
 }

const removeContact = async (contactId) => {
  fs.readFile(contactPatch)
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContacts = contacts.filter((contact) => contact.id !== contactId);
      fs.writeFile(contactPatch, JSON.stringify(newContacts))
        .then(() => {
          console.log("Remove Success contact " + contactId);
        })
        .catch((err) => {
          console.log("Remove Failed: " + err);
        });
    })
    .catch((error) => console.error(error.message));
}

const addContact = async (body) => {
  const {name, email, phone} = body
  try {
    const data = await fs.readFile(contactPatch);
    const result = JSON.parse(data);
    const newContact = {
      id: result.length + 1,
      name: name,
      email: email,
      phone: phone,
    }
    console.log(newContact)
    result.push(newContact);
    await fs.writeFile(contactPatch, JSON.stringify(result))
    .catch((err) => {
      console.log("Remove Failed: " + err);
    });
   return newContact
  }

    catch(error) {
      error.message = "file adding error" + error
      throw error;
    }
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
