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

export interface Store {
    name: string;
    logo: string;
    domain: string;
    subdomain: string;
    plan: string;
    addresses: string[];
    creationDate: Date;
    trialExpirationDate: Date;
    description: string;
    members: string[];
    owner: string;
    isActive: boolean;
    created: Date;
    image: string;
}