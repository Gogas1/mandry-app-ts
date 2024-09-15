import { useTranslation } from 'react-i18next';
import '../../../styles/payment/sections/phone-section.scss'

export default function PhoneSection() {
    const { t } = useTranslation();
    
    return (
        <>
            <section className="phone-section">
                <h2 className="phone-section__header">{t('PaymentPage.Sections.Phone.Header')}</h2>
                <div className="phone-section__body">
                    <div className="body__text">
                        <p className="body__header">{t('PaymentPage.Sections.Phone.BodyHeader')}</p>
                        <p className="body__info">{t('PaymentPage.Sections.Phone.BodyText')}</p>
                    </div>
                    <div className="body__button">
                        <button>{t('PaymentPage.Sections.Phone.ButtonText')}</button>
                    </div>
                </div>
            </section>
        </>
    );
}