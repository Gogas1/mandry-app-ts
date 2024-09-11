import '../../../styles/housing/rent/rating-section.scss';

import starIcon from '../../../assets/icons/meta/star.svg';
import { Housing } from '../HousingPage';
import { useTranslation } from 'react-i18next';

interface RatingSectionProps {
    housingData: Housing
}

export function RatingSection({ housingData }: RatingSectionProps) {
    const { t } = useTranslation();

    return (
        <>
            <section className="rating-section">
                <img src={starIcon} />
                {`${housingData.averageRating.toFixed(2)} ~ ${t('HousingPage.RentSections.Rating.ReviewsCount', 
                    { number: housingData.reviewsCount,
                        count: housingData.reviewsCount
                     })}`}            
            </section>
        </>
    );
}