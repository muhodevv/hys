import catchAsync from "@utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import Store from "@models/stores.model"
import CustomError from "@utils/CustomError";

export const listStoresOfLoggedInUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user._id;

    const stores = await Store.find({ members: userId })

    res.status(200).json({ success: true, docs: stores });
})

export const getStores = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const stores = await Store.find()
    res.status(200).json({ success: true, docs: stores });
})

export const createStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const store = await Store.create(req.body)
    res.status(201).json({ success: true, doc: store });
})

export const updateStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const store = await Store.findByIdAndUpdate(req.params.storeId, req.body, { new: true });

    if (!store) {
        throw new CustomError('Store not found', 404);
    }

    res.status(200).json({ success: true, doc: store });
})

export const deleteStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const store = await Store.findByIdAndDelete(req.params.storeId);

    if (!store) {
        throw new CustomError('Store not found', 404);
    }

    res.status(204).json({ success: true, doc: store });
})

export const getStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const store = await Store.findById(req.params.storeId);

    if (!store) {
        throw new CustomError('Store not found', 404);
    }

    res.status(200).json({ success: true, doc: store });
})