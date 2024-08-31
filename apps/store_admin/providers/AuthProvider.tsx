"use client";
import {
    useGetMeQuery,
    useListStoresOfLoggedInUserQuery,
    useLoginMutation,
    useLogoutMutation,
    useRegisterStoreMutation,
} from "@/hooks/useServices";
import { array } from "@/lib/utils";
import { User } from "@/Resources";
import type { LoginPayload, RegisterStorePayload, IUser } from "@/types";
import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
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
    logout: () => void;
    stores: any[];
    activeStoreId: null | string;
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
    user: null,
    logout: () => { },
    stores: [],
    activeStoreId: null,
});

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuth must be used within an AuthProvider");

    return context;
}

const AUTH_ROUTES = ["/register", "/login"];

export function AuthProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [state, setState] = useState<State>({
        isLoggedIn: false,
        user: null,
        isFetching: true,
    });
    const routerParams = useParams();
    const storeSlug = routerParams?.storeSlug;

    const isAuthRoute = useMemo(
        () => AUTH_ROUTES.some((route) => pathname.startsWith(route)),
        [pathname]
    );

    const listStoresQuery = useListStoresOfLoggedInUserQuery({
        enabled: state.isLoggedIn && !!state.user,
    });

    const stores = array<any>(listStoresQuery.data?.docs);

    const activeStoreId = useMemo(() => {
        if (!storeSlug) return null;

        const store = stores.find((store) => store.key === routerParams.storeSlug);
        return store?._id || null;
    }, [storeSlug, stores]);

    const loginMutation = useLoginMutation();
    const logoutMutation = useLogoutMutation();
    const registerStoreMutation = useRegisterStoreMutation();
    const [registerLoading, setRegisterLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);

    const getMeQuery = useGetMeQuery();

    useEffect(() => {
        if (!getMeQuery.isFetched) return;

        if (getMeQuery.data?.success) {
            setLoggedIn(User(getMeQuery.data.user));
        } else {
            setUnLoggedIn();
        }
    }, [getMeQuery.data, getMeQuery.isFetched]);

    useEffect(() => {
        if (state.isFetching) return;

        if (state.isLoggedIn && isAuthRoute) {
            //TODO: send to first store of user
            return router.push("/");
        }

        if (!state.isLoggedIn && !isAuthRoute) {
            return router.push("/login");
        }
    }, [state.isLoggedIn, state.isFetching, isAuthRoute]);

    useEffect(() => {
        if (pathname !== "/") return

        if (!state.isLoggedIn || state.isFetching) return

        if (stores.length === 0) return

        const currentstoreId = localStorage.getItem("activeStoreId")

        let storeKey = stores[0]?.key || ""
        let storeId = stores[0]?._id || ""

        if (currentstoreId) {
            const findStore = stores.find(store => store?._id === currentstoreId)
            if (findStore) {
                storeKey = findStore.key
                storeId = findStore._id
            }
        }

        if (!storeKey || !storeId) return
        localStorage.setItem("activeStoreId", storeId)
        router.push(`/${storeKey}`)
    }, [pathname, state.isLoggedIn, state.isFetching, stores])

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

    const logout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                setUnLoggedIn();
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
                user: state.user,
                logout,
                activeStoreId,
                stores,
            }}
        >
            {state.isFetching || listStoresQuery.isFetching ? (
                <div>Loading...</div>
            ) : storeSlug && state.isLoggedIn && !activeStoreId ? (
                <div>
                    <div>
                        Permission Denied
                    </div>
                    <Link href="/">Return Home</Link>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}
