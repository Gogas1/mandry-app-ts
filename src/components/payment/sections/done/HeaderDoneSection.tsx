// import { Housing } from "../../../housing/HousingPage";
import '../../../../styles/payment/done/header-done-section.scss';
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../auth/AuthenticationContext";

interface UserData {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
}

export default function HeaderDoneSection() {
    const authContext = useContext(AuthContext);
    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }
    const { t } = useTranslation();

    const [userData, setUserData] = useState<UserData>({ id: '', name: 'loading...', surname: 'loading...', email: 'loading...', phone: 'loading...' } as UserData);

    useEffect(() => {
        const fetchData = async () => {
            const token = authContext.authState.token;
    
            if(token) {
                try {
                    const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/a/data";
        
                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'ngrok-skip-browser-warning': 'true'
                        }
                    });
    
                    if(response.ok) {
                        const data = await response.json();
    
                        if(data.userData) {
                            const uData = data.userData;
    
                            setUserData({ id: uData.id, name: uData.name, surname: uData.surname, email: uData.email, phone: uData.phone } as UserData)
                        }
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <section className="header-done-section">
                <h1 className="header-done-section__header">
                    {t('PaymentPage.Done.Header.Header')}
                </h1>
                <p className="header-done-section__subheader">
                    {t('PaymentPage.Done.Header.Subheader', { email: userData.email })}
                </p>
            </section>
        </>
    );
}