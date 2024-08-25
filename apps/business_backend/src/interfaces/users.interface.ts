export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAcceptedTerms: boolean;
    stores: string[];
    roles: string[];
    captchaToken: string;
    isPasswordGenerated: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}