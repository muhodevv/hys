import { registerAndCreateStoreService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export function useRegisterStoreMutation() {
    return useMutation({
        mutationFn: registerAndCreateStoreService,
    })
}