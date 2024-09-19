import '../../styles/search/result-panel.scss';

import starIcon from '../../assets/icons/meta/star.svg';
import shareIcon from '../../assets/icons/meta/share.svg';
import heartEmptyIcon from '../../assets/icons/meta/heart-icon-2.svg';
import heartFilledIcon from '../../assets/icons/meta/heart-icon-filled-2.svg';

import { Link } from 'react-router-dom';
import { Housing } from '../housing/HousingPage';
import FeatureService from '../../helpers/FeatureService';
import { Category } from './search-panel/Section2';
import { useTranslation } from 'react-i18next';
import { useUserSettings } from '../app/UserSettingsContext';
import HeartIcon from './HeartIcon';
import { useContext } from 'react';
import AuthContext from '../auth/AuthenticationContext';

export interface HousingResultItem {
    image: string;
    name: string;
    description: string;
    beds: number;
    price: string;
    discountPrice?: string;
    totalPrice: string;
    averageRating: string;
    category: Category;
    reviews: number;
}

interface ResultPanelProps {
    housings: Housing[]
}

export default function ResultPanel({ housings }: ResultPanelProps) {
    const authContext = useContext(AuthContext);
    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { authState } = authContext;

    const { t } = useTranslation();
    const { currency } = useUserSettings();

    const makeFavourite = async (id: string) => {
        if(authState.isAuthenticated) {
            const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + `/favourites/make?housing=${id}`;

            try {
                await fetch(url, {
                    method: 'POST',
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                        'Authorization': `Bearer ${authState.token}`
                    }
                });
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <section className="result-section">
            {housings.map((housing, index) => (
                <div className="search-item-wrapper" key={index}>
                    <div className='search-item-border'></div>
                    <div className='search-item-content'>
                        <div className='image-container'>
                            {authState.isAuthenticated && (
                                <HeartIcon filled={housing.isFavourite} className='favourite-icon' onClick={() => makeFavourite(housing.id)} />
                            )}
                            <img className='image' src={FeatureService.getFeatureIcon("images/features/3.jpg")} />
                        </div>
                        <div className='labels'>
                            {/* <label className='labels__name'>
                                {housing.name}
                            </label> */}
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
                                        <img src={starIcon} className='star'/>
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
            ))}
            
            
        </section>
    );
}