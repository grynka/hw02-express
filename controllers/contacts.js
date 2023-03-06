const {Contact} = require("../models/contact")
const { HttpError, ctrlWrapper } = require("../helpers");


const listContacts = async (req, res) => {
  const {_id: owner} = req.user;
  const {page=1, limit=20, favorite=null, name=null, email=null} = req.query;
  const skip = (page-1)*limit
  let filter = { };
  if (favorite) {
    filter = {...filter, favorite}
  }

  if (name) {
    filter = {...filter, name}
  }

  if (email) {
    filter = {...filter, email}
  }


  console.log(filter)
  const data = await Contact.find({owner, ...filter}, {}, {skip, limit});
  res.json(data);
};

const getContactById = async (req, res) => {
  const {_id: owner} = req.user;
    const { contactId } = req.params;
    const contacts = await Contact.findOne({_id: contactId, owner});
    if (!contacts) {
      throw HttpError(404, "Not found");
    }
    res.json(contacts);
};

const removeContact = async (req, res) => {
  const {_id: owner} = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndRemove({_id: contactId, owner});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({
        message: "Delete success"
    })
};

const addContact = async (req, res) => {
  const {_id : owner} = req.user
  const contacts = await Contact.create({...req.body, owner});
  res.status(201).json(contacts);
};

const updateContact = async (req, res) => {
  const {_id : owner} = req.user
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate( {_id: contactId, owner}, req.body, { new: true });
  if (!result) {
      throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact  = async (req, res) => {
  const {_id : owner} = req.user
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body, { new: true });
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
