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
    return result.filter((contact) => contact.id.toString() === contactId);
  }

    catch(error) {
      error.message = "Not found"
      throw error;
    }
 }

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactPatch);
    let resault = JSON.parse(data);
    resault = resault.filter((contact) => contact.id.toString() !== contactId);
    console.log(resault)
    await fs.writeFile(contactPatch, JSON.stringify(resault))
    .catch((err) => {
      console.log("Remove Failed: " + err);
    });
  }

    catch(error) {
      error.message = "Not found"
      throw error;
    }
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

const updateContact = async (contactId, body) => {
  let contacts = await listContacts()
  contacts = contacts.map((contact) => (
  contact.id.toString() === contactId
  ? {...contact, ...body} 
  : contact
  ))
  console.log(contacts)
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
