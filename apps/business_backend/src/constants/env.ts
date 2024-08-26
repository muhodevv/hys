export const JWT_SECRET = process.env.JWT_SECRET || "";
export const JWT_COOKIE_EXPIRES_IN = process.env.JWT_COOKIE_EXPIRES_IN || "1"

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
