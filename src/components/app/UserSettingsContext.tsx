import { createContext, ReactNode, useContext, useState } from "react";



interface UserSettingsContextProps {
    currency: string;
    updateCurrency: (value: string) => void;
}

const UserSettingContext = createContext<UserSettingsContextProps | undefined>(undefined);

interface UserSettingsProviderProps {
    children: ReactNode
}

export function UserSettingsProvider({ children }: UserSettingsProviderProps) {
    const [currency, setCurrency] = useState('$');

    const updateCurrency = (value: string) => {
        setCurrency(value);
    }

    return (
        <UserSettingContext.Provider value={{currency: currency, updateCurrency: updateCurrency}}>
            {children}
        </UserSettingContext.Provider>
    );
}

export const useUserSettings = (): UserSettingsContextProps => {
    const context = useContext(UserSettingContext);
    if(!context) {
        throw new Error('useAuthorization must be used within a AuthorizationProvider');
    }
    return context;
}