import '../styles/pages/home/home.scss'
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t, i18n } = useTranslation();
    document.title = `Mandry - ${t('homeTitle')}`

    return (
        <>
            <div id="home-page">
                <div id='content-container'>
                    <div className='floor-container' id='first-container'>
                        
                        <div id='main-caption'>
                            {t('mainCaption')}
                        </div> 
                    </div>
                    
                </div>
            </div>            
        </>
    );
}