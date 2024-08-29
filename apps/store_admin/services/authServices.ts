import { businessApiClient } from "@/lib"
import type { RegisterStorePayload } from "@/types"

export async function registerAndCreateStoreService(payload: RegisterStorePayload) {
    const res = await businessApiClient.post("/v1/auth/register-store", payload)
    return res.data
}
