import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
import NotificationSearch from '../account/profile/notifications/NotificationSearch';
import '../../styles/pages/footer/footer-header.scss'

interface HeaderProps {
    title: string;
    className?: string;
    breadcrumbs?: string[];
    breadcrumdslinks?: string[];
}

export default function FooterHeader({ title, className = '', breadcrumbs = [] }: HeaderProps) {
    const { t } = useTranslation();
    // const navigate = useNavigate();

    // const handleLinkClick = () => {
    //     // navigate(breadcrumdslinks)
    // }

    return (
        <div className={`footer-header ${className}`}>
            <div className='header'>
                {t(title)}
                <NotificationSearch />
            </div>
            <div className='divider' />
            <div className='breadcrumbs'>
                {breadcrumbs.map((item, index) => (
                    <>
                        <span className='breadcrumb'>
                            {item}
                        </span>
                        {index < breadcrumbs.length - 1 && `-`}
                    </>
                ))}
            </div>
        </div>
    )
}