import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/footer/footer-start-business.scss';

import FooterSection from '../home/FooterSection';
import FooterHeader from './FooterHeader';
import NewsComponent from './components/NewsComponent';

import cityImage from '../../assets/images/footer/start_business/city.png';
import signManImage from '../../assets/images/footer/start_business/sign_man.png';
import peopleTalkingImage from '../../assets/images/footer/start_business/people_talking.png';
import manHouseImage from '../../assets/images/footer/start_business/man_house.png';

import searchIcon from '../../assets/icons/account/search.svg';
import checkRoundIcon from '../../assets/icons/footer/start-business/check-round.svg';
import crossRoundIcon from '../../assets/icons/footer/start-business/cross-round.svg';

export default function HelpCenter() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    document.title = t('MainPage.Sections.Footer.Pages.StartBusiness.PageTitle');

    return (
        <div className='start-business-page'>
            <div className='content-container'>
                <FooterHeader title='MainPage.Sections.Footer.Pages.StartBusiness.Header' />
                <div className='start-title'>{t('MainPage.Sections.Footer.Pages.StartBusiness.Title')}</div>
                <div className='block-start'>
                    <div className='block-start__map'>
                        <div className='map'>

                        </div>
                        <div className='search'>
                            <input type="text" placeholder={t('MainPage.Sections.Footer.Pages.StartBusiness.BlockStart.SearchPlaceholder')} className='input-field'/>
                            <img src={searchIcon} className='search-icon'/>
                        </div>
                    </div>
                    <div className='block-start__start'>
                        <button className='button-start'>
                            {t('MainPage.Sections.Footer.Pages.StartBusiness.ButtonStart')}
                        </button>
                        <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.StartBusiness.BlockStart.Title')}</div>
                        <div className='text-regular-heavy'>{t('MainPage.Sections.Footer.Pages.StartBusiness.BlockStart.Desc_1')}</div>
                        <div className='text-regular-heavy'>{t('MainPage.Sections.Footer.Pages.StartBusiness.BlockStart.Desc_2')}</div>
                    </div>
                </div>
                <img src={cityImage} className='city-image'/>
                <div className='text-bold'>{t('MainPage.Sections.Footer.Pages.StartBusiness.Desc_1')}</div>
                <div className='to-chat'>
                    <div className='to-chat__text'>
                        <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.StartBusiness.ToChat')}</div>
                    </div>
                    <div className='to-chat__button'>
                        <button className='to-chat-button'>{t('MainPage.Sections.Footer.Pages.StartBusiness.ToChatButton')}</button>
                    </div>
                </div>
                <div className='to-owner'>
                    <div className='to-owner__text'>
                        <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.StartBusiness.ToOwnersPage')}</div>
                    </div>
                    <div className='to-owner__button'>
                        <button className='to-owners-button'>{t('MainPage.Sections.Footer.Pages.StartBusiness.ToOwnersButton')}</button>
                    </div>
                </div>
                <div className='horizontal-divider-80px' />
                <div className='title-text'>{t('MainPage.Sections.Footer.Pages.StartBusiness.EasyStart.Header')}</div>
                <div className='easy-start-block'>
                    <div className='easy-start-panel'>
                        <img src={signManImage} className='easy-start-image'/>
                        <div className='text-bold'>{t('MainPage.Sections.Footer.Pages.StartBusiness.EasyStart.Title_1')}</div>
                        <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.StartBusiness.EasyStart.Desc_1')}</div>
                    </div>
                    <div className='easy-start-panel'>
                        <img src={peopleTalkingImage} className='easy-start-image'/>
                        <div className='text-bold'>{t('MainPage.Sections.Footer.Pages.StartBusiness.EasyStart.Title_2')}</div>
                        <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.StartBusiness.EasyStart.Desc_2')}</div>
                    </div>
                    <div className='easy-start-panel'>
                        <img src={manHouseImage} className='easy-start-image'/>
                        <div className='text-bold'>{t('MainPage.Sections.Footer.Pages.StartBusiness.EasyStart.Title_3')}</div>
                        <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.StartBusiness.EasyStart.Desc_3')}</div>
                    </div>
                </div>
                <div className='horizontal-divider-80px' />
                <div className='mid-title'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Header_1')}</div>
                <div className='mandry-safe'>
                    <div className='text-bold'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Title_1')}</div>
                    <div className='text-regular-heavy'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Desc_1')}</div>
                </div>
                <div className='horizontal-divider-30px' />
                <div className='title-text'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Header_2')}</div>
                <div className='advantages-list'>
                    <div className='column-headers'>
                        <div className='title-orange'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Header_3')}</div>
                        <div className='title-orange'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Header_4')}</div>
                    </div>
                    <div className='advantages-block'>
                        <div className='advantages-description'>
                            <div className='text-regular-heavy'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Title_2')}</div>
                            <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Desc_2')}</div>
                        </div>
                        <div className='advantages-compare'>
                            <img src={checkRoundIcon} className='check-icon'/>
                            <img src={checkRoundIcon} className='check-icon'/>
                        </div>
                    </div>
                    <div className='horizontal-divider-blue' />
                    <div className='advantages-block'>
                        <div className='advantages-description'>
                            <div className='text-regular-heavy'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Title_3')}</div>
                            <div className='text-regular-16px'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Desc_3')}</div>
                        </div>
                        <div className='advantages-compare'>
                            <img src={checkRoundIcon} className='check-icon'/>
                            <img src={crossRoundIcon} className='cross-icon'/>
                        </div>
                    </div>
                    <div className='horizontal-divider-blue' />
                    <div className='advantages-block'>
                        <div className='advantages-description'>
                            <div className='text-regular-heavy'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Title_4')}</div>
                            <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Desc_4')}</div>
                        </div>
                        <div className='advantages-compare'>
                            <img src={checkRoundIcon} className='check-icon'/>
                            <img src={crossRoundIcon} className='cross-icon'/>
                        </div>
                    </div>
                    <div className='horizontal-divider-blue' />
                    <div className='advantages-block'>
                        <div className='advantages-description'>
                            <div className='text-regular-16px'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Title_5')}</div>
                        </div>
                        <div className='advantages-compare'>
                            <img src={checkRoundIcon} className='check-icon'/>
                            <img src={crossRoundIcon} className='cross-icon'/>
                        </div>
                    </div>
                    <div className='horizontal-divider-blue' />
                    <div className='advantages-block'>
                        <div className='advantages-description'>
                            <div className='text-regular-16px'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Title_6')}</div>
                        </div>
                        <div className='advantages-compare'>
                            <img src={checkRoundIcon} className='check-icon'/>
                            <img src={crossRoundIcon} className='cross-icon'/>
                        </div>
                    </div>
                    <div className='horizontal-divider-blue' />
                    <div className='advantages-block'>
                        <div className='advantages-description'>
                            <div className='text-regular-16px'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Title_7')}</div>
                        </div>
                        <div className='advantages-compare'>
                            <img src={checkRoundIcon} className='check-icon'/>
                            <img src={crossRoundIcon} className='cross-icon'/>
                        </div>
                    </div>
                    <div className='horizontal-divider-blue' />
                    <div className='advantages-block'>
                        <div className='advantages-description'>
                            <div className='text-regular-16px'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Title_8')}</div>
                        </div>
                        <div className='advantages-compare'>
                            <img src={checkRoundIcon} className='check-icon'/>
                            <img src={crossRoundIcon} className='cross-icon'/>
                        </div>
                    </div>
                    <div className='horizontal-divider-blue' />
                    <div className='advantages-block'>
                        <div className='advantages-description'>
                            <div className='text-regular-16px'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Title_9')}</div>
                        </div>
                        <div className='advantages-compare'>
                            <img src={checkRoundIcon} className='check-icon'/>
                            <img src={crossRoundIcon} className='cross-icon'/>
                        </div>
                    </div>
                    <div className='horizontal-divider-blue' />
                    <div className='advantages-block'>
                        <div className='advantages-description'>
                            <div className='text-regular-heavy'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Title_10')}</div>
                            <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Desc_5')}</div>
                        </div>
                        <div className='advantages-compare'>
                            <img src={checkRoundIcon} className='check-icon'/>
                            <img src={crossRoundIcon} className='cross-icon'/>
                        </div>
                    </div>
                    <div className='horizontal-divider-blue' />
                    <div className='advantages-block'>
                        <div className='advantages-description'>
                            <div className='text-regular-heavy'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Title_11')}</div>
                            <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Desc_6')}</div>
                        </div>
                        <div className='advantages-compare'>
                            <img src={checkRoundIcon} className='check-icon'/>
                            <img src={crossRoundIcon} className='cross-icon'/>
                        </div>
                    </div>
                    <div className='horizontal-divider-blue' />
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Desc_7')}</div>
                    <button className='safe-details-button'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.DetailsButton')}</button>
                    <div className='horizontal-divider-80px' />
                </div>
            </div>
            <FooterSection />
        </div>
    )

}