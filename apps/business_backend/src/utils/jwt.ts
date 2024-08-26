import { JWT_SECRET } from '@constants/env';
import jwt from 'jsonwebtoken';

export const generateToken = (data: any) => {
    //TODO: write dynamic expiration time or implement refresh token logic
    return jwt.sign(data, JWT_SECRET, { expiresIn: '1w' });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};