import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/footer/footer-mandry-safe.scss';

import FooterSection from '../home/FooterSection';
import FooterHeader from './FooterHeader';

export default function MandrySafe() {
    const { t } = useTranslation();

    document.title = t('MainPage.Sections.Footer.Pages.MandrySafe.PageTitle');

    return (
        <div className='mandy-safe-page'>
            <div className='content-container'>
                <FooterHeader title='MainPage.Sections.Footer.Pages.MandrySafe.Header' />
                <div className='start-title'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Title')}</div>
                <div className='text-panel'>
                    <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Title_1')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Desc_1')}</div>
                    <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Title_2')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Desc_2')}</div>
                    <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Title_3')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Desc_3')}</div>
                    <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Title_4')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Desc_4')}</div>
                    <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Title_5')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Desc_5')}</div>
                    <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Title_6')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Desc_6')}</div>
                    <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Title_7')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Desc_7')}</div>                    
                </div>
                <div className='horizontal-divider' />
                <div className='start-title'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Title_1.2')}</div>
                <div className='text-panel-bottom'>
                    <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Title_8')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Desc_8')}</div>
                    <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Title_9')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Desc_9')}</div>
                    <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Title_10')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Desc_10')}</div>
                    <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Title_11')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Desc_11')}</div>
                    <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Title_12')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Desc_12')}</div>
                    <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Title_13')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Desc_13')}</div>
                    <div className='title-bold'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Title_14')}</div>
                    <div className='text-regular'>{t('MainPage.Sections.Footer.Pages.MandrySafe.Desc_14')}</div>
                </div>
            </div>
            <FooterSection />
        </div>
    )
}