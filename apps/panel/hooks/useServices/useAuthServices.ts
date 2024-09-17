import { getMeService, loginService, logoutService, registerAndCreateStoreService } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useRegisterStoreMutation() {
    return useMutation({
        mutationFn: registerAndCreateStoreService,
    })
}

export function useLoginMutation() {
    return useMutation({
        mutationFn: loginService,
    })
}

export function useLogoutMutation() {
    return useMutation({
        mutationFn: logoutService,
    })
}

export function useGetMeQuery() {
    return useQuery({
        queryKey: ["get-me"],
        queryFn: getMeService,
        retry: false
    })
}