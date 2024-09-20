import { createContext, useState, useEffect, ReactNode, FC } from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}

interface AuthContextType {
    authState: AuthState;
    isReady: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    updateAvatar: (avatar: string) => void;
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

    const [isReady, setIsReady] = useState(false); 

    const [,setIsTokenValidated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + '/auth/verify-token';
        
            const verifyToken = async () => {
                try {
                    const response = await fetch(url, {
                        method: "POST",
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'ngrok-skip-browser-warning': 'true'
                        }
                    });

                    if(response.ok) {
                        const data = await response.json();

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

                        setIsReady(true);
                    } else if(response.status === 401) {
                        setIsTokenValidated(false);
                        setIsReady(true);
                    }
                } catch (error) {
                    console.log('AuthContext error', error);
                }
            };

            verifyToken();
        }
        else {
            setIsReady(true);
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

    const updateAvatar = (avatar: string) => {
        const updatedUser = { ...authState}
        if(updatedUser.user) {
            updatedUser.user.avatar = avatar;
            localStorage.setItem('user', JSON.stringify(updatedUser.user));
            setAuthState(updatedUser);
        }
    }

    return (
        <AuthContext.Provider value={{ authState, isReady: isReady, login, logout, updateAvatar: updateAvatar }}>
            {isReady && (children)}
        </AuthContext.Provider>
    );
};

export default AuthContext;
