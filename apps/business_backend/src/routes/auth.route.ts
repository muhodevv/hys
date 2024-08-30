import { Router } from "express";
import { getMe, login, registerAndCreateStore } from "@controllers/auth.controller";
import { protect } from "@middlewares/auth";

const router = Router();

router.get("/getme", protect, getMe)
router.post("/register-store", registerAndCreateStore);
router.post("/login", login);

export default router;