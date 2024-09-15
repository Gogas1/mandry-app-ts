import { Link } from "react-router-dom";
import '../../../styles/payment/sections/header-section.scss'

import arrowIcon from '../../../assets/icons/meta/arrow.svg';
import { useTranslation } from "react-i18next";

interface HeaderSectionProps {
    id: string;
}

export default function HeaderSection({ id }: HeaderSectionProps) {
    const { t } = useTranslation();

    return (
        <>
            <section className="header-section">
                <Link to={`/housing/${id}`} className="back-link">
                    <img src={arrowIcon} />
                </Link>
                <h1 className="header-section__header">
                    {t('PaymentPage.Sections.Header.Header')}
                </h1>
            </section>
        </>
    );
}