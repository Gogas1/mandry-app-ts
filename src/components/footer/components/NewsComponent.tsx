import { useTranslation } from "react-i18next";

interface NewsComponentProps {
    header: string;
    text: string;
    image: string;
}

export default function NewsComponent({ header, text, image }: NewsComponentProps) {
    const { t } = useTranslation();

    return (
        <>
            <div className="news-component">
                <div className="image-wrapper">
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