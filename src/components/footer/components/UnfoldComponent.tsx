import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import '../../../styles/footer/components/unfold-component.scss';

interface UnfoldProps {
    title: string;
    description: string;
    icon?: string;
    link?: { text: string; to: string }
    className?: string;
}

export default function UnfoldComponent({ title, description, icon, link, className = '' }: UnfoldProps) {
    // const { t } = useTranslation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    
    const unfoldItem = () => {
        setIsOpen(!isOpen);
    }

    const handleLinkClick = () => {
        if (link?.to) {
            navigate(link.to);
        }
    }

    return (
        <div className={`unfold-component`}
        onClick={unfoldItem}
        >
            <div className={`component-content ${className} ${isOpen ? 'open' : ''}`}>
                <div className='component-content__title'>{title}</div>
                {isOpen && (
                    <>
                    <div className='component-content__desc'
                    
                    >{description}</div>
                    {link && (
                        <div className='component-content__link'
                        onClick={handleLinkClick}
                        >{link.text}</div>
                    )}
                </>)}
            </div>
            <div className={'title-icon'}><img className={`icon-title ${isOpen ? 'rotate' : ''}`} src={icon}/></div>
        </div>
    )
} 