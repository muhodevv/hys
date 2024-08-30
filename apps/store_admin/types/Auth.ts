export interface RegisterStoreForm {
    storeName: string,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    confirmPassword: String,
    isAcceptedTerms: boolean,
    subdomain: String
}

export interface RegisterStorePayload extends RegisterStoreForm { }

export interface LoginForm {
    email: string,
    password: string
}

export interface LoginPayload extends LoginForm { }

export type IUser = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    stores: any[]; //TODO: Add store type
};
