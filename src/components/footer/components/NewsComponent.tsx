import { useTranslation } from "react-i18next";
import '../../../styles/footer/components/news-component.scss';

interface NewsComponentProps {
    header: string;
    text: string;
    image: string;
    className?: string;
}

export default function NewsComponent({ header, text, image, className = '' }: NewsComponentProps) {
    const { t } = useTranslation();

    return (
        <>
            <div className={`news-component ${className}`}>
                <div className="news-component__image-wrapper">
                    <img src={image} />
                    <button>
                        {t('Components.News.More')}
                    </button>
                </div>
                <p className="news-component__header">{header}</p>
                <p className="news-component__body">{text}</p>
            </div>
        </>
    );
}