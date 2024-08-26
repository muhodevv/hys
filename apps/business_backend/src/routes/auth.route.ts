import { registerAndCreateStore } from "controllers/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/register-store", registerAndCreateStore);

export default router;