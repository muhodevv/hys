import userModel from "@models/users.model";
import { verifyToken } from "@utils/jwt";
import { NextFunction, Request, Response } from "express";

export async function protect(req: Request, res: Response, next: NextFunction) {
    const token = req?.cookies["token"] || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "You are not authorized to access this route" });
    }

    const decoded = verifyToken(token);

    const userId = (decoded as any)?.userId;

    if (!userId) {
        return res.status(401).json({ message: "You are not authorized to access this route" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }

    (req as any).user = user;

    delete (req as any).user.password;

    next();
}