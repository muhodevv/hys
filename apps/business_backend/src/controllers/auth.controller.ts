import catchAsync from "@utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import Store from "@models/stores.model"
import User from "@models/users.model"
import { generateToken } from "@utils/jwt";
import { JWT_COOKIE_EXPIRES_IN } from "@constants/env";
import CustomError from "@utils/CustomError";

const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
    const token = generateToken({ userId: user._id });

    if (user.password) {
        user.password = undefined;
    }

    // set jwt secure cookie
    const options: any = {
        expires: new Date(Date.now() + +JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000), // convert to milliseconds from days
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.cookie('token', token, options);

    res.status(statusCode)
        .json({ success: true, token, user });
}

export const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    res.status(200).json({ success: true, user });
})

export const registerAndCreateStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {
        storeName,
        subdomain,
        firstName,
        lastName,
        email,
        password,
        isAcceptedTerms
    } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        return next(new CustomError('User already exists', 400));
    }

    // Create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        isAcceptedTerms,
    })

    // Create store
    //TODO: add trialExpirationDate and set a trial plan
    const store = await Store.create({
        name: storeName,
        subdomain,
        owner: user._id,
        members: [user._id]
    })

    // Send token
    sendTokenResponse(user, 201, res);
})

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return next(new CustomError('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new CustomError('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new CustomError('Invalid credentials', 401));
    }

    // Send token
    sendTokenResponse(user, 200, res);
})