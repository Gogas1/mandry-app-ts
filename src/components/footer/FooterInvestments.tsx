import FooterSection from "../home/FooterSection";
import '../../styles/footer/footer-investments.scss'

import arrowThin from '../../assets/icons/meta/arrow-thin.svg';
import { useTranslation } from "react-i18next";
import NewsComponent from "./components/NewsComponent";

import investmentMainImage from '../../assets/images/footer/investments/main.png';
import investmentNews1Image from '../../assets/images/footer/investments/news1.png';
import investmentNews2Image from '../../assets/images/footer/investments/news2.png';
import investmentNews3Image from '../../assets/images/footer/investments/news3.png';
import FooterHeader from "./FooterHeader";

export default function FooterInvestments() {
    const { t } = useTranslation();

    return (
        <>
            <div className="footer-investments">
                <div className="footer-investments-content">
                    <FooterHeader 
                        title={t('InvestmentsPage.HeaderPanel.Title')}
                        breadcrumbs={[
                            t('InvestmentsPage.HeaderPanel.BreadCrumbs.Crumb1'),
                            t('InvestmentsPage.HeaderPanel.BreadCrumbs.Crumb2'),
                            t('InvestmentsPage.HeaderPanel.BreadCrumbs.Crumb3')
                        ]} />
                    {/* <FooterHeader /> */}
                    <h1 className="footer-investments__header">
                        {t('InvestmentsPage.Header')}
                    </h1>
                    <section className="footer-investments__intro">
                        <div className="image-wrapper">
                            <img src={investmentMainImage} />
                        </div>
                        <div className="text-block">
                            <p className="tb-1">
                                {t('InvestmentsPage.Intro.Text1')}
                            </p>
                            <p className="tb-2">
                                {t('InvestmentsPage.Intro.Text2')}
                            </p>
                            <p className="tb-3">
                                {t('InvestmentsPage.Intro.Text3')}
                            </p>
                        </div>
                    </section>
                    <hr className="footer-investments__divider" />
                    <section className="footer-investments__advantages">
                        <h2 className="header">
                            {t('InvestmentsPage.Advantages.Header')}
                        </h2>
                        <p>
                            {t('InvestmentsPage.Advantages.Text1')}
                        </p>
                        <p>
                            {t('InvestmentsPage.Advantages.Text2')}
                        </p>
                        <p>
                            {t('InvestmentsPage.Advantages.Text3')}
                        </p>
                        <p>
                            {t('InvestmentsPage.Advantages.Text4')}
                        </p>
                        <p>
                            {t('InvestmentsPage.Advantages.Text5')}
                        </p>
                        <p>
                            {t('InvestmentsPage.Advantages.Text6')}
                        </p>
                    </section>
                    <hr className="footer-investments__divider" />
                    <section className="footer-investments__packages">
                        <h2 className="header">
                            {t('InvestmentsPage.Packages.Header')}
                        </h2>
                        <div className="grid-container">
                            <div className="grid-item">
                                <h3 className="grid-item__header">
                                    {t('InvestmentsPage.Packages.Package1.Header')}
                                </h3>
                                <hr className="grid-item__divider" />
                                <ul className="grid-item__list">
                                    <li>{t('InvestmentsPage.Packages.Package1.Item1')}</li>
                                    <li>{t('InvestmentsPage.Packages.Package1.Item2')}</li>
                                    <li>{t('InvestmentsPage.Packages.Package1.Item3')}</li>
                                </ul>
                            </div>

                            <div className="grid-item">
                                <h3 className="grid-item__header">
                                    {t('InvestmentsPage.Packages.Package2.Header')}
                                </h3>
                                <hr className="grid-item__divider" />
                                <ul className="grid-item__list">
                                    <li>{t('InvestmentsPage.Packages.Package2.Item1')}</li>
                                    <li>{t('InvestmentsPage.Packages.Package2.Item2')}</li>
                                    <li>{t('InvestmentsPage.Packages.Package2.Item3')}</li>
                                </ul>
                            </div>

                            <div className="grid-item">
                                <h3 className="grid-item__header">
                                    {t('InvestmentsPage.Packages.Package3.Header')}
                                </h3>
                                <hr className="grid-item__divider" />
                                <ul className="grid-item__list">
                                    <li>{t('InvestmentsPage.Packages.Package3.Item1')}</li>
                                    <li>{t('InvestmentsPage.Packages.Package3.Item2')}</li>
                                    <li>{t('InvestmentsPage.Packages.Package3.Item3')}</li>
                                </ul>
                            </div>

                            <div className="grid-item">
                                <h3 className="grid-item__header">
                                    {t('InvestmentsPage.Packages.Package4.Header')}
                                </h3>
                                <hr className="grid-item__divider" />
                                <ul className="grid-item__list">
                                    <li>{t('InvestmentsPage.Packages.Package4.Item1')}</li>
                                    <li>{t('InvestmentsPage.Packages.Package4.Item2')}</li>
                                    <li>{t('InvestmentsPage.Packages.Package4.Item3')}</li>
                                </ul>
                            </div>
                        </div>
                        <p className="tb-1">
                            {t('InvestmentsPage.Packages.Text')}
                        </p>
                        <div className="button-row">
                            <button>{t('InvestmentsPage.Packages.ButtonText')}</button>
                        </div>
                    </section>
                    <hr className="footer-investments__divider" />
                    <section className="footer-investments__news">
                        <h2 className="header">
                            {t('InvestmentsPage.News.Header')}
                        </h2>
                        <div className="news-row">
                            <NewsComponent 
                                header={t('InvestmentsPage.News.Item1.Header')}
                                text={t('InvestmentsPage.News.Item1.Text')}
                                image={investmentNews1Image}
                                className="news-item" />
                            <NewsComponent
                                header={t('InvestmentsPage.News.Item2.Header')}
                                text={t('InvestmentsPage.News.Item2.Text')}
                                image={investmentNews2Image}
                                className="news-item" />
                            <NewsComponent
                                header={t('InvestmentsPage.News.Item3.Header')}
                                text={t('InvestmentsPage.News.Item3.Text')}
                                image={investmentNews3Image}
                                className="news-item" />
                        </div>
                        <div className="button-row">
                            <button className="button-row__button button-row__button--back">
                                <img src={arrowThin} />
                            </button>
                            <button className="button-row__button button-row__button--forward">
                                <img src={arrowThin} />
                            </button>
                        </div>
                    </section>
                </div>
                <FooterSection />
            </div>
        </>
    );
}