import '../../../styles/payment/modals/reserving-modal.scss';

import crossIcon from '../../../assets/icons/meta/close-cross.svg';
import loading from '../../../assets/anim/loading2.gif';
import mIcon from '../../../assets/icons/meta/small-logo.svg';
import checkIcon from '../../../assets/icons/meta/check-circle.svg';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ReservingModalProps {
    closeModal: () => void;
    onSuccess: () => void;
}

enum ModalState {
    WAITING = "WAITING",
    ANALYSIS = "ANALYSIS",
    CONFIRMATION = "CONFIRAMTION",
    CONNECTING = "CONNECTING",
    DONE = "DONE"
}

export default function ReservingModal({ closeModal, onSuccess }: ReservingModalProps) {
    const { t } = useTranslation();

    const [modalState, setModalState] = useState<ModalState>(ModalState.WAITING);
    const [showButton, setShowButton] = useState(true);

    const switchToContentAwaiting = () => {        
        const showButtonValue = false;
        setShowButton(showButtonValue);

        changeToAnalysis();
    }

    const changeToAnalysis = () => {
        setTimeout(() => {
            setModalState(ModalState.ANALYSIS);
            const showButtonValue = false;
            setShowButton(showButtonValue);

            changeToConfirmation();

        }, 1000);
    }

    const changeToConfirmation = () => {
        setTimeout(() => {
            setModalState(ModalState.CONFIRMATION);
            const showButtonValue = true;
            setShowButton(showButtonValue);

        }, 1750);
    }

    const changeToConnection = () => {
        setModalState(ModalState.CONNECTING);
        const showButtonValue = true;
        setShowButton(showButtonValue);
        changeToSuccess();
    }

    const changeToSuccess = () => {
        setTimeout(() => {
            setModalState(ModalState.DONE);
            const showButtonValue = false;
            setShowButton(showButtonValue);
            changeToClosing();
        }, 3000);
    }

    const changeToClosing = () => {
        setTimeout(() => {
            closeModal();
            onSuccess();
        }, 2000);
    }

    useEffect(() => {
        switchToContentAwaiting();
    }, []);
    

    const getContentSwitch = () => {
        switch (modalState) {
            case ModalState.WAITING:
                return (
                    <>
                        <div className='center-content'>
                            <img src={mIcon} className='mini-icon'/>
                            <p className='label'>{t('PaymentPage.Modal.Awaiting')}</p>
                            <img src={loading} className='loading'/>
                        </div>
                    </>
                );
            case ModalState.ANALYSIS:
                return (
                    <>
                        <div className='center-content'>
                            <p className='label'>{t('PaymentPage.Modal.Analysis')}</p>
                            <img src={loading} className='loading'/>
                        </div>
                    </>
                );
            case ModalState.CONFIRMATION:
                return (
                    <>
                        <div className='confirmation-content'>
                            <h2 className='confirmation-content__header'>{t('PaymentPage.Modal.ConfirmationHeader')}</h2>
                            <hr className='confirmation-content__divider' />
                            <p className='confirmation-content__text'>{t('PaymentPage.Modal.ConfirmationText')}</p>
                            <button className='confirmation-content__button' onClick={changeToConnection}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='svg'>
                                    <path d="M12 14.2593V16.3333M7 9.62246C7.47142 9.59259 8.05259 9.59259 8.8 9.59259H15.2C15.9474 9.59259 16.5286 9.59259 17 9.62246M7 9.62246C6.41168 9.65969 5.99429 9.74348 5.63803 9.9317C5.07354 10.23 4.6146 10.7059 4.32698 11.2913C4 11.9568 4 12.8279 4 14.5704V16.0222C4 17.7647 4 18.6358 4.32698 19.3013C4.6146 19.8867 5.07354 20.3626 5.63803 20.6609C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.6609C18.9265 20.3626 19.3854 19.8867 19.673 19.3013C20 18.6358 20 17.7647 20 16.0222V14.5704C20 12.8279 20 11.9568 19.673 11.2913C19.3854 10.7059 18.9265 10.23 18.362 9.9317C18.0057 9.74348 17.5883 9.65969 17 9.62246M7 9.62246V7.51852C7 4.65482 9.36817 3 12 3C14.6318 3 17 4.65482 17 7.51852V9.62246" stroke="#F7F7F7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                {t('PaymentPage.Modal.ConfirmationConnect')}
                            </button>
                        </div>
                    </>
                );
            case ModalState.CONNECTING:
                return (
                    <>
                        <div className='center-content'>
                            <p className='label'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none" className='svg'>
                                    <path d="M9 12.2593V14.3333M4 7.62246C4.47142 7.59259 5.05259 7.59259 5.8 7.59259H12.2C12.9474 7.59259 13.5286 7.59259 14 7.62246M4 7.62246C3.41168 7.65969 2.99429 7.74348 2.63803 7.9317C2.07354 8.22996 1.6146 8.70585 1.32698 9.29126C1 9.95683 1 10.8279 1 12.5704V14.0222C1 15.7647 1 16.6358 1.32698 17.3013C1.6146 17.8867 2.07354 18.3626 2.63803 18.6609C3.27976 19 4.11984 19 5.8 19H12.2C13.8802 19 14.7202 19 15.362 18.6609C15.9265 18.3626 16.3854 17.8867 16.673 17.3013C17 16.6358 17 15.7647 17 14.0222V12.5704C17 10.8279 17 9.95683 16.673 9.29126C16.3854 8.70585 15.9265 8.22996 15.362 7.9317C15.0057 7.74348 14.5883 7.65969 14 7.62246M4 7.62246V5.51852C4 2.65482 6.36817 1 9 1C11.6318 1 14 2.65482 14 5.51852V7.62246" stroke="#515151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                {t('PaymentPage.Modal.Confirmation')}
                            </p>
                            <img src={loading} className='loading'/>
                        </div>  
                    </>
                );
            case ModalState.DONE:
                return (
                    <div className='center-content'>
                        <img src={checkIcon} />
                    </div>
                );
        }
    }

    return (
        <>
            <div className="reserving-modal">
                {getContentSwitch()}
            </div>
            {showButton && (
                <button className="reserving-modal-close" onClick={closeModal}>
                    <img src={crossIcon} />
                </button>
            )}
            
        </>
    );
}