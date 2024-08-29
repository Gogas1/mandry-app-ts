import '../../styles/auth/create-profile-modal.scss';

import crossIcon from '../../assets/icons/meta/close-cross.svg';
import logoIcon from '../../assets/icons/meta/small-logo.svg';
import { Trans, useTranslation } from 'react-i18next';

interface CreateProfileModalProps {
    hideModal: () => void;
}

export default function CreateProfileModal({ hideModal }: CreateProfileModalProps){
    const { t } = useTranslation();
    
    return (
        <>
            <div className="create-profile-modal-border"></div>
            <div className="create-profile-modal-panel">
                <h1 className='caption'>{t('Modals.CreateProfile.Caption')}</h1>
                <hr className='divider' />
                <div className='main-content'>
                    <img className='logo' src={logoIcon} />
                    <p className='greetings'>
                        <Trans 
                            i18nKey={'Modals.CreateProfile.Greet'} 
                            components={{
                                decoratedName: <span className='decoratedName' />
                            }}/>
                    </p>
                    <p className='text'>{t('Modals.CreateProfile.Text')}</p>
                    <button className='continue-button'>{t('Modals.CreateProfile.ButtonLabel')}</button>
                </div>
                
            </div>
            <button className="create-profile-modal-button" onClick={hideModal}>
                <img src={crossIcon} />
            </button>
        </>
    );
}