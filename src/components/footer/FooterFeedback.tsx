import { useTranslation } from "react-i18next";
import FooterSection from "../home/FooterSection";
import FooterHeader from "./FooterHeader";

import arrowThin from '../../assets/icons/meta/arrow-thin.svg';
import feedbackMainImage from '../../assets/images/footer/feedback/main.png';
import feedbackNews1Image from '../../assets/images/footer/feedback/news1.png';
import feedbackNews2Image from '../../assets/images/footer/feedback/news2.png';
import feedbackNews3Image from '../../assets/images/footer/feedback/news3.png';

import '../../styles/footer/footer-feedback.scss';
import NewsComponent from "./components/NewsComponent";

export default function FooterFeedback() {
    const { t } = useTranslation();

    document.title = t('Titles.FooterFeedback');

    return (
        <>
            <div className="footer-feedback">
                <div className="footer-feedback-content">
                    <FooterHeader 
                        title={t('FeedbackPage.Title')}
                        breadcrumbs={[
                            t('FeedbackPage.BreadCrumbs.Crumb1'),
                            t('FeedbackPage.BreadCrumbs.Crumb2')
                        ]}
                    />
                    <h1 className="footer-feedback__header">
                        {t('FeedbackPage.Header')}
                    </h1>
                    <section className="footer-feedback__intro">
                        <div className="intro-top">
                            <div className="image-wrapper">
                                <img src={feedbackMainImage} />
                            </div>
                            <div className="text-block">
                                <h2 className="header">
                                    {t('FeedbackPage.Intro.Header')}
                                </h2>
                                <p className="tb-1">
                                    {t('FeedbackPage.Intro.Text1')}
                                </p>
                                <p className="tb-2">
                                    {t('FeedbackPage.Intro.Text2')}
                                </p>
                                <p className="tb-3">
                                    {t('FeedbackPage.Intro.Text3')}
                                </p>
                            </div>
                        </div>
                        <p className="intro-bottom">
                            {t('FeedbackPage.Intro.Text4')}
                        </p>
                    </section>
                    <section className="footer-feedback__feedback">
                        <h2 className="header">
                            {t('FeedbackPage.Feedback.Header')}
                        </h2>
                        <p className="tb-1">
                            {t('FeedbackPage.Feedback.Text1')}
                        </p>
                        <p className="tb-2">
                            {t('FeedbackPage.Feedback.Text2')}
                        </p>
                        <div className="grid-container">
                            <div className="grid-item">
                                <h3 className="grid-item__header">
                                    {t('FeedbackPage.Feedback.Items.Item1.Header')}
                                </h3>
                                <p className="grid-item__text">
                                    {t('FeedbackPage.Feedback.Items.Item1.Text')}
                                </p>
                            </div>
                            <div className="grid-item">
                                <h3 className="grid-item__header">
                                    {t('FeedbackPage.Feedback.Items.Item2.Header')}
                                </h3>
                                <p className="grid-item__text">
                                    {t('FeedbackPage.Feedback.Items.Item2.Text')}
                                </p>
                            </div>
                            <div className="grid-item">
                                <h3 className="grid-item__header">
                                    {t('FeedbackPage.Feedback.Items.Item3.Header')}
                                </h3>
                                <p className="grid-item__text">
                                    {t('FeedbackPage.Feedback.Items.Item3.Text')}
                                </p>
                            </div>
                            <div className="grid-item">
                                <h3 className="grid-item__header">
                                    {t('FeedbackPage.Feedback.Items.Item4.Header')}
                                </h3>
                                <p className="grid-item__text">
                                    {t('FeedbackPage.Feedback.Items.Item4.Text')}
                                </p>
                            </div>
                            <div className="grid-item">
                                <h3 className="grid-item__header">
                                    {t('FeedbackPage.Feedback.Items.Item5.Header')}
                                </h3>
                                <p className="grid-item__text">
                                    {t('FeedbackPage.Feedback.Items.Item5.Text')}
                                </p>
                            </div>
                            <div className="grid-item">
                                <h3 className="grid-item__header">
                                    {t('FeedbackPage.Feedback.Items.Item6.Header')}
                                </h3>
                                <button className="grid-item__button">
                                    {t('FeedbackPage.Feedback.Items.Item6.ButtonText')}
                                </button>
                            </div>
                        </div>
                    </section>
                    <hr className="footer-feedback__divider" />
                    <section className="footer-feedback__complaints">
                        <h2 className="header">
                            {t('FeedbackPage.Complaints.Header')}
                        </h2>
                        <p className="tb-1">
                            {t('FeedbackPage.Complaints.Text1')}
                        </p>
                        <p className="tb-2">
                            {t('FeedbackPage.Complaints.Text2')}
                        </p>
                        <div className="grid-container">
                            <div className="grid-item">
                                <h3 className="grid-item__header">
                                    {t('FeedbackPage.Complaints.Items.Item1.Header')}
                                </h3>
                                <p className="grid-item__text">
                                    {t('FeedbackPage.Complaints.Items.Item1.Text')}
                                </p>
                            </div>
                            <div className="grid-item">
                                <h3 className="grid-item__header">
                                    {t('FeedbackPage.Complaints.Items.Item2.Header')}
                                </h3>
                                <p className="grid-item__text">
                                    {t('FeedbackPage.Complaints.Items.Item2.Text')}
                                </p>
                            </div>
                            <div className="grid-item">
                                <h3 className="grid-item__header">
                                    {t('FeedbackPage.Complaints.Items.Item3.Header')}
                                </h3>
                                <p className="grid-item__text">
                                    {t('FeedbackPage.Complaints.Items.Item3.Text')}
                                </p>
                            </div>
                            <div className="grid-item">
                                <h3 className="grid-item__header">
                                    {t('FeedbackPage.Complaints.Items.Item4.Header')}
                                </h3>
                                <p className="grid-item__text">
                                    {t('FeedbackPage.Complaints.Items.Item4.Text')}
                                </p>
                            </div>
                            <div className="grid-item">
                                <h3 className="grid-item__header">
                                    {t('FeedbackPage.Complaints.Items.Item5.Header')}
                                </h3>
                                <p className="grid-item__text">
                                    {t('FeedbackPage.Complaints.Items.Item5.Text')}
                                </p>
                            </div>
                            <div className="grid-item">
                                <h3 className="grid-item__header">
                                    {t('FeedbackPage.Complaints.Items.Item6.Header')}
                                </h3>
                                <button className="grid-item__button">
                                    {t('FeedbackPage.Complaints.Items.Item6.ButtonText')}
                                </button>
                            </div>
                        </div>
                    </section>
                    <section className="footer-feedback__call">
                        <h2 className="header">
                            {t('FeedbackPage.Call.Header')}
                        </h2>
                        <div className="text-row">
                            <p className="text-row__col text-row__tb-1">
                                {t('FeedbackPage.Call.Text1')}
                            </p>
                            <p className="text-row__col text-row__tb-2">
                                {t('FeedbackPage.Call.Text2')}
                            </p>
                        </div>
                        <div className="text-row">
                            <p className="text-row__col text-row__tb-3">
                                {t('FeedbackPage.Call.Text3')}
                            </p>
                            <button className="text-row__col text-row__button-1">
                                {t('FeedbackPage.Call.ButtonText1')}
                            </button>
                        </div>
                        <div className="text-row">
                            <div className="text-row__col"></div>
                            <p className="text-row__col text-row__tb-4">
                                {t('FeedbackPage.Call.Text4')}
                            </p>
                        </div>
                        <div className="text-row">
                            <div className="text-row__col"></div>
                            <button className="text-row__col text-row__button-2">
                                {t('FeedbackPage.Call.ButtonText2')}
                            </button>
                        </div>
                    </section>
                    <section className="footer-feedback__news">
                        <h2 className="header">
                            {t('FeedbackPage.News.Header')}
                        </h2>
                        <div className="news-row">
                            <NewsComponent 
                                header={t('FeedbackPage.News.Item1.Header')}
                                text={t('FeedbackPage.News.Item1.Text')}
                                image={feedbackNews1Image}
                                className="news-item" />
                            <NewsComponent
                                header={t('FeedbackPage.News.Item2.Header')}
                                text={t('FeedbackPage.News.Item2.Text')}
                                image={feedbackNews2Image}
                                className="news-item" />
                            <NewsComponent
                                header={t('FeedbackPage.News.Item3.Header')}
                                text={t('FeedbackPage.News.Item3.Text')}
                                image={feedbackNews3Image}
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