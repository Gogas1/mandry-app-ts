import { useTranslation } from "react-i18next";

import '../../styles/pages/home/footer-section.scss';

import instaIcon from '../../assets/icons/home/insta.svg';
import ttIcon from '../../assets/icons/home/tt.svg';
import fbIcon from '../../assets/icons/home/fb.svg';
import { Link } from "react-router-dom";

interface FooterSectionProps {
    
}

export default function FooterSection() {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="upper-section">
                <section aria-label="About Mandry link" className="section section--mandry">
                    <h4>
                        {t('MainPage.Sections.Footer.Sections.About.Caption')}
                    </h4>
                    <ul className="links-list">
                        <li className="links-list__link">
                            <Link to={'./news'}>
                                {t('MainPage.Sections.Footer.Sections.About.News')}
                            </Link>
                            
                        </li>
                        <li className="links-list__link">
                            <Link to={''}>
                                {t('MainPage.Sections.Footer.Sections.About.Work')}
                            </Link>
                        </li>
                        <li className="links-list__link">
                            <Link to={''}>
                                {t('MainPage.Sections.Footer.Sections.About.Chat')}
                            </Link>
                        </li>
                        <li className="links-list__link">
                            <Link to={'/investments'}>
                                {t('MainPage.Sections.Footer.Sections.About.Investments')}
                            </Link>
                        </li>
                        <li className="links-list__link">
                            <Link to={''}>
                                {t('MainPage.Sections.Footer.Sections.About.Contact')}
                            </Link>
                        </li>
                    </ul>
                </section>
                <section aria-label="Help links" className="section section--help">
                    <h4>
                        {t('MainPage.Sections.Footer.Sections.Help.Caption')}
                    </h4>
                    <ul className="links-list">
                        <li className="links-list__link">
                            <Link to={''}>
                                {t('MainPage.Sections.Footer.Sections.Help.MSafe')}
                            </Link>
                        </li>
                        <li className="links-list__link">
                            <Link to={''}>
                                {t('MainPage.Sections.Footer.Sections.Help.TempHousing')}
                            </Link>
                        </li>
                        <li className="links-list__link">
                            <Link to={'/feedback'}>
                                {t('MainPage.Sections.Footer.Sections.Help.Complainment')}
                            </Link>
                        </li>
                        <li className="links-list__link">
                            <Link to={''}>
                                {t('MainPage.Sections.Footer.Sections.Help.Disabled')}
                            </Link>
                        </li>
                        <li className="links-list__link">
                            <Link to={''}>
                                {t('MainPage.Sections.Footer.Sections.Help.Revokation')} 
                            </Link>
                        </li>
                    </ul>
                </section>
                <section aria-label="Information links" className="section section--info">
                    <h4>
                        {t('MainPage.Sections.Footer.Sections.Info.Caption')}
                    </h4>
                    <ul className="links-list">
                        <li className="links-list__link">
                            <Link to={''}>
                                {t('MainPage.Sections.Footer.Sections.Info.HelpCenter')}
                            </Link>
                        </li>
                        <li className="links-list__link">
                            <Link to={''}>
                                {t('MainPage.Sections.Footer.Sections.Info.ForTravelers')}
                            </Link>
                        </li>
                        <li className="links-list__link">
                            <Link to={''}>
                                {t('MainPage.Sections.Footer.Sections.Info.ForOwners')}
                            </Link>
                        </li>
                        <li className="links-list__link">
                            <Link to={''}>
                                {t('MainPage.Sections.Footer.Sections.Info.StartOwner')}
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>
            <hr aria-hidden="true" />
            <section className="rights">
                <ul className="links-list links-list--left">
                    <li className="links-list__link">
                        <Link to={''}>
                            {t('MainPage.Sections.Footer.Sections.Rights.Copy')}
                        </Link>
                    </li>
                    <li className="links-list__link">
                        <Link to={''}>
                            {t('MainPage.Sections.Footer.Sections.Rights.Privacy')}
                        </Link>
                    </li>
                    <li className="links-list__link">
                        <Link to={''}>
                            {t('MainPage.Sections.Footer.Sections.Rights.Terms')}
                        </Link>
                    </li>
                    <li className="links-list__link">
                        <Link to={''}>
                            {t('MainPage.Sections.Footer.Sections.Rights.Map')}
                        </Link>
                    </li>
                </ul>
                <ul className="links-list links-list--left">
                    <li className="links-list__link">
                        <Link to={''} target="_blank">
                            <img src={instaIcon} />
                        </Link>
                    </li>
                    <li className="links-list__link">
                        <Link to={''} target="_blank">
                            <img src={ttIcon} />
                        </Link>
                    </li>
                    <li className="links-list__link">
                        <Link to={''} target="_blank">
                            <img src={fbIcon} />
                        </Link>
                    </li>
                </ul>
            </section>
        </footer>
    );
}