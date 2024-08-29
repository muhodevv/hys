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