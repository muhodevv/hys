import { businessApiClient } from "@/lib"

export async function listStoresOfLoggedInUser() {
    const res = await businessApiClient.get("/v1/stores/list-stores-of-logged-in-user")
    return res.data
}
