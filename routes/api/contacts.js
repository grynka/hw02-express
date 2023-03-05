const express = require("express");
const contactsOperation = require("../../controllers/contacts");
const router = express.Router();
const { schemas } = require("../../models/contact")
const {validateBody, isValidId, authenticate} = require("../../middlewares");


router.patch("/:contactId/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema, {"message": "missing field favorite"}), contactsOperation.updateStatusContact )

router.get("/", authenticate, contactsOperation.listContacts);

router.get("/:contactId", authenticate, isValidId, contactsOperation.getContactById);

router.post("/", authenticate, validateBody(schemas.contactsSchema), contactsOperation.addContact);

router.delete("/:contactId", authenticate, isValidId, contactsOperation.removeContact);

router.put("/:contactId", authenticate, isValidId, validateBody(schemas.updateSchema), contactsOperation.updateContact);

module.exports = router;
