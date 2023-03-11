const express = require("express");
const ctrl = require("../../controllers/auth");
const {validateBody, authenticate, upload} = require("../../middlewares");
const {authSchema} = require("../../models/user");
const router = express.Router();

router.post("/signup", validateBody(authSchema), ctrl.signup);

router.post("/login", validateBody(authSchema), ctrl.login);

router.get("/current", authenticate, ctrl.current);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/users", authenticate, ctrl.subscriptionUpdate);

router.patch("/users/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;