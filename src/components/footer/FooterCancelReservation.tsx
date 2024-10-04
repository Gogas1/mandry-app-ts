import { useTranslation } from 'react-i18next';
import '../../styles/pages/footer/footer-cancel-reserv.scss';

import FooterSection from '../home/FooterSection';
import FooterHeader from './FooterHeader';
import UnfoldComponent from './components/UnfoldComponent';
import NewsComponent from './components/NewsComponent';

import arrowBlueIcon from '../../assets/icons/footer/start-business/arrow-blue.svg';
import arrowThin from '../../assets/icons/meta/arrow-thin.svg';

import keysDocImage from '../../assets/images/footer/revocation/keys-document.png';
import ownerImage from '../../assets/images/footer/revocation/owner.png';
import picnicImage from '../../assets/images/footer/revocation/picnic.png';
import peopleTalkingImage from '../../assets/images/footer/revocation/people_talking.png';

export default function CancelReservation() {
    const { t } = useTranslation();

    document.title = t('MainPage.Sections.Footer.Pages.CancelReservation.PageTitle');

    return (
        <div className='cancel-reservation-page'>
            <div className='content-container'>
                <FooterHeader 
                    title='MainPage.Sections.Footer.Pages.CancelReservation.CancelationTitle'
                    
                    />
                <div className='start-title'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Header')}</div>
                <div className='text-image-block'>
                    <div className='image-block'>
                        <img src={keysDocImage}></img>
                    </div>
                    <div className='text-block'>
                        <div className='margin-10px'>
                            <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.CancelReservation.CancelationTitle')}</div>
                        </div>
                        <div className='text-regular-heavy-weight'>{t('MainPage.Sections.Footer.Pages.CancelReservation.CancelationDesc_1')}</div>
                        <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.CancelReservation.CancelationDesc_2')}</div>
                    </div>
                </div>
                <div className='horizontal-divider-80px' />
                <div className='title-text'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Title_1')}</div>
                <div className='date-rules'>
                    <div className='date-rules__text'>
                        {t('MainPage.Sections.Footer.Pages.CancelReservation.RulesDateStart')}
                    </div>
                </div>
                <div className='rules-info'>
                    <div className='rule-info-desc'>
                        <div className='text-regular-heavy-weight'>
                            {t('MainPage.Sections.Footer.Pages.CancelReservation.RuleInfo')}
                        </div>
                    </div>
                    <div className='general-info'>
                        <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Title_2')}</div>
                        <div className='general-info__block'>
                            <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Desc_1')}</div>
                        </div>
                        <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Title_3')}</div>
                        <div className='block-rules'>
                            <UnfoldComponent
                                title={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_1.UnfTitle_1')}
                                description={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_1.UnfDesc_1')}
                                icon={arrowBlueIcon}
                                className='unfold-block-rules' />
                        </div>
                        <div className='horizontal-divider' />
                        <div className='block-rules'>
                            <UnfoldComponent
                                title={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_1.UnfTitle_2')}
                                description={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_1.UnfDesc_2')}
                                icon={arrowBlueIcon}
                                className='unfold-block-rules' />
                        </div>
                        <div className='horizontal-divider' />  
                        <div className='block-rules'>
                            <UnfoldComponent
                                title={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_1.UnfTitle_3')}
                                description={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_1.UnfDesc_3')}
                                icon={arrowBlueIcon}
                                className='unfold-block-rules' />
                        </div>
                        <div className='horizontal-divider' />
                        <div className='block-rules'>
                            <UnfoldComponent
                                title={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_1.UnfTitle_4')}
                                description={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_1.UnfDesc_4')}
                                icon={arrowBlueIcon}
                                className='unfold-block-rules' />
                        </div>
                        <div className='horizontal-divider' />  
                        <div className='block-rules'>
                            <UnfoldComponent
                                title={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_1.UnfTitle_5')}
                                description={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_1.UnfDesc_5')}
                                icon={arrowBlueIcon}
                                className='unfold-block-rules' />
                        </div>          
                    </div>
                </div>
                <div className='info-block'>
                    <div className='title-text'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Title_4')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Desc_2')}</div>
                </div>
                <div className='info-block'>
                    <div className='title-text'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Title_5')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Desc_3.Desc_1')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Desc_3.Desc_2')}</div>
                    <ul className='info-list'>
                        <li><div className='text-regular'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Desc_3.Desc_3')}</div></li>
                        <li><div className='text-regular'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Desc_3.Desc_4')}</div></li>
                        <li><div className='text-regular'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Desc_3.Desc_5')}</div></li>
                        <li><div className='text-regular'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Desc_3.Desc_6')}</div></li>
                        <li><div className='text-regular'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Desc_3.Desc_7')}</div></li>
                        <li><div className='text-regular'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Desc_3.Desc_8')}</div></li>
                    </ul>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Desc_3.Desc_9')}</div>
                </div>
                <div className='info-block'>
                    <div className='title-text'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Title_6')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Desc_4')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Desc_5')}</div>
                </div>

                <div className='mid-container'>
                    {t('MainPage.Sections.Footer.Pages.CancelReservation.Info_1')}
                </div>

                <div className='title-text'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Title_7')}</div>
                <div className='date-rules'>
                    <div className='date-rules__text'>
                        {t('MainPage.Sections.Footer.Pages.CancelReservation.RulesDateStart')}
                    </div>
                </div>
                <div className='rules-info'>
                    <div className='rule-info-desc'>
                        <div className='text-regular-heavy-weight'>
                            {t('MainPage.Sections.Footer.Pages.CancelReservation.Desc_6')}
                        </div>
                    </div>
                    <div className='general-info'>
                        <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Title_2')}</div>
                        <div className='general-info__block'>
                            <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Desc_6')}</div>
                        </div>
                        <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Title_9')}</div>
                        <div className='block-rules'>
                            <UnfoldComponent
                                title={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_2.UnfTitle_1')}
                                description={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_2.UnfDesc_1')}
                                icon={arrowBlueIcon}
                                className='unfold-block-rules' />
                        </div>
                        <div className='horizontal-divider' />
                        <div className='block-rules'>
                            <UnfoldComponent
                                title={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_2.UnfTitle_2')}
                                description={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_2.UnfDesc_2')}
                                icon={arrowBlueIcon}
                                className='unfold-block-rules' />
                        </div>
                        <div className='horizontal-divider' />  
                        <div className='block-rules'>
                            <UnfoldComponent
                                title={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_2.UnfTitle_3')}
                                description={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_2.UnfDesc_3')}
                                icon={arrowBlueIcon}
                                className='unfold-block-rules' />
                        </div>
                        <div className='horizontal-divider' />
                        <div className='block-rules'>
                            <UnfoldComponent
                                title={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_2.UnfTitle_4')}
                                description={t('MainPage.Sections.Footer.Pages.CancelReservation.Unfold_2.UnfDesc_4')}
                                icon={arrowBlueIcon}
                                className='unfold-block-rules' />
                        </div>         
                    </div>
                </div>
                <div className='info-block'>
                    <div className='title-text'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Title_10')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Desc_8')}</div>
                </div>
                <div className='info-block'>
                    <div className='title-text'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Title_11')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.CancelReservation.Desc_9')}</div>
                </div>

                <div className='mid-container'>
                    {t('MainPage.Sections.Footer.Pages.CancelReservation.Info_2')}
                </div>
                <section className="news-block">
                    <div className='text-title'>{t('MainPage.Sections.Footer.Pages.CancelReservation.News.Header')}</div>
                    <div className="news-row">
                        <NewsComponent
                            header={t('MainPage.Sections.Footer.Pages.CancelReservation.News.Title_1')}
                            text={t('MainPage.Sections.Footer.Pages.CancelReservation.News.Desc_1')}
                            image={ownerImage}
                            className="news-item" />
                        <NewsComponent
                            header={t('MainPage.Sections.Footer.Pages.CancelReservation.News.Title_2')}
                            text={t('MainPage.Sections.Footer.Pages.CancelReservation.News.Desc_2')}
                            image={peopleTalkingImage}
                            className="news-item" />
                        <NewsComponent
                            header={t('MainPage.Sections.Footer.Pages.CancelReservation.News.Title_3')}
                            text={t('MainPage.Sections.Footer.Pages.CancelReservation.News.Desc_3')}
                            image={picnicImage}
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