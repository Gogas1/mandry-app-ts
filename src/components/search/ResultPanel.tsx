import '../../styles/search/result-panel.scss';

import starIcon from '../../assets/icons/meta/star.svg';
import { Link } from 'react-router-dom';
import { Housing } from '../housing/HousingPage';
import FeatureService from '../../helpers/FeatureService';

export interface HousingResultItem {
    image: string;
    name: string;
    description: string;
    beds: number;
    price: string;
    discountPrice?: string;
    totalPrice: string;
    averageRating: string;
    reviews: number;
}

interface ResultPanelProps {
    housings: Housing[]
}

export default function ResultPanel({ housings }: ResultPanelProps) {
    return (
        <section className="result-section">
            {housings.map((housing, index) => (
                <div className="search-item-wrapper" key={index}>
                <div className='search-item-content'>
                    <Link to={`/housing/${housing.id}`} className='image-container'>
                        <img className='image' src={FeatureService.getFeatureIcon("images/features/3.jpg")} />
                    </Link>
                    <div className='labels'>
                        <label className='labels__name'>{housing.name}</label>
                        {/* <label className='labels__description'></label> */}
                        <label className='labels__beds'>{`${housing.bedrooms.length} спалень`}</label>
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
                                    <div className='average-rating'>0 (0)</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))}
            
            
        </section>
    );
}