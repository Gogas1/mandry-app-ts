import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
import '../../styles/pages/footer/footer-disabled.scss';

import FooterSection from '../home/FooterSection';
import FooterHeader from './FooterHeader';
import UnfoldComponent from './components/UnfoldComponent';
import NewsComponent from './components/NewsComponent';

import arrowBlueIcon from '../../assets/icons/footer/start-business/arrow-blue.svg';
import arrowThin from '../../assets/icons/meta/arrow-thin.svg';

import peopleOutdoorImage from '../../assets/images/footer/disabled/peoples_outdoor.png';
import houseImage from '../../assets/images/footer/disabled/house.png';
import disabledImage from '../../assets/images/footer/disabled/disabled.png';
import peopleImage from '../../assets/images/footer/disabled/peoples.png';
import nurseImage from '../../assets/images/footer/help_center/nurse.png';
import imacFImage from '../../assets/images/footer/help_center/imac_further.png';
import phoneImage from '../../assets/images/footer/help_center/phone.png';

export default function Disabled() {
    const { t } = useTranslation();
    // const navigate = useNavigate();

    document.title = t('MainPage.Sections.Footer.Pages.Disabled.PageTitle');

    return (
        <div className='disabled-page'>
            <div className='content-container'>
                <FooterHeader title='MainPage.Sections.Footer.Pages.Disabled.Title' />
                <div className='start-title'>{t('MainPage.Sections.Footer.Pages.Disabled.Header')}</div>
                <img className='start-image' src={peopleOutdoorImage}></img>

                <div className='mid-container'>
                    {t('MainPage.Sections.Footer.Pages.Disabled.Info_1')}
                </div>

                <div className='title-text'>{t('MainPage.Sections.Footer.Pages.Disabled.Title_1')}</div>

                <div className='disabled-desc'>
                    <div className='image-text-block'>
                        <div className='image-block'><img src={houseImage}></img></div>
                        <div className='text-block'>
                            <div className='text-regular-heavy-weight'>
                                {t('MainPage.Sections.Footer.Pages.Disabled.Desc_1')}
                            </div>
                            <div className='text-regular'>
                                {t('MainPage.Sections.Footer.Pages.Disabled.Desc_2')}
                            </div>
                        </div>
                    </div>
                    <div className='image-text-block'>
                        <div className='text-block'>
                            <div className='text-regular'>
                                {t('MainPage.Sections.Footer.Pages.Disabled.Desc_3')}
                            </div>
                            <div className='text-regular'>
                                {t('MainPage.Sections.Footer.Pages.Disabled.Desc_4')}
                            </div>
                        </div>
                        <div className='image-block'><img src={disabledImage}></img></div>
                    </div>
                    <div className='image-text-block'>
                        <div className='image-block'><img src={peopleImage} /></div>
                        <div className='text-block'>
                            <div className='text-regular'>
                                {t('MainPage.Sections.Footer.Pages.Disabled.Desc_5')}
                            </div>
                            <div className='text-regular'>
                                {t('MainPage.Sections.Footer.Pages.Disabled.Desc_6')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.Disabled.Desc_7')}</div>

                <div className='mid-container'>
                    {t('MainPage.Sections.Footer.Pages.Disabled.Desc_7')}
                </div>

                <div className='unfold-list'>
                    <div className='title-text'>{t('MainPage.Sections.Footer.Pages.Disabled.Title_2')}</div>
                    <div className='disabled-info'>
                        <div className='block-disabled'>
                            <UnfoldComponent
                                title={t('MainPage.Sections.Footer.Pages.Disabled.Unfold.Title_1')}
                                description={t('MainPage.Sections.Footer.Pages.Disabled.Unfold.Desc_1')}
                                icon={arrowBlueIcon}
                                className='unfold-block-disabled' />
                            <div className='horizontal-divider'></div>
                        </div>
                        <div className='block-disabled'>
                            <UnfoldComponent
                                title={t('MainPage.Sections.Footer.Pages.Disabled.Unfold.Title_2')}
                                description={t('MainPage.Sections.Footer.Pages.Disabled.Unfold.Desc_2')}
                                icon={arrowBlueIcon}
                                className='unfold-block-disabled' />
                            <div className='horizontal-divider'></div>
                        </div>
                        <div className='block-disabled'>
                            <UnfoldComponent
                                title={t('MainPage.Sections.Footer.Pages.Disabled.Unfold.Title_3')}
                                description={t('MainPage.Sections.Footer.Pages.Disabled.Unfold.Desc_3')}
                                icon={arrowBlueIcon}
                                className='unfold-block-disabled' />
                            <div className='horizontal-divider'></div>
                        </div>
                        
                        <div className='block-disabled'>
                            <UnfoldComponent
                                title={t('MainPage.Sections.Footer.Pages.Disabled.Unfold.Title_4')}
                                description={t('MainPage.Sections.Footer.Pages.Disabled.Unfold.Desc_4')}
                                icon={arrowBlueIcon}
                                className='unfold-block-disabled' />
                            <div className='horizontal-divider'></div>
                        </div>
                        <div className='block-disabled'>
                            <UnfoldComponent
                                title={t('MainPage.Sections.Footer.Pages.Disabled.Unfold.Title_5')}
                                description={t('MainPage.Sections.Footer.Pages.Disabled.Unfold.Desc_5')}
                                icon={arrowBlueIcon}
                                className='unfold-block-disabled' />
                            <div className='horizontal-divider'></div>
                        </div>
                        <div className='block-disabled'>
                            <UnfoldComponent
                                title={t('MainPage.Sections.Footer.Pages.Disabled.Unfold.Title_6')}
                                description={t('MainPage.Sections.Footer.Pages.Disabled.Unfold.Desc_6')}
                                icon={arrowBlueIcon}
                                className='unfold-block-disabled' />
                            <div className='horizontal-divider'></div>
                        </div>
                        <div className='block-disabled'>
                            <UnfoldComponent
                                title={t('MainPage.Sections.Footer.Pages.Disabled.Unfold.Title_7')}
                                description={t('MainPage.Sections.Footer.Pages.Disabled.Unfold.Desc_7')}
                                icon={arrowBlueIcon}
                                className='unfold-block-disabled' />
                        </div>
                    </div>
                </div>
                <div className='horizontal-divider-80px'></div>
                <section className="news-block">
                    <div className='text-title'>{t('MainPage.Sections.Footer.Pages.Disabled.News.Header')}</div>
                    <div className="news-row">
                        <NewsComponent
                            header={t('MainPage.Sections.Footer.Pages.Disabled.News.Title_1')}
                            text={t('MainPage.Sections.Footer.Pages.Disabled.News.Desc_1')}
                            image={imacFImage}
                            className="news-item" />
                        <NewsComponent
                            header={t('MainPage.Sections.Footer.Pages.Disabled.News.Title_2')}
                            text={t('MainPage.Sections.Footer.Pages.Disabled.News.Desc_2')}
                            image={nurseImage}
                            className="news-item" />
                        <NewsComponent
                            header={t('MainPage.Sections.Footer.Pages.Disabled.News.Title_3')}
                            text={t('MainPage.Sections.Footer.Pages.Disabled.News.Desc_3')}
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