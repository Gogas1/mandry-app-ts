import arrowIcon from '../../assets/icons/meta/arrow-thin.svg';

import '../../styles/pages/home/housing-section.scss';
import { HousingsImageHelper } from '../../helpers/ImageHelper';
import { CSSProperties, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface HousingsSectionProps {
    className?: string;
}

export default function HousingsSection({ className }: HousingsSectionProps) {
    const { t } = useTranslation();
    const sliderRef = useRef<HTMLDivElement>(null);

    const handeleNext = () => {
        if (sliderRef.current) {
            const slides = sliderRef.current.children;
            sliderRef.current.appendChild(slides[0]);
        }
    }

    const handelePrev = () => {
        if (sliderRef.current) {
            const slides = sliderRef.current.children;
            sliderRef.current.prepend(slides[slides.length - 1]);
        }
    }

    return (
        <div className={`housing-section ${className}`}>
            <div className='banner-container'>
                <div className='slider' ref={sliderRef}>
                    <div className='slide'>
                        <div className='slide__content' style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${HousingsImageHelper.BoatHInfo.image}) lightgray 50% / cover no-repeat` } as CSSProperties}>
                            <div className='slide__content__text'>
                                <h3>
                                    <Trans i18nKey={"MainPage.Sections.Third.Caption"}
                                        components={{
                                            decoratedR: <span className='decorated-R' />,
                                            decoratedA: <span className='decorated-A' />
                                        }} />
                                </h3>
                                <p>{HousingsImageHelper.BoatHInfo.name}</p>
                                <Link
                                    to={`/search?category=categories.boathouse`} 
                                    className='more'>
                                    {t('MainPage.More')}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='slide'>
                        <div className='slide__content' style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${HousingsImageHelper.CampingHInfo.image}) lightgray 50% / cover no-repeat` } as CSSProperties}>
                            <div className='slide__content__text'>
                                <h3>
                                    <Trans i18nKey={"MainPage.Sections.Third.Caption"}
                                        components={{
                                            decoratedR: <span className='decorated-R' />,
                                            decoratedA: <span className='decorated-A' />
                                        }} />
                                </h3>
                                <p>{HousingsImageHelper.CampingHInfo.name}</p>
                                <Link
                                    to={`/search?category=categories.camping`} 
                                    className='more'>
                                    {t('MainPage.More')}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='slide'>
                        <div className='slide__content' style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${HousingsImageHelper.CastleInfo.image}) lightgray 50% / cover no-repeat` } as CSSProperties}>
                            <div className='slide__content__text'>
                                <h3>
                                    <Trans i18nKey={"MainPage.Sections.Third.Caption"}
                                        components={{
                                            decoratedR: <span className='decorated-R' />,
                                            decoratedA: <span className='decorated-A' />
                                        }} />
                                </h3>
                                <p>{HousingsImageHelper.CastleInfo.name}</p>
                                <Link 
                                    to={`/search?category=categories.castle`} 
                                    className='more'>
                                    {t('MainPage.More')}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='slide'>
                        <div className='slide__content' style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${HousingsImageHelper.FarmHInfo.image}) lightgray 50% / cover no-repeat` } as CSSProperties}>
                            <div className='slide__content__text'>
                                <h3>
                                    <Trans i18nKey={"MainPage.Sections.Third.Caption"}
                                        components={{
                                            decoratedR: <span className='decorated-R' />,
                                            decoratedA: <span className='decorated-A' />
                                        }} />
                                </h3>
                                <p>{HousingsImageHelper.FarmHInfo.name}</p>
                                <Link 
                                    to={`/search?category=categories.farm`} 
                                    className='more'>
                                    {t('MainPage.More')}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='slide'>
                        <div className='slide__content' style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${HousingsImageHelper.FlatHInfo.image}) lightgray 50% / cover no-repeat` } as CSSProperties}>
                        <div className='slide__content__text'>
                                <h3>
                                    <Trans i18nKey={"MainPage.Sections.Third.Caption"}
                                        components={{
                                            decoratedR: <span className='decorated-R' />,
                                            decoratedA: <span className='decorated-A' />
                                        }} />
                                </h3>
                                <p>{HousingsImageHelper.FlatHInfo.name}</p>
                                <Link
                                    to={`/search?category=categories.flat`} 
                                    className='more'>
                                    {t('MainPage.More')}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='slide'>
                        <div className='slide__content' style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${HousingsImageHelper.HouseHInfo.image}) lightgray 50% / cover no-repeat` } as CSSProperties}>
                            <div className='slide__content__text'>
                                <h3>
                                    <Trans i18nKey={"MainPage.Sections.Third.Caption"}
                                        components={{
                                            decoratedR: <span className='decorated-R' />,
                                            decoratedA: <span className='decorated-A' />
                                        }} />
                                </h3>
                                <p>{HousingsImageHelper.HouseHInfo.name}</p>
                                <Link
                                    to={`/search?category=categories.house`}
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