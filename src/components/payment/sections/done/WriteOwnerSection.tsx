import { Housing, UserData } from "../../../housing/HousingPage";

import '../../../../styles/payment/done/write-owner-section.scss';
import avatarPlaceholder from '../../../../assets/icons/profile/user-circle-stroke-rounded 1.svg';
import { useTranslation } from "react-i18next";
import { ChangeEvent, useState } from "react";
import { ImageHelper } from "../../../../helpers/ImageHelper";

interface WriteOwnerSectionProps {
    ownerData: UserData;
    housingData: Housing;
    onTextChange?: (value: string) => void;
}

export default function WriteOwnerSection({ ownerData, housingData, onTextChange }: WriteOwnerSectionProps) {
    const { t } = useTranslation();
    const [text, setText] = useState('');

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value;
        setText(inputText)
        if(onTextChange) {
            onTextChange(inputText);
        }
    }

    return (
        <>
            <section className="write-owner-section">
                <h2 className="write-owner-section__header">
                    {t('PaymentPage.Done.WriteOwner.Header')}
                </h2>
                <p className="write-owner-section__subheader">
                    {t('PaymentPage.Done.WriteOwner.Subheader', { name: `${ownerData.name} ${ownerData.surname}` })}
                </p>
                <div className="write-owner-section__textarea-container">
                    <div className="image-container">
                        <img src={ownerData.avatar ? ImageHelper.getAvatarImage(ownerData.avatar.src) : avatarPlaceholder} />
                    </div>
                    
                    <textarea 
                        className='textarea' 
                        placeholder={
                            t('PaymentPage.Done.WriteOwner.Placeholder', 
                                { 
                                    ownerName: `${ownerData.name} ${ownerData.surname}`, 
                                    locationName: housingData.locationPlace
                                })} 
                        onChange={handleChange}/>
                </div>

                <button className={`write-owner-section__button ${!text && 'disabled'}`}>
                    {t('PaymentPage.Done.WriteOwner.Write')}
                </button>        
            </section>
        </>
    );
}