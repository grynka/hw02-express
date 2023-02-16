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
  const { contactId } = req.params;
  const contacts = await contactsOperation.getContactById(contactId);
  res.json({
    status: "success",
    code: contacts.length > 0 ? 200 : 404,
    data: {
      resault: contacts.length > 0 ? contacts : { message: "Not found" },
    },
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
  const { contactId } = req.params;
  const contacts =  await contactsOperation.removeContact(contactId);
  res.json({
    status: "success",
    code: 201,
    data: {
      resault: contacts ? contacts : { message: "Not found" },
    },
  });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.query;
  if (Object.keys(body).length !== 0) {
  const contacts =  await contactsOperation.updateContact(contactId, body);
    res.json({
      status: "success",
      code: contacts ? 201 : 400,
      data: {
        resault: contacts ? contacts : { message: "Not found" },
      },
    });
  } else
  res.status(400).json({message: "missing fields"});
});

module.exports = router;
