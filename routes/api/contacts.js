const express = require("express");
const contactsOperation = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await contactsOperation.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      resault: contacts,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params
  const contacts = await contactsOperation.getContactById(contactId);
  res.json({
    status: "success",
    code: contacts.length > 0  ? 200 : 404,
     data: {
      resault: contacts.length > 0  ?  contacts : {message: "Not found"},
    }
  });
});

router.post("/", async (req, res, next) => {
  const contacts = await contactsOperation.addContact(req.query);
  res.json({
    status: "success",
    code: 201,
    data: {
      resault: contacts,
    },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params
  await contactsOperation.removeContact(contactId);
  res.json({
    status: "success",
    code: 201,
    data: {"message": "contact deleted"},
  });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.query;
  await contactsOperation.updateContact(body, contactId);
  res.json({
    status: "success",
    code: 201,
    data: {"message": "contact deleted"},
  });
});

module.exports = router;
