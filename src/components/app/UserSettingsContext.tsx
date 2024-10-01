import { createContext, ReactNode, useContext, useState } from "react";

export enum ColorTheme {
    DARK = "DARK",
    WHITE = "WHITE"
}

interface UserSettingsContextProps {
    currency: string;
    colorTheme: ColorTheme;
    navbarWidth: number;
    updateCurrency: (value: string) => void;
    updateColorTheme: (value: ColorTheme) => void;
    updateNavbarWidth: (value: number) => void;
}

const UserSettingContext = createContext<UserSettingsContextProps | undefined>(undefined);

interface UserSettingsProviderProps {
    children: ReactNode
}

export function UserSettingsProvider({ children }: UserSettingsProviderProps) {
    const [currency, setCurrency] = useState('$');
    const [colorTheme, setColorTheme] = useState(ColorTheme.WHITE);
    const [navbarWidth, setNavbarWidth] = useState(0);

    const updateCurrency = (value: string) => {
        setCurrency(value);
    }

    const updateColorTheme = (value: ColorTheme) => {
        setColorTheme(value);
    }

    const updateNavbarWidth = (value: number) => {
        setNavbarWidth(value);
    }

    return (
        <UserSettingContext.Provider value={{
            currency: currency, 
            colorTheme: colorTheme, 
            navbarWidth: navbarWidth,
            updateCurrency: updateCurrency, 
            updateColorTheme: updateColorTheme,
            updateNavbarWidth: updateNavbarWidth,
            }}>
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