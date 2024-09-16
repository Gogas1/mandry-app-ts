import '../../styles/search/result-panel.scss';

import starIcon from '../../assets/icons/meta/star.svg';
import shareIcon from '../../assets/icons/meta/share.svg';

import { Link } from 'react-router-dom';
import { Housing } from '../housing/HousingPage';
import FeatureService from '../../helpers/FeatureService';
import { Category } from './search-panel/Section2';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    return (
        <section className="result-section">
            {housings.map((housing, index) => (
                <div className="search-item-wrapper" key={index}>
                    <div className='search-item-border'></div>
                    <div className='search-item-content'>
                        <Link to={`/housing/${housing.id}`} className='image-container'>
                            <img className='image' src={FeatureService.getFeatureIcon("images/features/3.jpg")} />
                        </Link>
                        <div className='labels'>
                            <label className='labels__name'>{housing.name}</label>
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
                                        {/* <div className='labels__promo-price'>
                                            $ 68
                                        </div> */}
                                        <div className='labels__actual-price'>
                                            {`$ ${housing.pricePerNight} ніч`}
                                        </div>
                                    </div>
                                    <div className='labels__calculated-price'>
                                        {`Усього: $ ${housing.pricePerNight}`}
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