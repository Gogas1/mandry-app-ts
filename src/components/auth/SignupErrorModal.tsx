import { Trans, useTranslation } from 'react-i18next';
import arrowIcon from '../../assets/icons/meta/arrow.svg';
import logoIcon from '../../assets/icons/meta/small-logo.svg';

import '../../styles/auth/signup-error-modal.scss';
import { useModal } from '../app/ModalContext';
import SignupModal, { SignUpError } from './SignupModal';
import AuthModal from './AuthModal';

interface SignupErrorModalProps {
    error: SignUpError;
    hideModal: () => void;
}

export default function SignupErrorModal({ hideModal, error }: SignupErrorModalProps) {
    const { t } = useTranslation();
    const { openModal, closeModal } = useModal();

    const handleBack = () => {
        hideModal();
        openModal('signup', <SignupModal hideModal={() => closeModal('signup')} /> )
    }

    const handleToSignIn = () => {
        hideModal();
        closeModal('argreement');
        openModal('signin', <AuthModal hideModal={() => closeModal('signin')} />);
    }

    const getErrorText = function (error: SignUpError): { caption: string, text: JSX.Element } {
        switch (error) {
            case SignUpError.INVALID_DATA:
                return { caption: t('Modals.SignUpError.InvalidData.Caption'), text: <Trans i18nKey={'Modals.SignUpError.InvalidData.Text'} /> }
            case SignUpError.USER_EXIST:
                return { caption: t('Modals.SignUpError.UserExist.Caption'), 
                    text: <Trans 
                        i18nKey={'Modals.SignUpError.UserExist.Text'} 
                        components={{
                            signInLink: <span className='sign-in-link' onClick={handleToSignIn} />
                        }}
                        /> }
            case SignUpError.UNKNOWN:
                return { caption: t('Modals.SignUpError.Unknown.Caption'), text: <Trans i18nKey={'Modals.SignUpError.Unknown.Text' } /> }
            default:
                return { caption: t('Modals.SignUpError.Unknown.Caption'), text: <Trans i18nKey={'Modals.SignUpError.Unknown.Text' } /> }
        }
    }

    return (
        <>
            <div className="signup-error-modal-border"></div>
            <div className="signup-error-modal-panel">
                <img className='logo' src={logoIcon} />
                <h1 className='caption'>{getErrorText(error).caption}</h1>
                <p className='error'>{getErrorText(error).text}</p>
            </div>
            <button className="signup-error-modal-button" onClick={handleBack}>
                <img src={arrowIcon} />
            </button>
        </>
    );
}

