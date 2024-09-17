import { createContext, useContext, useState } from "react";

type AuthContextType = {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    user: null
    isFetching: boolean;
}

type StateType = {
    isLoggedIn: boolean;
    user: null;
    isFetching: boolean;
}

type AuthProviderProps = {
    children: (value: AuthContextType) => JSX.Element
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
    user: null,
    isFetching: true
});


export function AuthProvider({ children }: AuthProviderProps) {
    const [state, setState] = useState<StateType>({
        isLoggedIn: true,
        user: null,
        isFetching: false,
    })

    const login = () => {
        setState({
            isLoggedIn: true,
            user: null,
            isFetching: false
        })
    }

    const logout = () => {
        setState({
            isLoggedIn: false,
            user: null,
            isFetching: false
        })
    }
    const contextValue = {
        isLoggedIn: state.isLoggedIn,
        login,
        logout,
        user: state.user,
        isFetching: state.isFetching
    }
    return <AuthContext.Provider value={contextValue}>
        {
            children(contextValue)
        }
    </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}