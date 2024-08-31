import { listStoresOfLoggedInUser } from "@/services";
import { useQuery } from "@tanstack/react-query";

export function useListStoresOfLoggedInUserQuery(payload?: {
    enabled: boolean
}) {
    return useQuery({
        queryKey: ["list-stores-of-logged-in-user"],
        queryFn: listStoresOfLoggedInUser,
        retry: false,
        enabled: payload?.enabled
    })
}