import { useContext, useEffect } from "react";
import { useModal } from "./ModalContext";
import SignupModal from "../auth/SignupModal";
import AuthContext, { User } from "../auth/AuthenticationContext";
import { AuthUserData } from "../auth/AuthModal";

export default function GoogleAuthHandler() {
    const authContext = useContext(AuthContext);
    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { login, authState } = authContext;

    const { openModal, closeModal } = useModal();

    useEffect(() => {
        const handleState = async () => {
            const hash = window.location.hash;
            const hparams = parseHashParams(hash);

            const hashState = hparams['state'];
            if(hashState === 'verify_token') {
                const token = hparams['access_token'];

                if(token) {
                    const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + `/auth/signin/google?accessToken=${token}`;
    
                    try {
                        const response = await fetch(url, {
                            method: 'POST',
                            headers: {
                                'ngrok-skip-browser-warning': 'true'
                            }
                        });

                        if(response.ok) {
                            const data = await response.json();
                            const authUserData = data.userData as AuthUserData;
                            const userData = { 
                                id: authUserData.id, 
                                name: authUserData.name,
                                email: authUserData.email,
                            } as User;
                            if(authUserData.avatar) {
                                userData.avatar = authUserData.avatar.src;
                            }

                            login(data.token, userData);
                        }
                        else if (response.status === 401) {
                            const data = await response.json();
                            
                            openModal('signupModal', <SignupModal hideModal={() => closeModal('signupModal')} googleData={data.userInfo} />);
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
            }
        }

        if(!authState.isAuthenticated) {
            handleState();
        }
    }, []);
    
    return null;
}

const parseHashParams = (hash: string) => {
    const params: Record<string, string> = {};
    const hashWithoutHashSymbol = hash.substring(1); // Remove the initial `#`
    const hashParams = new URLSearchParams(hashWithoutHashSymbol);

    hashParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  };