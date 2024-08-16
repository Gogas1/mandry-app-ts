import { useTranslation } from "react-i18next";
import crossIcon from "../../../assets/icons/meta/close-cross.svg";

import '../../../styles/account/modals/text-prompt-modal.scss';
import { ChangeEvent, MouseEvent, useState } from "react";

interface TextPromptModalProps {
    header: string;
    bodyText: string;

    closeModal: () => void;
    valueHandler?: (value: string) => void;
}

export default function TextPromptModal({ header, bodyText, closeModal, valueHandler }: TextPromptModalProps) {
    const { t } = useTranslation();
    const [value, setValue] = useState('');

    const handleCommit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(valueHandler) {
            valueHandler(value);
        }

        closeModal();
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newValue = e.target.value;

        setValue(newValue);
    }

    return (
        <>
            <div className="text-prompt-modal">
                <div className="text-prompt-panel">
                    <div className="header">
                        {header}
                    </div>
                    <div className="body">
                        {bodyText}
                    </div>
                    <div className="input">
                        <textarea
                            onChange={handleChange}
                            value={value}></textarea>
                    </div>
                    <div className="button-panel">
                        <button className="continue-button" onClick={handleCommit}>
                            {t('Modals.TextPrompt.ContinueButtonLabel')}
                        </button>
                    </div>
                </div>
                <button className="text-prompt-close" onClick={closeModal}>
                    <img src={crossIcon} />
                </button>
            </div>
        </>
    );
}