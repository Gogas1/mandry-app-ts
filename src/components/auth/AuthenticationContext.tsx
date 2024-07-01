import { createContext, useState, useEffect, ReactNode, FC } from "react";

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}

interface AuthContextType {
    authState: AuthState;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
        token: null
    });

    const [isTokenValidated, setIsTokenValidated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/account/verify-token`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                if (response.status === 401) {
                    setIsTokenValidated(false);
                    return;
                }
                return response.json();
            })
            .then((data) => {
                if (data.verified) {
                    const user = JSON.parse(localStorage.getItem('user') || 'null');
                    setAuthState({
                        isAuthenticated: true,
                        user,
                        token
                    });
                    setIsTokenValidated(true);
                } else {
                    setIsTokenValidated(false);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsTokenValidated(false);
            });
        }
    }, []);

    const login = (token: string, user: User) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({ isAuthenticated: true, user, token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({ isAuthenticated: false, user: null, token: null });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
