import '../../styles/search/result-panel.scss';

import starIcon from '../../assets/icons/meta/star.svg';

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

export default function ResultPanel() {
    return (
        <section className="result-section">
            <div className="search-item-wrapper">
                <div className='search-item-content'>
                    <div className='image-container'>
                        <img className='image' src='https://via.placeholder.com/150' />
                    </div>
                    <div className='labels'>
                        <label className='labels__name'>Квартира</label>
                        <label className='labels__description'>Яскрава квартира</label>
                        <label className='labels__beds'>1 ліжко</label>
                        <div className='labels__bottom'>
                            <div className='labels__pricing'>
                                <div className='labels__price'>
                                    <div className='labels__promo-price'>
                                        $ 68
                                    </div>
                                    <div className='labels__actual-price'>
                                        $ 68 ніч
                                    </div>
                                </div>
                                <div className='labels__calculated-price'>
                                    Усього: $ 202
                                </div>
                            </div>
                            <div className='labels__rating-wrapper'>
                                <div className='rating'>
                                    <img src={starIcon} className='star'/>
                                    <div className='average-rating'>4.69 (111)</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    );
}