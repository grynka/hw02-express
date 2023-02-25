const express = require("express");
const contactsOperation = require("../../controlers/contacts");
const router = express.Router();
const { schemas } = require("../../models/contact")
const {validateBody, isValidId} = require("../../middlewares");


router.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateFavoriteSchema, {"message": "missing field favorite"}), contactsOperation.updateStatusContact )

router.get("/", contactsOperation.listContacts);

router.get("/:contactId", isValidId, contactsOperation.getContactById);

router.post("/", validateBody(schemas.contactsSchema), contactsOperation.addContact);

router.delete("/:contactId", isValidId, contactsOperation.removeContact);

router.put("/:contactId", isValidId, validateBody(schemas.updateSchema), contactsOperation.updateContact);

module.exports = router;
