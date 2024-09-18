import { useTranslation } from 'react-i18next';
import '../../styles/pages/footer/footer-promotion-section.scss';
import { CSSProperties, useRef } from 'react';
import { PromotionsImageHelper } from '../../helpers/ImageHelper';

import arrowIcon from '../../assets/icons/meta/arrow-thin.svg';
import { useNavigate } from 'react-router-dom';

interface PromotionsSectionProps {
    className?: string;
    handlePromotion: (value: string) => void;
}

export default function PromotionsSection({ className = '', handlePromotion }: PromotionsSectionProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const sliderRef = useRef<HTMLDivElement>(null);

    document.title = t('Titles.PromotionsSection');

    const handlePrev = () => {
        if(sliderRef.current) {
            const slides = sliderRef.current.children;
            sliderRef.current.append(slides[0]);
        }
    }

    const handleNext = () => {
        if(sliderRef.current) {
            const slides = sliderRef.current.children;
            sliderRef.current.prepend(slides[slides.length - 1]);
        }
    }

    const renderMainCaption = (value: string) => {
        switch (value) {
            case 'base':
                return 'MainPage.Sections.Footer.Pages.News.PromotionSection.Header';
            case '0':
                return 'MainPage.Sections.Footer.Pages.News.PromotionSection.Header';
            case '1':
                return 'MainPage.Sections.Footer.Pages.News.PromotionSection.Header';
            case '2':
                return 'MainPage.Sections.Footer.Pages.News.PromotionSection.Header';
            default: 
                return 'MainPage.Sections.Footer.Pages.News.PromotionSection.Header';
        }
    }

    return (
        <div className={`footer-promotions-section ${className}`}>
            <h3 className='main-caption'>
                {t(renderMainCaption(''))}
            </h3>
            <div className='gallery'>
                <div className='slider-container'>
                    <div className='slider' ref={sliderRef}>
                        <div className='slide'>
                            <div 
                                className='slide__content' 
                                style={{ backgroundImage: `url(${PromotionsImageHelper.HotelInfo.image})` } as CSSProperties}>
                                <div className='slide__content__text'>
                                    <p>
                                        {PromotionsImageHelper.HotelInfo.name}
                                    </p>
                                    
                                </div>
                            </div>
                        </div>
                        <div 
                            className='slide'
                            >
                            <div 
                                className='slide__content' 
                                style={{ backgroundImage: `url(${PromotionsImageHelper.KlenInfo.image})` } as CSSProperties}>
                                <div className='slide__content__text'>
                                    <p>
                                        {PromotionsImageHelper.KlenInfo.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div 
                            className='slide'>
                            <div 
                                className='slide__content'
                                style={{ backgroundImage: `url(${PromotionsImageHelper.KarpatyInfo.image})` } as CSSProperties}>
                                    <div className='slide__content__text'>
                                    <p>
                                        {PromotionsImageHelper.KarpatyInfo.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='control control--left' onClick={handlePrev}>
                            <img src={arrowIcon} />
                        </button>
                        <button className='control control--right' onClick={handleNext}>
                            <img src={arrowIcon} />
                        </button>
                </div>
                <div className='adv'>
                    <h2 className='adv__header'>Відпочинок у горах</h2>
                    <div className='adv__text'>
                    Проведіть незабутній зимовий відпочинок у наших розкішних апартаментах з  видом на засніжені вершини Карпат. Насолоджуйтесь найвищим рівнем  сервісу та комфорту за спеціальною акційною ціною!  
                    </div>
                    <div className='adv__price'>
                    Акційна ціна: від 5000 грн/доба
                    </div>

                    <button onClick={() =>handlePromotion('1')} className='adv__link'>Дізнайся більше</button>
                </div>
            </div>
        </div>
    );
}