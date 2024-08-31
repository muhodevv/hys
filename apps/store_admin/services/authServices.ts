import { businessApiClient } from "@/lib"
import type { RegisterStorePayload } from "@/types"

export async function registerAndCreateStoreService(payload: RegisterStorePayload) {
    const res = await businessApiClient.post("/v1/auth/register-store", payload)
    return res.data
}

export async function loginService(payload: { email: string, password: string }) {
    const res = await businessApiClient.post("/v1/auth/login", payload)
    return res.data
}

export async function getMeService() {
    const res = await businessApiClient.get("/v1/auth/getme")
    return res.data
}

export async function logoutService() {
    const res = await businessApiClient.post("/v1/auth/logout")
    return res.data
}