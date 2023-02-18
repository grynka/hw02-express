const express = require("express");
const contactsOperation = require("../../models/contacts");
const router = express.Router();
const Joi = require("joi");

const HttpError = require("../../helpers/HttpError");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts();
    res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await contactsOperation.getContactById(contactId);
    if (!contacts) {
      throw HttpError(404, "Not found");
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const contacts = await contactsOperation.addContact(req.body);
    res.status(201).json({ contacts });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resault = await contactsOperation.removeContact(contactId);
    if (!resault) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    if (Object.keys(body).length === 0) {
      throw HttpError(400, "missing fields");
    }
    const { error } = updateSchema.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const resault = await contactsOperation.updateContact(contactId, body);
    if (!resault) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ resault });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
