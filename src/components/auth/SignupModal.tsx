import { useTranslation } from "react-i18next";

import "../../styles/auth/signup-modal.scss";
import "../../styles/app/checkbox.scss";

import TextInputMaterial from "../app/TextInputMaterial";
import React, { useState } from "react";
import DatePicker from "../app/DatePicker/DatePicker";

import crossIcon from "../../assets/icons/meta/close-cross.svg";
import arrowIcon from "../../assets/icons/meta/arrow.svg";

import { useModal } from "../app/ModalContext";
import AuthModal from "./AuthModal";

import PasswordField from "../app/Fields/PasswordFileld";
import PhonePickerBlock from "../app/Fields/PhonePickerBlock";

interface SignupModalProps {
    hideModal: () => void;
}

export default function SignupModal({ hideModal }: SignupModalProps) {
    const { t } = useTranslation();

    const { openModal, closeModal } = useModal();

    const [name, setName] = useState('');
    const [surnname, setSurname] = useState('');
    const [birthdate, setBirthdate] = useState<Date>(new Date());
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    

    const birthdateChangeHandle = (value: string) => {
        
    }

    const closeHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        hideModal();
        openModal('signin', <AuthModal hideModal={() => closeModal('signin')} />);
    }

    return (
        <>
            <div className="signup-modal-border"></div>
            <div className="signup-modal-panel">
                <div className="panel-header">{t('SignUpFinishHeader')}</div>
                <div className="divider"></div>
                <div className="scroll-block">
                    <div className="block names-block">
                        <div className="block-header">{t('SignUpNamesBlockHeader')}</div>
                        <div className="input-group name-input-group">
                            {/* <label>{t('SignUpNameInputLabel')}</label>
                            <input className="input"/> */}
                            <TextInputMaterial
                                label={t('SignUpNameInputLabel')}
                                onChange={setName}
                                />
                        </div>
                        <div className="input-group surname-input-group">
                            {/* <label>{t('SignUpSurnameInputLabel')}</label>
                            <input className="input"/> */}
                            <TextInputMaterial 
                                label={t('SignUpSurnameInputLabel')}
                                onChange={setSurname}/>
                        </div>
                        <div className="block-text-end">
                            {t('SignUpNamesTextEnd')}
                        </div>
                    </div>
                    <div className="block birthdate-block">
                        <div className="block-header">{t('SignUpBirthdateBlockHeader')}</div>
                        <DatePicker 
                            label={t('SignUpBirthDateInputLabel')}
                            onChange={birthdateChangeHandle}
                            />
                        <div className="block-text-end">
                            {t('SignUpBirthDateTextEnd')}
                        </div>
                    </div>
                    <div className="block email-block">
                        <div className="block-header">{t('SignUpEmailBlockHeader')}</div>
                        <div className="input-group email-input-group">
                            <TextInputMaterial 
                                label={t('SignUpEmailInputLabel')}
                                onChange={setEmail}/>
                        </div>
                        {/* <div className="input-group phone-input-group">
                            <TextInputMaterial 
                                label={t('SignUpPhoneLabel')}
                                onChange={setPhone}
                            />
                        </div> */}
                        <div className="block-text-end">
                            {t('SignUpEmailTextEnd')}
                        </div>
                    </div>
                    <div className="block password-block">
                        <div className="input-group">
                            <PasswordField 
                                onValueChange={setPassword}
                            />
                            <label>{t('SignUpPasswordReq')}</label>
                        </div>
                        <div className="input-group password-repeat">
                            <PasswordField 
                                label=""
                                onValueChange={setPasswordConfirmation}
                            />
                        </div>
                    </div>
                    <div className="block phone-block">
                        <PhonePickerBlock 
                            onPhoneChange={setPhone}
                        />
                    </div>
                    <div className="agreement-text">
                        {t('SignUpAgreement')}
                    </div>
                    <button className="continue-button">{t('SignUpContinueButtonLabel')}</button>
                    <div className="marketing-agreement">
                        {t('SignUpMarketingAgreement')}
                    </div>
                    <div className="marketing-waiver-block">
                        <label className="checkbox-container">{t('SignUpWaiverText')}
                            <input 
                                type="checkbox" 
                                />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                
            </div>
            <button className="signup-modal-close-button" onClick={closeHandle}>
                <img src={arrowIcon}  alt='close' />
            </button>  
        </>  
    );
}