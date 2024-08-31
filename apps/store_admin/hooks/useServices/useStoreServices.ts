import { listStoresOfLoggedInUser } from "@/services";
import { useQuery } from "@tanstack/react-query";

export function useListStoresOfLoggedInUserQuery() {
    return useQuery({
        queryKey: ["list-stores-of-logged-in-user"],
        queryFn: listStoresOfLoggedInUser,
        retry: false
    })
}