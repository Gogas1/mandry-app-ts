import { Trans, useTranslation } from 'react-i18next';
import arrowIcon from '../../assets/icons/meta/arrow.svg';
import smallLogoIcon from '../../assets/icons/meta/small-logo.svg';

import '../../styles/auth/agreement-modal.scss';
import { useModal } from '../app/ModalContext';
import SignupModal, { SignUpError } from './SignupModal';
import { CSSProperties, useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthenticationContext';
import CommunityRulesModal from './CommunityRulesModal';
import SignupErrorModal from './SignupErrorModal';
import CreateProfileModal from './CreateProfileModal';

interface AgreementModalProps {
    hideModal: () => void;
    errorCodeHandler?: (error: SignUpError | undefined) => void;
    data?: AgreementModalDataHolder;
}

export interface AgreementModalDataHolder {
    name: string;
    surname: string;
    birthdate: Date;
    email: string;
    phone: string;
    password: string;

    accessToken?: string;
}

export default function AgreementModal({ hideModal, errorCodeHandler, data }: AgreementModalProps) {
    const { t } = useTranslation();
    const { closeModal, openModal } = useModal();
    // const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { login } = authContext;

    const [signUpData] = useState<AgreementModalDataHolder | undefined>(data);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        hideModal();
        openModal('signup', <SignupModal hideModal={() => closeModal('signup')} />);
    }

    const handleRulesModalOpen = () => {
        openModal(
            'rules', 
            <CommunityRulesModal hideModal={() => closeModal('rules')} />,
            { minWidth: '32.5%', maxWidth: '32.5%' } as CSSProperties
        );
    }

    const callErrorModal = (error: SignUpError) => {
        hideModal();
        openModal(
            'signup-error', 
            <SignupErrorModal hideModal={() => closeModal('signup-error')} error={error}/>,
            { minWidth: '32.5%', maxWidth: '32.5%' } as CSSProperties
        );
    }

    const handleSignUpRequest = async () => {
        setLoading(true);

        if(!loading) {
            if(errorCodeHandler) {
                errorCodeHandler(undefined);
            }

            let url = ''
            
            console.log(data);

            if(!data?.accessToken) {
                url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/a/auth/signup";
            }
            else {
                url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/a/auth/signup-google";
            }
    
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }, 
                body: JSON.stringify({
                    name: signUpData?.name,
                    surname: signUpData?.surname,
                    phone: signUpData?.phone,
                    email: signUpData?.email,
                    password: signUpData?.password,
                    BirthDate: signUpData?.birthdate,
                    accesstoken: signUpData?.accessToken
                })
            })
            .then(async (response) => {
                if(response.ok) {
                    return await response.json();
                } else if (response.status === 400) {
                    let error = SignUpError.INVALID_DATA;
                    if(errorCodeHandler) {
                        errorCodeHandler(SignUpError.INVALID_DATA);
                    }
                    callErrorModal(error);
                    setLoading(false);

                    throw 400;
                    
                } else if (response.status === 409) {
                    let error = SignUpError.USER_EXIST;
                    if(errorCodeHandler) {
                        errorCodeHandler(error);
                    }
                    callErrorModal(error);
                    setLoading(false);

                    throw 409;
                    
                } else {
                    let error = SignUpError.UNKNOWN;
                    if(errorCodeHandler) {
                        errorCodeHandler(error);
                    }
                    callErrorModal(error);
                    setLoading(false);
                }

                throw new Error(`Response with status code ${response.status}: ${response.statusText}`);
            })
            .then((data) => {
                login(data.token, data.userData);
                hideModal();
                closeModal('signup');
                openModal(
                    'createProfile', 
                    <CreateProfileModal hideModal={() => closeModal('createProfile')} />,
                    { minWidth: '32.5%', maxWidth: '32.5%' } as CSSProperties)
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                switch (error) {
                    case 400:
                        return;
                    case 409:
                        return;
                    default:
                        console.log(error);
                        let errorCode = SignUpError.UNKNOWN;
                        if(errorCodeHandler) {
                            errorCodeHandler(errorCode);
                        }
                        callErrorModal(errorCode);
                        return;
                }
            });
        }
    }

    return (
        <>
            <div className="agreement-modal-border"></div>
            <div className="agreement-modal-panel">
                <img className='agreement-modal-panel__icon' src={smallLogoIcon} />
                <p className='agreement-modal-panel__caption'>{t('Modals.SignUpAgreement.Caption')}</p>
                <p className='agreement-modal-panel__definition'>
                    <Trans i18nKey={'Modals.SignUpAgreement.Definition'}
                        components={{
                            decoratedName: <span className='decorated-name' />
                        }} />
                </p>
                <p className='agreement-modal-panel__proceed'>{t('Modals.SignUpAgreement.ProceedToAgreement')}</p>
                <p className='agreement-modal-panel__agreement'>{t('Modals.SignUpAgreement.Agreement')}</p>
                <label 
                    className='agreement-modal-panel__more'
                    onClick={handleRulesModalOpen}>{t('Modals.SignUpAgreement.More')}</label>
                <button 
                    className={`agreement-modal-panel__continue-btn ${loading ? 'disabled' : ''}`}
                    onClick={handleSignUpRequest}>{t('Modals.SignUpAgreement.ContinueBtnLabel')}</button>
                <button 
                    className='agreement-modal-panel__back-btn'
                    onClick={handleClose}>{t('Modals.SignUpAgreement.BackBtnLabel')}</button>
            </div>
            <button className={`agreement-modal-button`} onClick={handleClose}>
                <img src={arrowIcon} />
            </button>
        </>
    );
}