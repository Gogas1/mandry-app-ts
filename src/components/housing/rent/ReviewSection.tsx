import { Review } from "../HousingPage";

import '../../../styles/housing/rent/review-section.scss';

import starIcon from '../../../assets/icons/meta/star.svg';
import avatarPlaceholder from '../../../assets/icons/profile/user-circle-stroke-rounded 1.svg';
import { ImageHelper } from "../../../helpers/ImageHelper";

interface ReviewSectionProps {
    reviews: Review[]
}

export default function ReviewSection({ reviews }: ReviewSectionProps) {
    return (
        <>        
            <section className="review-section">
                {reviews.map((review, index) => (
                    <div className="review">
                        <div className="meta-part">
                            <div className="avatar">
                                <img src={review.creator.avatar ? ImageHelper.getAvatarImage(review.creator.avatar.src) : avatarPlaceholder} />
                            </div>
                            <div className="info">
                                <div className="name">{`${review.creator.name} ${review.creator.surname}`}</div>                                
                                <hr className="divider" />
                                <div className="date">{formatDate(review.createdAt)}</div>
                                <div className="stars">
                                    {Array.from({ length: Math.floor(review.rating < 1 ? 1 : review.rating) }, (_, index) => (
                                        <img src={starIcon} />
                                    ) )}
                                </div>
                            </div>
                        </div>
                        <div className="text-part">
                            {review.text}
                        </div>
                    </div>
                ))}
                
            </section>
        </>
    );
}

function formatDate(dateString: string): string {
    const dateInput = new Date(dateString);

    const isValidDate = (date: Date) => !isNaN(date.getTime()) || dateString === '0001-01-01T00:00:00';

    // Use the input date if it's valid, otherwise use the current date
    const date = isValidDate(dateInput) ? dateInput : new Date();

    // Use the browser's default locale setting by omitting the locale argument
    return date.toLocaleString(undefined, { month: 'long', year: 'numeric' });
}