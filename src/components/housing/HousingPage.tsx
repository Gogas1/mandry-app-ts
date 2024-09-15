import { useEffect, useState } from 'react';
import '../../styles/housing/housing-page.scss';

import heartIcon from '../../assets/icons/meta/heart-empty-grey.svg';
import shareIcon from '../../assets/icons/meta/share.svg';

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
import InlinePopup from '../app/InlinePopup';

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

    bedrooms: Bedroom[],
    images: Image[],
    features: Feature[],
    availableDates: Date[],
    reviews: Review[]
}

export default function HousingPage() {
    const { t, ready } = useTranslation();
    const { id } = useParams();

    const [userData, setUserData] = useState<UserData>();
    const [housingData, setHousingData] = useState<Housing>();
    const [loading, setLoading] = useState(true);
    const [dates, setDates] = useState<{dateOne: Date | undefined, dateTwo: Date | undefined}>();

    useEffect(() => {
        if (!ready) return; 

        const searchHousing = async () => {
            setLoading(true);            
            const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + `/housing/get/${id}`;
    
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
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

                    setHousingData(hd);
                    setLoading(false);
                }
            }
            catch (error) {
                console.error(error);
                setLoading(false);  // Stop loading on error
            }
        };

        searchHousing();
    }, [id, ready]);

    
    const handleDateChoose = (dateOne: Date | undefined, dateTwo: Date | undefined) => {
        setDates({dateOne, dateTwo});
    }

    const handleUrlCopy = async () => {
        try {
            const url = window.location.href;
            await navigator.clipboard.writeText(url);
        }
        catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    return (
        <>
            <div className="housing-page">
                <div className='housing-page-content'>
                    <section className='header-section'>
                        <h1 className={`housing-name ${!housingData ? 'loading' : ''}`}>
                            {housingData ? housingData.name : ''}
                        </h1>
                        <div className='housing-actions'>
                            <InlinePopup popupContent={t('HousingPage.Copied')}>
                                <img className='action-icon' src={shareIcon} onClick={handleUrlCopy} />
                            </InlinePopup>
                            <img className='action-icon' src={heartIcon} />
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
                                    <ImportantInfoSection housingData={housingData} />
                                                                       
                                </>
                            ) : ''}
                            
                        </div>
                        <div className='rent-section'>
                            {housingData ? (
                                <>
                                    <PriceSection 
                                        selecetedDates={{dateOne: dates?.dateOne, dateTwo: dates?.dateTwo}}
                                        price={housingData.pricePerNight}
                                        housingData={housingData} />
                                    <RatingSection housingData={housingData} />
                                    <ReviewSection reviews={housingData.reviews} />
                                </>
                                
                            ) : ''}
                            
                        </div>
                    </div>
                    {userData ? (
                        <OwnerSection userData={userData} />
                    ) : ''}                    
                </div>
                <FooterSection />
            </div>
        </>
    );
}

function getRandomDateWithinYear(year: number): Date {
    // Randomly select a month (1-12), and convert to 0-based for Date constructor
    const month = Math.floor(Math.random() * 12);
  
    // Get the number of days in the randomly chosen month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    // Randomly select a day within the chosen month
    const day = Math.floor(Math.random() * daysInMonth) + 1;
  
    // Return the random date
    return new Date(year, month, day);
  }
  
function generateRandomDatesArrayForYear(year: number, count: number): Date[] {
    const randomDates: Date[] = [];
  
    for (let i = 0; i < count; i++) {
      randomDates.push(getRandomDateWithinYear(year));
    }
  
    return randomDates;
}