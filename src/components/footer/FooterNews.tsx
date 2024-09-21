import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import FooterSection from '../home/FooterSection';
// import NotificationSearch from '../account/profile/notifications/NotificationSearch';
import FooterPromotionsSection from '../footer/FooterPromotionSection';
import FooterHeader from './FooterHeader';

import '../../styles/pages/footer/footer-news.scss'

export default function NewsPage() {
    const { t } = useTranslation();
    // const navigate = useNavigate();

    document.title = t('Titles.NewsPage');

    const [selectedPromHotel, setSelectedPromHotel] = useState<string>('base');
    

    const handleSelectPromHotel = (value: string) => {
        setSelectedPromHotel(value);
    }

    const renderPromSection = () => {
        switch (selectedPromHotel) {
            case 'base':
                return <FooterPromotionsSection handlePromotion={handleSelectPromHotel}/>;
            case '0':
                return <FooterPromotionsSection handlePromotion={handleSelectPromHotel}/>;
            case '1':
                return <FooterPromotionsSection handlePromotion={handleSelectPromHotel}/>;
            case '2':
                return <FooterPromotionsSection handlePromotion={handleSelectPromHotel}/>;
            default:
                return <FooterPromotionsSection handlePromotion={handleSelectPromHotel}/>;
        }
    }

    return (
        <div className='news-page'>
            <div className='content-container'>
                <FooterHeader title='MainPage.Sections.Footer.Pages.News.Header'/>
                    <div className='promotion-section'>{renderPromSection()}</div>
                <div className='divider' />
            </div>
            <FooterSection />
        </div>
    )
}