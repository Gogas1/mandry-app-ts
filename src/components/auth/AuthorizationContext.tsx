import{ createContext, ReactNode, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthenticationContext";


interface AuthorizationContextProps {
    user: User;
}

interface User {
    isAgreementAccepted: boolean;
}

const AuthorizationContext = createContext<AuthorizationContextProps | undefined>(undefined);

interface AuthorizationProviderProps {
    children: ReactNode
}

export function AuthorizationProvider({ children }: AuthorizationProviderProps) {
    const [user, setUser] = useState<User>({
        isAgreementAccepted: false
    });

    const authContext = useContext(AuthContext);

    useEffect(() => {
        
    }, []);

    return (
        <AuthorizationContext.Provider value={{ user: user }}>
            {children}
        </AuthorizationContext.Provider>
    );
}

export const useAuthorization = (): AuthorizationContextProps => {
    const context = useContext(AuthorizationContext);
    if(!context) {
        throw new Error('useAuthorization must be used within a AuthorizationProvider');
    }
    return context;
}