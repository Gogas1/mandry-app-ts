import { Trans, useTranslation } from "react-i18next";
// import { useNavigate } from 'react-router-dom';
import FooterHeader from "./FooterHeader";

import '../../styles/footer/footer-community-chat.scss';

import arrowThin from '../../assets/icons/meta/arrow-thin.svg';
import investmentNews1Image from '../../assets/images/footer/investments/news1.png';
import investmentNews2Image from '../../assets/images/footer/investments/news2.png';
import investmentNews3Image from '../../assets/images/footer/investments/news3.png';
import listImage1 from '../../assets/images/footer/community-chat/list1.png';
import listImage2 from '../../assets/images/footer/community-chat/list2.png';
import listImage3 from '../../assets/images/footer/community-chat/list3.png';
import listImage4 from '../../assets/images/footer/community-chat/list4.png';
import listImage5 from '../../assets/images/footer/community-chat/list5.png';
import listImage6 from '../../assets/images/footer/community-chat/list6.png';
import NewsComponent from "./components/NewsComponent";
import FooterSection from '../home/FooterSection';

export default function FooterCommunityChat() {
    const { t } = useTranslation();
    // const navigate = useNavigate();

    document.title = t('Titles.FooterCommunityChat');

    return (
        <>
            <div className="footer-community-chat">
                <div className="footer-community-chat-content">
                    <FooterHeader
                        title={t('CommunityChat.Title')}
                        breadcrumbs={[
                            t('CommunityChat.BreadCrumbs.Crumb1'),
                            t('CommunityChat.BreadCrumbs.Crumb2')
                        ]}
                    />
                    <h1 className="footer-community-chat__header">
                        {t('CommunityChat.Header')}
                    </h1>
                    <section className="footer-community-chat__intro">
                        <div className="grid-item item1">
                            <p className="tb-1">{t('CommunityChat.Intro.Text1')}</p>
                            <p className="tb-2">{t('CommunityChat.Intro.Text2')}</p>
                            <p className="tb-3">{t('CommunityChat.Intro.Text3')}</p>
                        </div>
                        <div className="grid-item item2">
                            <h2 className="image-label">{t('CommunityChat.Intro.Labels.Label1')}</h2>
                            <img src={listImage1} />
                        </div>
                        <div className="grid-item item3">
                            <h2 className="image-label">{t('CommunityChat.Intro.Labels.Label2')}</h2>
                            <img src={listImage2} />
                        </div>
                        <div className="grid-item item4">
                            <h2 className="image-label">{t('CommunityChat.Intro.Labels.Label3')}</h2>
                            <img src={listImage3} />
                        </div>
                        <div className="grid-item item5">
                            <h2 className="image-label">{t('CommunityChat.Intro.Labels.Label4')}</h2>
                            <img src={listImage4} />
                        </div>
                        <div className="grid-item item6">
                            <h2 className="image-label">{t('CommunityChat.Intro.Labels.Label5')}</h2>
                            <img src={listImage5} />
                        </div>
                        <div className="grid-item item7">
                            <h2 className="image-label">{t('CommunityChat.Intro.Labels.Label6')}</h2>
                            <img src={listImage6} />
                        </div>
                    </section>
                    <section className="footer-community-chat__about">
                        <h2 className="header">
                            {t('CommunityChat.About.Header')}
                        </h2>
                        <p className="tb">
                            <Trans i18nKey={'CommunityChat.About.Text1'} components={{ textDec: <span className="text-decorated" /> }} />
                        </p>
                        <p className="tb">
                            <Trans i18nKey={'CommunityChat.About.Text2'} components={{ textDec: <span className="text-decorated" /> }} />
                        </p>
                        <p className="tb">
                            <Trans i18nKey={'CommunityChat.About.Text3'} components={{ textDec: <span className="text-decorated" /> }} />
                        </p>
                        <p className="tb">
                            <Trans i18nKey={'CommunityChat.About.Text4'} components={{ textDec: <span className="text-decorated" /> }} />
                        </p>
                        <p className="tb">
                            {t('CommunityChat.About.Text5')}
                        </p>
                        <p className="tb">
                            {t('CommunityChat.About.Text6')}
                        </p>
                    </section>
                    <hr className="footer-community-chat__divider" />
                    <section className="footer-community-chat__news">
                        <h2 className="header">
                            {t('CommunityChat.News.Header')}
                        </h2>
                        <div className="news-row">
                            <NewsComponent 
                                header={t('CommunityChat.News.Items.Item1.Header')}
                                text={t('CommunityChat.News.Items.Item1.Text')}
                                image={investmentNews1Image}
                                className="news-item" />
                            <NewsComponent
                                header={t('CommunityChat.News.Items.Item2.Header')}
                                text={t('CommunityChat.News.Items.Item2.Text')}
                                image={investmentNews2Image}
                                className="news-item" />
                            <NewsComponent
                                header={t('CommunityChat.News.Items.Item3.Header')}
                                text={t('CommunityChat.News.Items.Item3.Text')}
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