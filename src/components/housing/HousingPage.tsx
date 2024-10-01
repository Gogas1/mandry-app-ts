import { useContext, useEffect, useState } from 'react';
import '../../styles/housing/housing-page.scss';

import heartIcon from '../../assets/icons/meta/heart-empty-grey.svg';
import heartFilledIcon from '../../assets/icons/meta/heart-filled.svg';
import shareIcon from '../../assets/icons/meta/share.svg';
import loadingIcon from '../../assets/anim/loading2.gif';

import { processTranslations, Translation } from '../../helpers/TranslationService';
import { useTranslation } from 'react-i18next';
import ComponentsSection from './sections/ComponentsSection';
import DescriptionSection from './sections/DescriptionSection';
import BedroomsSection from './sections/BedroomsSection';
import FeaturesSection from './sections/FeaturesSection';
import HousingCalendarSection from './sections/HousingCalendarSection';
import { useParams } from 'react-router-dom';
import FeatureService from '../../helpers/FeatureService';
import ImportantInfoSection from './sections/ImportantInfoSection';
import FooterSection from '../home/FooterSection';
import OwnerSection from './sections/OwnerSection';
import PriceSection from './rent/PriceSection';
import { RatingSection } from './rent/RatingSection';
import ReviewSection from './rent/ReviewSection';
// import InlinePopup from '../app/InlinePopup';
import AuthContext from '../auth/AuthenticationContext';
import { LongTermsBenefits } from '../payment/PaymentPage';
import HeartIcon from '../search/HeartIcon';
import { useModal } from '../app/ModalContext';
import ShareModal from '../search/share-modal/ShareModal';
import { useUserSettings } from '../app/UserSettingsContext';

type ProfileInfo = {
    education?: string;
    residence?: string;
    birthdate?: string;
    mainHobby?: string;
    skills?: string;
    timeThings?: string;
    profession?: string;
    languages?: string;
    song?: string;
    fact?: string;
    biography?: string;
    pets?: string;
    aboutMe?: string;
}

export type UserData = {
    id: string,
    name: string,
    surname: string,
    averageRating: number,
    reviewsCount: number,
    ownerFrom: string,
    avatar: Image,
    userAbout?: ProfileInfo
}

type Category = {
    id: string,
    nameKey: string,
    isCategoryPropertyRequired?: boolean,
    categoryPropertyDescriptionKey?: string,

    categoryTranslations: Translation[]
    categoryPropertyTranslations?: Translation[]
}

type Bedroom = {
    beds: Bed[]
}

type Image = {
    id: string,
    src: string,
}

export type Review = {
    creator: UserData,
    rating: number,
    text: string,
    createdAt: string
}

export type Parameter = {
    id: string,
    nameKey: string,
    parameterKey: string,
    defaultValue: string,
    value: string
}

export type Feature = {
    nameCode: string,
    descriptionCode: string,
    typeCode: string,
    featureIcon: Image,
    isHouseRule: boolean,
    isSafetyFeature: boolean

    translations: Translation[],
    parameters: Parameter[]
}

export type Bed = {
    type: string,
    size: number
}

export interface Housing {
    id: string,
    name: string,
    locationCountry: string,
    locationPlace: string,
    category: Category,
    bathrooms: number,
    maxGuests: number,
    description: string;
    shortDescription: string,
    pricePerNight: number,
    averageRating: number,
    reviewsCount: number,
    cleaningFee: number,
    categoryProperty: string,
    isFavourite: boolean,
    locationCoords: string,

    bedrooms: Bedroom[],
    images: Image[],
    features: Feature[],
    availabilities: Date[],
    reviews: Review[]
}

export default function HousingPage() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { authState } = authContext;

    const { updateNavbarWidth } = useUserSettings();
    const { openModal, closeModal } = useModal();
    const { t, ready } = useTranslation();
    const { id } = useParams();

    const [userData, setUserData] = useState<UserData>();
    const [housingData, setHousingData] = useState<Housing>();
    const [loading, setLoading] = useState(true);
    const [dates, setDates] = useState<{ dateOne: Date | undefined, dateTwo: Date | undefined }>({ dateOne: undefined, dateTwo: undefined });

    const [longTermsBenefits, setLongTermsBenefits] = useState(CalculateLongTermsBenefits(dates.dateOne ? dates.dateOne : new Date()));

    useEffect(() => {
        if (!ready) return;
        document.title = t("Titles.HousingLoading");

        const searchHousing = async () => {
            setLoading(true);
            const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + `/housing/get/${id}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                        'Authorization': `Bearer ${authState.token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    const hd = data.housing as Housing;
                    setUserData(data.ownerData)

                    processTranslations(hd.category.categoryTranslations);
                    hd.features.forEach(feature => {
                        processTranslations(feature.translations);
                    });

                    hd.availabilities = hd.availabilities.map(dateStr => new Date(dateStr));

                    setHousingData(hd);
                    setLoading(false);

                    document.title = hd.name;
                }
            }
            catch (error) {
                console.error(error);
                setLoading(false);  // Stop loading on error
            }
        };

        searchHousing();

        updateNavbarWidth(1400);

        return () => {
            updateNavbarWidth(0)
        };
    }, [id, ready]);

    const makeFavourite = async (id: string) => {
        if (authState.isAuthenticated) {
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

    const handleDateChoose = (dateOne: Date | undefined, dateTwo: Date | undefined) => {
        setDates({ dateOne, dateTwo });
        setLongTermsBenefits(CalculateLongTermsBenefits(dateOne ? dateOne : new Date()));
    }

    // const handleUrlCopy = async () => {
    //     try {
    //         const url = window.location.href;
    //         await navigator.clipboard.writeText(url);
    //     }
    //     catch (err) {
    //         console.error('Failed to copy text: ', err);
    //     }
    // }

    const handleShareModalCall = () => {
        if(housingData) {
            openModal('shareModal', 
            <ShareModal housing={housingData} hideModal={() => closeModal('shareModal')} />,
            { minWidth: '590px', maxWidth: '590px'  })
        }
    }

    return (
        <>
            <div className="housing-page">
                <div className='housing-page-content'>
                    {housingData ? (
                        <>
                            <section className='header-section'>
                                <h1 className={`housing-name ${!housingData ? 'loading' : ''}`}>
                                    {housingData ? housingData.name : ''}
                                </h1>
                                <div className='housing-actions'>
                                    <img className='action-icon' src={shareIcon} onClick={handleShareModalCall} />
                                    {authState.isAuthenticated && (
                                        <HeartIcon
                                            filled={housingData ? housingData.isFavourite : false}
                                            onClick={() => makeFavourite(id ? id : '')}
                                            iconFalse={heartIcon}
                                            iconTrue={heartFilledIcon}
                                            className='action-icon' />
                                    )}

                                </div>
                            </section>
                            <section className='housing-images-section'>
                                {housingData ? (
                                    <>
                                        <div className='big-picture-container'>
                                            <div className='big-picture-wrapper'>
                                                <img src={FeatureService.getFeatureIcon(housingData.images[0].src)} />
                                            </div>
                                        </div>
                                        <div className='small-pictures-container'>
                                            {housingData.images.slice(1, housingData.images.length > 4 ? 5 : housingData.images.length - 1).map((image, index) => (
                                                <div className='small-picture-wrapper' key={index}>
                                                    <img src={FeatureService.getFeatureIcon(image.src)} key={index} />
                                                </div>

                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    ''
                                )}

                            </section>
                            <div className='main-section'>
                                <div className='data-section'>
                                    <section className={`location-section ${!housingData ? 'loading' : ''}`}>
                                        {housingData ? (
                                            `${housingData.locationPlace}, ${housingData.locationCountry}: ${t(housingData.category.nameKey)}`
                                        ) : (
                                            1
                                        )}
                                    </section>
                                    {housingData && !loading && ready ? (
                                        <>
                                            <ComponentsSection housingData={housingData} />
                                            <DescriptionSection housingData={housingData} />
                                            <hr className='divider' />
                                            <BedroomsSection housingData={housingData} />
                                            <hr className='divider' />
                                            <FeaturesSection housingData={housingData} />
                                            <hr className='divider' />
                                            <HousingCalendarSection onChange={handleDateChoose} housingData={housingData} />
                                            <hr className='divider' />
                                            <ImportantInfoSection housingData={housingData} longTermBenefits={longTermsBenefits} />

                                        </>
                                    ) : ''}

                                </div>
                                <div className='rent-section'>
                                    {housingData && id && userData ? (
                                        <>
                                            <PriceSection
                                                selecetedDates={{ dateOne: dates?.dateOne, dateTwo: dates?.dateTwo }}
                                                price={housingData.pricePerNight}
                                                housingData={housingData}
                                                ownerData={userData}
                                                id={id} />
                                            <RatingSection housingData={housingData} />
                                            <ReviewSection reviews={housingData.reviews} />
                                        </>

                                    ) : ''}

                                </div>
                            </div>
                            {userData ? (
                                <OwnerSection userData={userData} />
                            ) : ''}
                        </>
                    ) : (
                        <section className='loading-section'>
                            <img src={loadingIcon} />
                        </section>
                    )}

                </div>
                <FooterSection className='housing-footer' />
            </div>
        </>
    );
}

// function getRandomDateWithinYear(year: number): Date {
//     // Randomly select a month (1-12), and convert to 0-based for Date constructor
//     const month = Math.floor(Math.random() * 12);

//     // Get the number of days in the randomly chosen month
//     const daysInMonth = new Date(year, month + 1, 0).getDate();

//     // Randomly select a day within the chosen month
//     const day = Math.floor(Math.random() * daysInMonth) + 1;

//     // Return the random date
//     return new Date(year, month, day);
//   }

// function generateRandomDatesArrayForYear(year: number, count: number): Date[] {
//     const randomDates: Date[] = [];

//     for (let i = 0; i < count; i++) {
//       randomDates.push(getRandomDateWithinYear(year));
//     }

//     return randomDates;
// }

function CalculateLongTermsBenefits(targetDate: Date): LongTermsBenefits {
    const today = new Date();
    const timeDifference = targetDate.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference > 31) {
        return {
            fullReturnAvailable: true,
            halfReturnDate: new Date(targetDate.getTime() - 7 * 24 * 60 * 60 * 1000),
            secondPaymentDate: new Date(targetDate.getTime() - 14 * 24 * 60 * 60 * 1000)
        };
    } else if (daysDifference > 7) {
        return {
            fullReturnAvailable: false,
            halfReturnDate: new Date(targetDate.getTime() - 7 * 24 * 60 * 60 * 1000),
            secondPaymentDate: null
        };
    } else {
        return {
            fullReturnAvailable: false,
            halfReturnDate: targetDate,
            secondPaymentDate: null
        };
    }
}