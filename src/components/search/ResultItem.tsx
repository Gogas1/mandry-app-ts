import { useContext, useState } from "react";
import AuthContext from "../auth/AuthenticationContext";
import { Housing } from "../housing/HousingPage";
import HeartIcon from "./HeartIcon";
import FeatureService from "../../helpers/FeatureService";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserSettings } from "../app/UserSettingsContext";

import arrowIcon from '../../assets/icons/meta/arrow.svg';
import starIcon from '../../assets/icons/meta/star.svg';
import shareIcon from '../../assets/icons/meta/share.svg';

interface ResultItemProps {
    housing: Housing
    makeFavouriteHandler: (id: string) => void;
}

export default function ResultItem({ housing, makeFavouriteHandler }: ResultItemProps) {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { t } = useTranslation();
    const { currency } = useUserSettings();
    const { authState } = authContext;

    const [activeIndex, setActiveIndex] = useState<number>(0);
    
    const handleSwitch = (index: number) => {
        setActiveIndex(index);
    };

    const handleImageSwithBack = () => {
        if(activeIndex != 0) {
            setActiveIndex(activeIndex - 1);
        }
    }

    const handleImageSwitchForward = () => {
        if(activeIndex != housing.images.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
    }

    return (
        <>
            <div className="search-item-wrapper">
                <div className='search-item-border'></div>
                <div className='search-item-content'>
                    <div className='image-container'>
                        {authState.isAuthenticated && (
                            <HeartIcon filled={housing.isFavourite} className='favourite-icon' onClick={() => makeFavouriteHandler(housing.id)} />
                        )}
                        <div
                            className="image"
                            style={{ background: `${housing.images.length > 0 ?
                             `url(${FeatureService.getFeatureIcon(housing.images[activeIndex].src)}) lightgray -0.058px -75.229px / 100.046% 152.818% no-repeat` : 
                             `url(${FeatureService.getFeatureIcon("images/features/3.jpg")}) lightgray -0.058px -75.229px / 100.046% 152.818% no-repeat`}` }}>

                        </div>
                        {/* <img
                            className='image'
                            src={housing.images.length > 0 ?
                                FeatureService.getFeatureIcon(housing.images[0].src) :
                                FeatureService.getFeatureIcon("images/features/3.jpg")} /> */}
                        <div className="item-switcher-container">
                            <div className="item-switcher">
                                {/* Dots */}
                                <div className="dots">
                                    {Array.from({ length: housing.images.length }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="dot"
                                        onClick={() => handleSwitch(index)}
                                        style={{
                                            transform: `${activeIndex > index ? `translateX(-14.5px)` : ''}`, // Adjust based on dot spacing
                                        }}
                                    ></div>
                                    ))}
                                </div>

                                {/* Slider */}
                                <div className="slider-container">
                                    <div
                                    className="slider"
                                    style={{
                                        transform: `translateX(${activeIndex * 7.5 - 13}px)`, // Adjust based on dot spacing
                                    }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        {activeIndex > 0 && (
                            <button className="switch-button switch-button--left" onClick={handleImageSwithBack}>
                                <img src={arrowIcon} />
                            </button>
                        )}
                        {activeIndex < housing.images.length - 1 && (
                            <button className="switch-button switch-button--right" onClick={handleImageSwitchForward}>
                                <img src={arrowIcon} />
                            </button>
                        )}
                    </div>
                    <div className='labels'>
                        <Link to={`/housing/${housing.id}`} className='labels__name'>
                            {housing.name}
                        </Link>
                        <label className='labels__description'>{housing.categoryProperty}</label>
                        <label className='labels__beds'>
                            {t('SearchPage.SearchResult.Bedrooms',
                                {
                                    count: housing.bedrooms.length,
                                    number: housing.bedrooms.length
                                })}
                        </label>
                        <div className='labels__bottom'>
                            <div className='labels__pricing'>
                                <div className='labels__price'>
                                    <div className='labels__actual-price'>
                                        {`${currency} ${housing.pricePerNight} ніч`}
                                    </div>
                                </div>
                                <div className='labels__calculated-price'>
                                    {`Усього: ${currency} ${housing.pricePerNight}`}
                                </div>
                            </div>
                            <div className='labels__rating-wrapper'>
                                <div className='rating'>
                                    <img src={starIcon} className='star' />
                                    <div className='average-rating'>{housing.averageRating} ({housing.reviewsCount})</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <button className='share-button'>
                    <img src={shareIcon} />
                </button>
            </div>
        </>
    );
}