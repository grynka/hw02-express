const {Contact} = require("../models/contact")
const { HttpError, ctrlWrapper } = require("../helpers");


const listContacts = async (req, res) => {
  const data = await Contact.find({});
  res.json(data);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contacts = await Contact.findById(contactId);
    if (!contacts) {
      throw HttpError(404, "Not found");
    }
    res.json(contacts);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({
        message: "Delete success"
    })
};

const addContact = async (req, res) => {
  const contacts = await Contact.create(req.body);
  res.status(201).json(contacts);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!result) {
      throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact  = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!result) {
      throw HttpError(404, "Not found");
  }
  res.json(result);
}

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact : ctrlWrapper(updateStatusContact)
};
