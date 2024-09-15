import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import '../../../styles/payment/sections/agreement-section.scss';

interface AgreementSection {
    callModal: () => void; 
}

export default function AgreementSection({ callModal }: AgreementSection) {
    const { t } = useTranslation();

    return (
        <>
            <section className="agreement-payment-section">
                <p>
                    <Trans 
                        i18nKey={'PaymentPage.Sections.Agreement.Main'} 
                        components={{
                            linkR1: <Link to={'/'} className="link" />,
                            linkR2: <Link to={'/'} className="link" />,
                            linkR3: <Link to={'/'} className="link" />,
                            linkR4: <Link to={'/'} className="link" />
                        }}>

                    </Trans>
                </p>
                <p>
                    <Trans 
                        i18nKey={'PaymentPage.Sections.Agreement.Secondary'} 
                        components={{
                            linkR1: <Link to={'/'} className="link" />,
                            linkR2: <Link to={'/'} className="link" />,
                            linkR3: <Link to={'/'} className="link" />
                        }}>

                    </Trans>
                </p>
                <button onClick={callModal}>
                    {t('PaymentPage.Sections.Agreement.ConfirmLabel')} 
                </button>
            </section>
        </>
    );
}