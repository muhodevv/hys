import { businessApiClient } from "@/lib"

interface RegisterStorePayload {
    storeName: string,
    firstName: String,
    lastName: String,
    email: String,
    isAcceptedTerms: boolean,
    password: String,
}

export async function registerAndCreateStoreService(payload: RegisterStorePayload) {
    const res = await businessApiClient.post("/auth/register-store", payload)
    return res.data
}
