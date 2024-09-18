import { useTranslation } from 'react-i18next';

import FooterSection from '../home/FooterSection';
import FooterHeader from './FooterHeader';
import '../../styles/pages/footer/footer-contacts.scss'

export default function ContactsPage() {
    const { t } = useTranslation();

    document.title = t('Titles.ContactsPage');

    return (
        <div className='contact-page'>
            <div className='content-container'>
                <FooterHeader title='MainPage.Sections.Footer.Pages.Contacts.Header' />
                <div className='contact-title'>{t('MainPage.Sections.Footer.Pages.Contacts.Title')}</div>
                <div className='contacts-blocks'>
                    <div className='block'>
                        <div className='block-title'>{t('MainPage.Sections.Footer.Pages.Contacts.Blocks.InfoCenter')}</div>
                        <div className='block-description'>(0 800) 555 - 55 - 50</div>
                        <div className='block-description'>(0 800) 555 - 55 - 55</div>
                        <div className='block-email'>info@mandry.com.ua</div>
                    </div>
                    <div className='block'>
                        <div className='block-title'>{t('MainPage.Sections.Footer.Pages.Contacts.Blocks.SalesDept')}</div>
                        <div className='block-description'>(0 800) 555 - 55 - 15</div>
                        <div className='block-description'>(0 800) 555 - 55 - 20</div>
                        <div className='block-email'>marketing@mandry.com.ua</div>
                    </div>
                    <div className='block'>
                        <div className='block-title'>{t('MainPage.Sections.Footer.Pages.Contacts.Blocks.HrDept')}</div>
                        <div className='block-description'>(0 800) 555 - 55 - 05</div>
                        <div className='block-description'>(0 800) 555 - 55 - 10</div>
                        <div className='block-email'>hr@mandry.com.ua</div>
                    </div>
                    <div className='block'>
                        <div className='block-title'>{t('MainPage.Sections.Footer.Pages.Contacts.Blocks.Feedback')}</div>
                        <div className='block-description'>05005, Україна, м.Херсон проспект Незалежності, 1/1 Mandry</div>
                        <div className='block-email'>customers@mandry.com.ua</div>
                    </div>
                </div>
                <div className='no-breaks'>{t('MainPage.Sections.Footer.Pages.Contacts.NoBreaks')}</div>
                <div className='call-info'>{t('MainPage.Sections.Footer.Pages.Contacts.CallInfo')}</div>
            </div>
            <FooterSection />
        </div>
    )
}