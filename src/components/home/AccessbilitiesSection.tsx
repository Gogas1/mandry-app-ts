import arrowIcon from '../../assets/icons/meta/arrow-thin.svg';

import '../../styles/pages/home/accessbilities-section.scss';
import { AccessbImageHelper } from '../../helpers/ImageHelper';
import { CSSProperties, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface HousingsSectionProps {
    className?: string;
}

export default function AccessbilitiesSection({ className }: HousingsSectionProps) {
    const { t } = useTranslation();
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
                        <div className='slide__content' style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${AccessbImageHelper.ACInfo.image}) lightgray 50% / cover no-repeat` } as CSSProperties}>
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
                                <Link
                                    to={''}
                                    className='more'>
                                    {t('MainPage.More')}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='slide'>
                        <div className='slide__content' style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${AccessbImageHelper.PetsInfo.image}) lightgray 50% / cover no-repeat` } as CSSProperties}>
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
                                <Link
                                    to={''}
                                    className='more'>
                                    {t('MainPage.More')}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='slide'>
                        <div className='slide__content' style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${AccessbImageHelper.GarageInfo.image}) lightgray 50% / cover no-repeat` } as CSSProperties}>
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
                                <Link
                                    to={''}
                                    className='more'>
                                    {t('MainPage.More')}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='slide'>
                        <div className='slide__content' style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${AccessbImageHelper.PoolInfo.image}) lightgray 50% / cover no-repeat` } as CSSProperties}>
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
                                <Link
                                    to={''}
                                    className='more'>
                                    {t('MainPage.More')}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='slide'>
                        <div className='slide__content' style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${AccessbImageHelper.TVInfo.image}) lightgray 50% / cover no-repeat` } as CSSProperties}>
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
                                <Link
                                    to={''}
                                    className='more'>
                                    {t('MainPage.More')}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='slide'>
                        <div className='slide__content' style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${AccessbImageHelper.WashingInfo.image}) lightgray 50% / cover no-repeat` } as CSSProperties}>
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
                                <Link
                                    to={''}
                                    className='more'>
                                    {t('MainPage.More')}
                                </Link>
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
            </div>
        </div>
    );
}