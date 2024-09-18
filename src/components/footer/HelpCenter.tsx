import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import FooterSection from '../home/FooterSection';
import FooterHeader from './FooterHeader';
import '../../styles/pages/footer/footer-help-center.scss';
import magazineImage from '../../assets/images/footer/help_center/help_magazine.png';
import imacImage from '../../assets/images/footer/help_center/imac.png';
import directionImage from '../../assets/images/footer/help_center/direction.png';
import peopleImage from '../../assets/images/footer/help_center/4_people.png';

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
                        <div className='image-block'><img src={peopleImage}></img></div>                
                    </div>
                </div>
                <div className='mid-container'>
                    {t('MainPage.Sections.Footer.Pages.HelpCenter.Desc_6')}
                </div>
            </div>
            <FooterSection />
        </div>
    )
}
