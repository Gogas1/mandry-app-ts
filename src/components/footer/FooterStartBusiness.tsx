import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/footer/footer-start-business.scss';

import FooterSection from '../home/FooterSection';
import FooterHeader from './FooterHeader';
import UnfoldComponent from './components/UnfoldComponent';
import NewsComponent from './components/NewsComponent';
import { Map } from '@vis.gl/react-google-maps';

import cityImage from '../../assets/images/footer/start_business/city.png';
import signManImage from '../../assets/images/footer/start_business/sign_man.png';
import peopleTalkingImage from '../../assets/images/footer/start_business/people_talking.png';
import manHouseImage from '../../assets/images/footer/start_business/man_house.png';
import peopleCasesImage from '../../assets/images/footer/start_business/people_suitcases.png';
import houseCamImage from '../../assets/images/footer/start_business/house_cam.png';
import peopleImage from '../../assets/images/footer/start_business/people.png';

import searchIcon from '../../assets/icons/account/search.svg';
import checkRoundIcon from '../../assets/icons/footer/start-business/check-round.svg';
import crossRoundIcon from '../../assets/icons/footer/start-business/cross-round.svg';
import arrowBlackIcon from '../../assets/icons/footer/start-business/arrow-black.svg';
import arrowBlueIcon from '../../assets/icons/footer/start-business/arrow-blue.svg';
import arrowThin from '../../assets/icons/meta/arrow-thin.svg';

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
                            <Map
                                style={{borderRadius: '15px'}}
                                defaultZoom={5} 
                                defaultCenter={getDefaultCenter('')}
                                disableDefaultUI={true}>
                            </Map>
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
                    <button className='safe-details-button'
                    onClick={() => navigate('../mandrysafe')}
                    >{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.DetailsButton')}</button>
                </div>
                <div className='horizontal-divider-80px' />
                <div className='title-text'>{t('MainPage.Sections.Footer.Pages.StartBusiness.Answers.Header')}</div>
                <div className='unfold-list'>
                    <UnfoldComponent 
                    title={t('MainPage.Sections.Footer.Pages.StartBusiness.Answers.Title_1')} 
                    description={t('MainPage.Sections.Footer.Pages.StartBusiness.Answers.Desc_1')} 
                    icon={arrowBlackIcon} 
                    className='unfold-block'/>
                </div>
                <div className='horizontal-divider-blue'/>
                <div className='unfold-list'>
                    <UnfoldComponent 
                    title={t('MainPage.Sections.Footer.Pages.StartBusiness.Answers.Title_2')} 
                    description={t('MainPage.Sections.Footer.Pages.StartBusiness.Answers.Desc_2')} 
                    icon={arrowBlackIcon} 
                    className='unfold-block'/>
                </div>
                <div className='horizontal-divider-blue'/>
                <div className='unfold-list'>
                    <UnfoldComponent 
                    title={t('MainPage.Sections.Footer.Pages.StartBusiness.Answers.Title_3')} 
                    description={t('MainPage.Sections.Footer.Pages.StartBusiness.Answers.Desc_3')} 
                    icon={arrowBlackIcon} 
                    className='unfold-block'/>
                </div>
                <div className='horizontal-divider-blue'/>
                <div className='unfold-list'>
                    <UnfoldComponent 
                    title={t('MainPage.Sections.Footer.Pages.StartBusiness.Answers.Title_4')} 
                    description={t('MainPage.Sections.Footer.Pages.StartBusiness.Answers.Desc_4')} 
                    icon={arrowBlackIcon} 
                    link={{
                        text: t('MainPage.Sections.Footer.Pages.StartBusiness.Answers.Link_1'),
                        to: '/'
                    }} 
                    className='unfold-block'/>
                </div>
                <div className='horizontal-divider-blue'/>
                <div className='unfold-list'>
                    <UnfoldComponent 
                    title={t('MainPage.Sections.Footer.Pages.StartBusiness.Answers.Title_5')} 
                    description={t('MainPage.Sections.Footer.Pages.StartBusiness.Answers.Desc_5')} 
                    icon={arrowBlackIcon} 
                    link={{
                        text: t('MainPage.Sections.Footer.Pages.StartBusiness.Answers.Link_2'),
                        to: '/'
                    }} 
                    className='unfold-block'/>
                </div>
                <div className='horizontal-divider-80px' />
                <div className='mandry-safe-info'>
                    <div className='mandry-safe-info__left'>
                        <div className='text-bold'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Title_12')}</div>
                        <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Desc_8')}</div>
                        <button className='more-info'
                        onClick={() => navigate('../mandrysafe')}
                        >{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.MoreButton')}</button>
                    </div>
                    <div className='mandry-safe-info__right'>
                        <div className='info-block'>
                            <div className='text-regular-spacing'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Desc_9')}</div>
                        </div>
                        <div className='info-block'>
                            <div className='text-regular-spacing'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Desc_10')}</div>
                        </div>
                        <div className='info-block'>
                            <div className='text-regular-spacing'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Desc_11')}</div>
                        </div>
                        <div className='info-block'>
                            <div className='text-regular-spacing'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Desc_12')}</div>
                        </div>
                    </div>
                </div>
                <div className='horizontal-divider-80px' />
                <div className='safe-desc-1'>
                    <div className='text-regular-heavy'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Desc_13')}</div>
                    <div className='text-regular-heavy'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Desc_14')}</div>
                </div>
                <div className='title-text'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Header_5')}</div>
                <div className='safe-desc-2'>
                    <div className='text-regular-heavy'>{t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.Desc_15')}</div>
                </div>
                <div className='safe-guarantees'>
                    <div className='desc-guarantees-list'>
                        <div className='block-guarantees'>
                            <UnfoldComponent 
                                title={t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.TitleUnf_1')} 
                                description={t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.DescUnf_1')} 
                                icon={arrowBlueIcon} 
                                className='unfold-guarantees-block'/>
                        </div>
                        <div className='horizontal-divider'/>
                        <div className='block-guarantees'>
                            <UnfoldComponent 
                                title={t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.TitleUnf_2')} 
                                description={t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.DescUnf_2')} 
                                icon={arrowBlueIcon} 
                                className='unfold-guarantees-block'/>
                        </div>
                        <div className='horizontal-divider'/>
                        <div className='block-guarantees'>
                            <UnfoldComponent 
                                title={t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.TitleUnf_3')} 
                                description={t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.DescUnf_3')} 
                                icon={arrowBlueIcon} 
                                className='unfold-guarantees-block'/>
                        </div>
                        <div className='horizontal-divider'/>
                        <div className='block-guarantees'>
                            <UnfoldComponent 
                                title={t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.TitleUnf_4')} 
                                description={t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.DescUnf_4')} 
                                icon={arrowBlueIcon} 
                                className='unfold-guarantees-block'/>
                        </div>
                        <div className='horizontal-divider'/>
                        <div className='block-guarantees'>
                            <UnfoldComponent 
                                title={t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.TitleUnf_5')} 
                                description={t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.DescUnf_5')} 
                                icon={arrowBlueIcon} 
                                className='unfold-guarantees-block'/>
                        </div>
                        <div className='horizontal-divider'/>
                        <div className='block-guarantees'>
                            <UnfoldComponent 
                                title={t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.TitleUnf_6')} 
                                description={t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.DescUnf_6')} 
                                icon={arrowBlueIcon} 
                                className='unfold-guarantees-block'/>
                        </div>
                        <div className='horizontal-divider'/>
                        <div className='block-guarantees'>
                            <UnfoldComponent 
                                title={t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.TitleUnf_7')} 
                                description={t('MainPage.Sections.Footer.Pages.StartBusiness.MandrySafe.DescUnf_7')} 
                                icon={arrowBlueIcon} 
                                className='unfold-guarantees-block'/>
                        </div>
                    </div>
                </div>
                <div className='horizontal-divider-80px' />
                <section className="news-block">
                    <div className='text-title'>{t('MainPage.Sections.Footer.Pages.HelpCenter.ActualNews')}</div>
                    <div className="news-row">
                        <NewsComponent
                            header={t('MainPage.Sections.Footer.Pages.StartBusiness.NewsTitle_1')}
                            text={t('MainPage.Sections.Footer.Pages.StartBusiness.NewsDesc_1')}
                            image={peopleCasesImage}
                            className="news-item" />
                        <NewsComponent
                            header={t('MainPage.Sections.Footer.Pages.StartBusiness.NewsTitle_2')}
                            text={t('MainPage.Sections.Footer.Pages.StartBusiness.NewsDesc_2')}
                            image={houseCamImage}
                            className="news-item" />
                        <NewsComponent
                            header={t('MainPage.Sections.Footer.Pages.StartBusiness.NewsTitle_3')}
                            text={t('MainPage.Sections.Footer.Pages.StartBusiness.NewsDesc_3')}
                            image={peopleImage}
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

type Coordinate = {
    lat: number;
    lng: number;
  };

const normalizeCoordinateString = (coordStr: string): Coordinate | null => {
    // Trim whitespace and split the string
    const [latStr, lngStr] = coordStr.split(',').map(part => part.trim());
  
    // Convert to numbers
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);
  
    // Check if both lat and lng are valid numbers
    if (!isNaN(lat) && !isNaN(lng)) {
      return { lat, lng };
    } else {
      console.warn(`Invalid coordinate string: "${coordStr}"`);
      return null;
    }
  };

const getDefaultCenter = (coordStr: string): Coordinate => {
    const normalized = normalizeCoordinateString(coordStr);

    if(!normalized) return {lat: 50.45466, lng: 30.5238};
    else {
        return normalized;
    }
}