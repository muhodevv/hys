"use client";
import {
    useGetMeQuery,
    useLoginMutation,
    useRegisterStoreMutation,
} from "@/hooks/useServices";
import { User } from "@/Resources";
import type { LoginPayload, RegisterStorePayload, IUser } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

type AuthContextType = {
    registerStore: (payload: RegisterStorePayload) => void;
    login: (payload: LoginPayload) => void;
    loginLoading: boolean;
    error?: string;
    registerLoading: boolean;
    user: IUser | null;
};

type State = {
    isLoggedIn: boolean;
    user: IUser | null;
    isFetching: boolean;
};

const AuthContext = createContext<AuthContextType>({
    error: "",
    registerLoading: false,
    loginLoading: false,
    login: (payload: LoginPayload) => { },
    registerStore: (payload: RegisterStorePayload) => { },
    user: null
});

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuth must be used within an AuthProvider");

    return context;
}

const AUTH_ROUTES = ["/register", "/login"];

export function AuthProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter()
    const [state, setState] = useState<State>({
        isLoggedIn: false,
        user: null,
        isFetching: true,
    });

    const isAuthRoute = useMemo(() => AUTH_ROUTES.some(route => pathname.startsWith(route)), [pathname]);

    const loginMutation = useLoginMutation();
    const registerStoreMutation = useRegisterStoreMutation();
    const [registerLoading, setRegisterLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);

    const getMeQuery = useGetMeQuery();

    useEffect(() => {
        if (getMeQuery.isSuccess) {
            if (getMeQuery.data?.success) {
                setLoggedIn(User(getMeQuery.data.user));
            } else {
                setUnLoggedIn();
            }
        }
    }, [getMeQuery.isSuccess]);

    useEffect(() => {
        if (state.isFetching) return;

        if (state.isLoggedIn && isAuthRoute) {
            //TODO: send to first store of user
            router.push("/");
        }

        if (!state.isLoggedIn && !isAuthRoute) {
            router.push("/login");
        }
    }, [state.isLoggedIn, state.isFetching, isAuthRoute]);

    const login = (payload: LoginPayload) => {
        setLoginLoading(true);
        loginMutation.mutate(payload, {
            onSuccess: (res) => {
                if (res?.success) {
                    setLoggedIn(User(res.user));
                }
            },
            onSettled: () => {
                setLoginLoading(false);
            },
        });
    };

    const registerStore = (payload: RegisterStorePayload) => {
        setRegisterLoading(true);
        registerStoreMutation.mutate(payload, {
            onSuccess: (res) => {
                if (res?.success) {
                    setLoggedIn(User(res.user));
                }
            },
            onSettled: () => {
                setRegisterLoading(false);
            },
        });
    };

    const setLoggedIn = (user: IUser) => {
        setState({
            isLoggedIn: true,
            user,
            isFetching: false,
        });
    };

    const setUnLoggedIn = () => {
        setState({
            isLoggedIn: false,
            user: null,
            isFetching: false,
        });
    };



    return (
        <AuthContext.Provider
            value={{
                registerStore,
                error: registerStoreMutation.error?.message,
                registerLoading,
                login,
                loginLoading,
                user: state.user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
