import { Trans } from "react-i18next";

import fiturLogo from '../../assets/images/partners/fitur.svg';
import canadaLogo from '../../assets/images/partners/acv-logo.svg';
import hiltonLogo from '../../assets/images/partners/Union.svg';
import holidayLogo from '../../assets/images/partners/hi_logo.svg';

import itbLogo from '../../assets/images/partners/itb_berlin_cmyk_m_claim.svg';
import breakLogo from '../../assets/images/partners/ef_ultimate_break_logo 1.svg';
import luftLogo from '../../assets/images/partners/LHG_Wordmark_blue.svg';
import royalLogo from '../../assets/images/partners/royal-caribbean-logo-no-border.svg';

import '../../styles/pages/home/partners-section.scss';

interface PartnersSectionProps {
    className?: string;
}

export default function PartnersSection({ className }: PartnersSectionProps) {


    return (
        <>
            <section className={`partners-section ${className}`}>
                <h3 className="partners-caption">
                    <Trans i18nKey={"MainPage.Sections.Partners.Caption"}
                    components={{
                        decoratedA: <span className="decorated-A" />,
                        decoratedP: <span className="decorated-P" />
                    }} />
                </h3>
                <div className="partners-line">
                    <ul className="partners partners--top">
                        <li className="partner">
                            <img src={fiturLogo} alt="fitur" />
                        </li>
                        <li className="partner">
                            <img src={canadaLogo} alt="air canada" />
                        </li>
                        <li className="partner">
                            <img src={hiltonLogo} alt="hilton" />
                        </li>
                        <li className="partner">
                            <img src={holidayLogo} alt="holiday inn" />
                        </li>
                    </ul>
                    <ul className="partners partners--top">
                        <li className="partner">
                            <img src={fiturLogo} alt="fitur" />
                        </li>
                        <li className="partner">
                            <img src={canadaLogo} alt="air canada" />
                        </li>
                        <li className="partner">
                            <img src={hiltonLogo} alt="hilton" />
                        </li>
                        <li className="partner">
                            <img src={holidayLogo} alt="holiday inn" />
                        </li>
                    </ul>
                </div>

                <div className="partners-line">
                    <ul className="partners partners--bottom">
                        <li className="partner">
                            <img src={itbLogo} alt="itb berlin" />
                        </li>
                        <li className="partner">
                            <img src={breakLogo} alt="ultimate break" />
                        </li>
                        <li className="partner">
                            <img src={luftLogo} alt="luft group" />
                        </li>
                        <li className="partner">
                            <img src={royalLogo} alt="royal caribb" />
                        </li>
                    </ul>
                    <ul className="partners partners--bottom">
                        <li className="partner">
                            <img src={itbLogo} alt="itb berlin" />
                        </li>
                        <li className="partner">
                            <img src={breakLogo} alt="ultimate break" />
                        </li>
                        <li className="partner">
                            <img src={luftLogo} alt="luft group" />
                        </li>
                        <li className="partner">
                            <img src={royalLogo} alt="royal caribb" />
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}