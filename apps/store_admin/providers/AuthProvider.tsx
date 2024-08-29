"use client";
import { useRegisterStoreMutation } from "@/hooks/useServices";
import type { RegisterStorePayload } from "@/types";
import { Context, createContext, ReactNode, useContext, useState } from "react";

type AuthContextType = {
    registerStore: (payload: RegisterStorePayload) => void
    error?: string;
    registerLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    error: "",
    registerLoading: false,
    registerStore: (payload: RegisterStorePayload) => { }
});

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuth must be used within an AuthProvider");

    return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const registerStoreMutation = useRegisterStoreMutation();
    const [registerLoading, setRegisterLoading] = useState(false);

    const registerStore = (payload: RegisterStorePayload) => {
        setRegisterLoading(true);
        registerStoreMutation.mutate(payload, {
            onSuccess: (res) => {
                if (res?.success) {
                    window.location.replace("/");
                }
            },
            onSettled: () => {
                setRegisterLoading(false);
            }
        });
    };

    return (
        <AuthContext.Provider
            value={{
                registerStore,
                error: registerStoreMutation.error?.message,
                registerLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
