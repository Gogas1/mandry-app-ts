import { useContext } from "react";
import { useUserSettings } from "../app/UserSettingsContext";
import { Housing } from "../housing/HousingPage"
import AuthContext from "../auth/AuthenticationContext";
import HeartIcon from "./HeartIcon";
import FeatureService from "../../helpers/FeatureService";
import { Link } from "react-router-dom";
import starIcon from '../../assets/icons/meta/star.svg';

interface MapMarkerProps {
    housing: Housing;
    focused: boolean;
}

export default function MapMarker({ housing, focused }: MapMarkerProps) {
    const authContext = useContext(AuthContext);
    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { authState } = authContext;
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
        <div className={`map-section__marker ${focused && 'focused'}`}>
            <div>
                {`${currency} ${housing.pricePerNight}`}
            </div>
            <div className="marker-housing">
                <div className='image-container'>
                    {authState.isAuthenticated && (
                        <HeartIcon filled={housing.isFavourite} className='favourite-icon' onClick={() => makeFavourite(housing.id)} />
                    )}
                    <img
                        className='image'
                        src={housing.images.length > 0 ?
                            FeatureService.getFeatureIcon(housing.images[0].src) :
                            FeatureService.getFeatureIcon("images/features/3.jpg")} />
                </div>
                <div className='labels'>
                    <Link to={`/housing/${housing.id}`} className='labels__name'>
                        {housing.name}
                    </Link>
                    <div className='labels__bottom'>
                        <div className='labels__pricing'>
                            <div className='labels__price'>
                                <div className='labels__actual-price'>
                                    {`${currency} ${housing.pricePerNight} ніч`}
                                </div>
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
        </div>
    )
}