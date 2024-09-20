import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/pages/footer/footer-help-center.scss';

import FooterSection from '../home/FooterSection';
import FooterHeader from './FooterHeader';
import NewsComponent from './components/NewsComponent';

import magazineImage from '../../assets/images/footer/help_center/help_magazine.png';
import imacImage from '../../assets/images/footer/help_center/imac.png';
import directionImage from '../../assets/images/footer/help_center/direction.png';
import peopleImage from '../../assets/images/footer/help_center/4_people.png';
import nurseImage from '../../assets/images/footer/help_center/nurse.png';
import imacFImage from '../../assets/images/footer/help_center/imac_further.png';
import phoneImage from '../../assets/images/footer/help_center/phone.png';

import arrowThin from '../../assets/icons/meta/arrow-thin.svg';
import angryIcon from '../../assets/icons/footer/help-center/angry-smile.svg';
import chartIcon from '../../assets/icons/footer/help-center/chart.svg';
import coinIcon from '../../assets/icons/footer/help-center/coin.svg';
import housePlusIcon from '../../assets/icons/footer/help-center/house-plus.svg';
import infoIcon from '../../assets/icons/footer/help-center/info.svg';
import keyIcon from '../../assets/icons/footer/help-center/key.svg';
import mandryIcon from '../../assets/icons/footer/help-center/mandry-logo.svg';
import messagesIcon from '../../assets/icons/footer/help-center/messages.svg';
import shieldIcon from '../../assets/icons/footer/help-center/shield-alert.svg';
import suitcaseIcon from '../../assets/icons/footer/help-center/suitcase.svg';
import ticketsIcon from '../../assets/icons/footer/help-center/tickets.svg';
import tpeopleIcon from '../../assets/icons/footer/help-center/two-people.svg';
import waypointsIcon from '../../assets/icons/footer/help-center/waypoints.svg';
import wheelchairIcon from '../../assets/icons/footer/help-center/wheelchair.svg';


export default function HelpCenter() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    document.title = t('Titles.HelpCenter');

    return (
        <div className='help-center-page'>
            <div className='content-container'>
                <FooterHeader title='MainPage.Sections.Footer.Pages.HelpCenter.Header' />
                <div className='help-title'>{t('MainPage.Sections.Footer.Pages.HelpCenter.Title')}</div>
                <div className='image-text-block'>
                    <div className='image-block'><img src={magazineImage}></img></div>
                    <div className='text-block'>
                        <div className='text-desc-bold'>
                            {t('MainPage.Sections.Footer.Pages.HelpCenter.Desc_1')}
                        </div>
                        <div className='text-desc'>
                            {t('MainPage.Sections.Footer.Pages.HelpCenter.Desc_2')}
                        </div>
                    </div>
                </div>
                <div className='horizontal-divider' />
                <div className='help-center-desc'>
                    <div className='image-text-block'>
                        <div className='text-block'>
                            <div className='text-title'>
                                {t('MainPage.Sections.Footer.Pages.HelpCenter.DescTitle_1')}
                            </div>
                            <div className='text-desc'>
                                {t('MainPage.Sections.Footer.Pages.HelpCenter.Desc_3')}
                            </div>
                        </div>
                        <div className='image-block'><img src={imacImage}></img></div>
                    </div>
                    <div className='image-text-block'>
                        <div className='image-block'><img src={directionImage}></img></div>
                        <div className='text-block'>
                            <div className='text-title'>
                                {t('MainPage.Sections.Footer.Pages.HelpCenter.DescTitle_2')}
                            </div>
                            <div className='text-desc'>
                                {t('MainPage.Sections.Footer.Pages.HelpCenter.Desc_4')}
                            </div>
                        </div>
                    </div>
                    <div className='image-text-block'>
                        <div className='text-block'>
                            <div className='text-title'>
                                {t('MainPage.Sections.Footer.Pages.HelpCenter.DescTitle_3')}
                            </div>
                            <div className='text-desc'>
                                {t('MainPage.Sections.Footer.Pages.HelpCenter.Desc_5')}
                            </div>
                        </div>
                        <div className='image-block'><img src={peopleImage} /></div>
                    </div>
                </div>
                <div className='mid-container'>
                    {t('MainPage.Sections.Footer.Pages.HelpCenter.Desc_6')}
                </div>
                <div className='text-title'>{t('MainPage.Sections.Footer.Pages.HelpCenter.TitleThemes')}</div>
                <div className='panel-links'>
                    <div className='panel-link'
                        onClick={() => navigate('/')}
                    >
                        <img src={waypointsIcon} />
                        {t('MainPage.Sections.Footer.Pages.HelpCenter.Panels.Start')}
                    </div>

                    <div className='panel-link'
                        onClick={() => navigate('/')}
                    >
                        <img src={messagesIcon} />
                        {t('MainPage.Sections.Footer.Pages.HelpCenter.Panels.Chat')}
                    </div>

                    <div className='panel-link'
                        onClick={() => navigate('/')}
                    >
                        <img src={wheelchairIcon} />
                        {t('MainPage.Sections.Footer.Pages.HelpCenter.Panels.Accessibility')}
                    </div>

                    <div className='panel-link'
                        onClick={() => navigate('/')}
                    >
                        <img src={infoIcon} />
                        {t('MainPage.Sections.Footer.Pages.HelpCenter.Panels.Rules')}
                    </div>

                    <div className='panel-link'
                        onClick={() => navigate('/')}
                    >
                        <img src={coinIcon} />
                        {t('MainPage.Sections.Footer.Pages.HelpCenter.Panels.ForInvestors')}
                    </div>

                    <div className='panel-link'
                        onClick={() => navigate('/')}
                    >
                        <img src={housePlusIcon} />
                        {t('MainPage.Sections.Footer.Pages.HelpCenter.Panels.Temporary')}
                    </div>

                    <div className='panel-link'
                        onClick={() => navigate('/')}
                    >
                        <img src={tpeopleIcon} />
                        {t('MainPage.Sections.Footer.Pages.HelpCenter.Panels.ForTravelers')}
                    </div>

                    <div className='panel-link'
                        onClick={() => navigate('/')}
                    >
                        <img src={chartIcon} />
                        {t('MainPage.Sections.Footer.Pages.HelpCenter.Panels.QoC')}
                    </div>

                    <div className='panel-link'
                        onClick={() => navigate('/')}
                    >
                        <img src={mandryIcon} />
                        {t('MainPage.Sections.Footer.Pages.HelpCenter.Panels.Mandry')}
                    </div>

                    <div className='panel-link'
                        onClick={() => navigate('/')}
                    >
                        <img src={keyIcon} />
                        {t('MainPage.Sections.Footer.Pages.HelpCenter.Panels.ForOwners')}
                    </div>

                    <div className='panel-link'
                        onClick={() => navigate('/')}
                    >
                        <img src={angryIcon} />
                        {t('MainPage.Sections.Footer.Pages.HelpCenter.Panels.Emergency')}
                    </div>

                    <div className='panel-link'
                        onClick={() => navigate('/')}
                    >
                        <img src={suitcaseIcon} />
                        {t('MainPage.Sections.Footer.Pages.HelpCenter.Panels.Partnership')}
                    </div>

                    <div className='panel-link'
                        onClick={() => navigate('/')}
                    >
                        <img src={shieldIcon} />
                        {t('MainPage.Sections.Footer.Pages.HelpCenter.Panels.Safety')}
                    </div>


                    <div className='panel-link'
                        onClick={() => navigate('/')}
                    >
                        <img src={ticketsIcon} />
                        {t('MainPage.Sections.Footer.Pages.HelpCenter.Panels.Reservation')}
                    </div>

                </div>
                <div className='horizontal-divider' />
                <section className="news-block">
                    <div className='text-title'>{t('MainPage.Sections.Footer.Pages.HelpCenter.ActualNews')}</div>
                    <div className="news-row">
                        <NewsComponent
                            header={t('InvestmentsPage.News.Item1.Header')}
                            text={t('InvestmentsPage.News.Item1.Text')}
                            image={imacFImage}
                            className="news-item" />
                        <NewsComponent
                            header={t('InvestmentsPage.News.Item2.Header')}
                            text={t('InvestmentsPage.News.Item2.Text')}
                            image={nurseImage}
                            className="news-item" />
                        <NewsComponent
                            header={t('InvestmentsPage.News.Item3.Header')}
                            text={t('InvestmentsPage.News.Item3.Text')}
                            image={phoneImage}
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
    )
}
