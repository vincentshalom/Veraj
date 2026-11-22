import express from "express";

import { auth } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", auth.signup);
router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.post("/forgot-password", auth.forgotPassword);
router.post("/reset-password", auth.resetPassword);

export default router;
