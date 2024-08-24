import arrowIcon from '../../assets/icons/meta/arrow-thin.svg';

import '../../styles/pages/home/accessbilities-section.scss';
import { AccessbImageHelper, HousingsImageHelper } from '../../helpers/ImageHelper';
import { CSSProperties, useRef, useState } from 'react';
import { Trans } from 'react-i18next';

interface HousingsSectionProps {
    className?: string;
}

export default function AccessbilitiesSection({ className }: HousingsSectionProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    
    const handeleNext = () => {
        if(sliderRef.current) {
            const slides = sliderRef.current.children;
            sliderRef.current.appendChild(slides[0]);
        }
    }

    const handelePrev = () => {
        if(sliderRef.current) {
            const slides = sliderRef.current.children;
            sliderRef.current.prepend(slides[slides.length - 1]);
        }
    }

    return (
        <div className={`housing-section ${className}`}>
            <div className='banner-container'>
                <div className='slider' ref={sliderRef}>
                    <div className='slide'>
                        <div className='slide__content' style={{ backgroundImage: `url(${AccessbImageHelper.ACInfo.image})` } as CSSProperties}>
                            <div className='slide__content__text'>
                                <h3>
                                    <Trans i18nKey={"MainPage.Sections.Fifth.Caption"} 
                                        components={{
                                            decoratedU: <span className='decorated-U' />,
                                            decoratedA: <span className='decorated-A' />,
                                            decoratedP: <span className='decorated-P' />
                                        }} />
                                </h3>
                                <p>{AccessbImageHelper.ACInfo.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className='slide'>
                        <div className='slide__content' style={{ backgroundImage: `url(${AccessbImageHelper.PetsInfo.image})` } as CSSProperties}>
                            <div className='slide__content__text'>
                                <h3>
                                <Trans i18nKey={"MainPage.Sections.Fifth.Caption"} 
                                        components={{
                                            decoratedU: <span className='decorated-U' />,
                                            decoratedA: <span className='decorated-A' />,
                                            decoratedP: <span className='decorated-P' />
                                        }} />
                                </h3>
                                <p>{AccessbImageHelper.PetsInfo.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className='slide'>
                        <div className='slide__content' style={{ backgroundImage: `url(${AccessbImageHelper.GarageInfo.image})` } as CSSProperties}>
                            <div className='slide__content__text'>
                                <h3>
                                <Trans i18nKey={"MainPage.Sections.Fifth.Caption"} 
                                        components={{
                                            decoratedU: <span className='decorated-U' />,
                                            decoratedA: <span className='decorated-A' />,
                                            decoratedP: <span className='decorated-P' />
                                        }} />
                                </h3>
                                <p>{AccessbImageHelper.GarageInfo.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className='slide'>
                        <div className='slide__content' style={{ backgroundImage: `url(${AccessbImageHelper.PoolInfo.image})` } as CSSProperties}>
                            <div className='slide__content__text'>
                                <h3>
                                <Trans i18nKey={"MainPage.Sections.Fifth.Caption"} 
                                        components={{
                                            decoratedU: <span className='decorated-U' />,
                                            decoratedA: <span className='decorated-A' />,
                                            decoratedP: <span className='decorated-P' />
                                        }} />
                                </h3>
                                <p>{AccessbImageHelper.PoolInfo.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className='slide'>
                        <div className='slide__content' style={{ backgroundImage: `url(${AccessbImageHelper.TVInfo.image})` } as CSSProperties}>
                            <div className='slide__content__text'>
                                <h3>
                                <Trans i18nKey={"MainPage.Sections.Fifth.Caption"} 
                                        components={{
                                            decoratedU: <span className='decorated-U' />,
                                            decoratedA: <span className='decorated-A' />,
                                            decoratedP: <span className='decorated-P' />
                                        }} />
                                </h3>
                                <p>{AccessbImageHelper.TVInfo.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className='slide'>
                        <div className='slide__content' style={{ backgroundImage: `url(${AccessbImageHelper.WashingInfo.image})` } as CSSProperties}>
                            <div className='slide__content__text'>
                                <h3>
                                <Trans i18nKey={"MainPage.Sections.Fifth.Caption"} 
                                        components={{
                                            decoratedU: <span className='decorated-U' />,
                                            decoratedA: <span className='decorated-A' />,
                                            decoratedP: <span className='decorated-P' />
                                        }} />
                                </h3>
                                <p>{AccessbImageHelper.WashingInfo.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='controls'>
                    <div className='buttons'>
                        <button className='control' onClick={handelePrev}>
                            <img src={arrowIcon} />
                        </button>
                        <button className='control control--right' onClick={handeleNext}>
                            <img src={arrowIcon} />
                        </button>
                    </div>      
                </div>
                <div className='more'>
                    Бiльше
                </div>
            </div>
        </div>
    );
}