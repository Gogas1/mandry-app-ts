import { Trans } from 'react-i18next';
import '../../styles/pages/home/promotions-section.scss';
import { CSSProperties, useRef } from 'react';
import { PromotionsImageHelper } from '../../helpers/ImageHelper';

import arrowIcon from '../../assets/icons/meta/arrow-thin.svg';
import { Link } from 'react-router-dom';

interface PromotionsSectionProps {
    className?: string;
}

export default function PromotionsSection({ className = '' }: PromotionsSectionProps) {
    const sliderRef = useRef<HTMLDivElement>(null);

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

    return (
        <div className={`promotions-section ${className}`}>
            <h3 className='main-caption'>
                <Trans i18nKey={"MainPage.Sections.Fourth.Caption"}
                components={{
                    decoratedK: <span className='decorated-K' />,
                    decoratedA: <span className='decorated-A' />,
                    decoratedP: <span className='decorated-P' />
                }} />
            </h3>
            <div className='gallery'>
                <div className='slider-container'>
                    <div className='slider' ref={sliderRef}>
                        <div className='slide'>
                            <div 
                                className='slide__content' 
                                style={{ backgroundImage: `url(${PromotionsImageHelper.HotelInfo.image})` } as CSSProperties}>

                            </div>
                        </div>
                        <div 
                            className='slide'
                            >
                            <div 
                                className='slide__content' 
                                style={{ backgroundImage: `url(${PromotionsImageHelper.KlenInfo.image})` } as CSSProperties}>

                            </div>
                        </div>
                        <div 
                            className='slide'>
                            <div 
                                className='slide__content'
                                style={{ backgroundImage: `url(${PromotionsImageHelper.KarpatyInfo.image})` } as CSSProperties}>
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

                    <Link to={'/blank'} className='adv__link'>Дізнайся більше</Link>
                </div>
            </div>
        </div>
    );
}