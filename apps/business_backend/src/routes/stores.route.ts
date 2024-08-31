import { listStoresOfLoggedInUser } from "@controllers/stores.controller";
import { protect } from "@middlewares/auth";
import { Router } from "express";

const router = Router();

router.get("/list-stores-of-logged-in-user", protect, listStoresOfLoggedInUser);

export default router;