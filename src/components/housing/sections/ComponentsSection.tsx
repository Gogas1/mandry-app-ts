import { useTranslation } from "react-i18next";
import { Housing } from "../HousingPage";

import '../../../styles/housing/sections/components-section.scss';

interface ComponentsSectionProps {
    housingData: Housing
    className?: string
}

export default function ComponentsSection({ housingData, className='' }: ComponentsSectionProps) {
    const { t } = useTranslation();

    

    return (
        <>
            <section className={`components-section ${className}`}>
                <div className="component">
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16" fill="none">
                        <path d="M23 15.3807C23 15.3807 23 14.7546 23 13.8806M23 9.88067H1M23 9.88067C23 11.0348 23 12.6883 23 13.8806M23 9.88067C23 8.66749 22.2134 7.9349 21 7.49549M1 9.88067C1.00007 11.0348 1.00006 12.6883 1.00004 13.8806M1 9.88067C0.99992 8.55496 1.93923 7.80313 3.34829 7.38063M1 15.3807C1 15.3807 1.00002 14.7546 1.00004 13.8806M1.00004 13.8806H23M3.34829 7.38063V2.61926C3.34829 1.51469 4.24372 0.619263 5.34829 0.619263H19C20.1046 0.619263 21 1.51469 21 2.61926V7.49549M3.34829 7.38063C4.16538 7.13564 5.14044 7.00138 6.18187 6.93019M21 7.49549C20.1635 7.19256 19.1242 7.02898 18 6.94333M6.18187 6.93019V4.61954C6.18187 4.06725 6.62959 3.61954 7.18187 3.61954H9.5C10.0523 3.61954 10.5 4.06725 10.5 4.61954V6.8689M6.18187 6.93019C7.57554 6.83492 9.08808 6.85259 10.5 6.8689M10.5 6.8689C11.0171 6.87488 11.5207 6.88067 12 6.88067C12.4793 6.88067 12.9829 6.87488 13.5 6.8689M13.5 6.8689V4.61954C13.5 4.06725 13.9477 3.61954 14.5 3.61954H17C17.5523 3.61954 18 4.06725 18 4.61954V6.94333M13.5 6.8689C14.9736 6.85187 16.5567 6.83337 18 6.94333" stroke="#515151" strokeLinecap="round"/>
                    </svg>
                    <div>
                        {t('HousingPage.Sections.Components.BedroomsNumbered', { count: housingData.bedrooms.length, number: housingData.bedrooms.length })}
                    </div>
                </div>
                <div className="component">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21.5 14.25V16.75C21.5 18.683 19.933 20.25 18 20.25V20.25M21.5 14.25H2.5M21.5 14.25V14.25C22.3284 14.25 23 13.5784 23 12.75V12.75C23 11.9216 22.3284 11.25 21.5 11.25H20.5M2.5 14.25V16.75C2.5 18.683 4.067 20.25 6 20.25V20.25M2.5 14.25V14.25C1.67157 14.25 1 13.5784 1 12.75V12.75C1 11.9216 1.67157 11.25 2.5 11.25H20.5M6 20.25L4.5 22.75M6 20.25H18M18 20.25L20 22.75M20.5 11.25V2.45C20.5 1.78726 19.9627 1.25 19.3 1.25H16.7C16.0373 1.25 15.5 1.78726 15.5 2.45V3.75M15.5 3.75V3.75C16.8807 3.75 18 4.86929 18 6.25V7.05C18 7.16046 17.9105 7.25 17.8 7.25H13.2C13.0895 7.25 13 7.16046 13 7.05V6.25C13 4.86929 14.1193 3.75 15.5 3.75V3.75Z" stroke="#515151" strokeLinecap="round"/>
                    </svg>
                    <div>
                        {t('HousingPage.Sections.Components.BathroomsNumbered', { count: housingData.bathrooms, number: housingData.bathrooms })}
                    </div>
                </div>
                <div className="component">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                        <path d="M15.4438 12.4106C16.7626 13.0607 17.8932 14.104 18.7185 15.4086C18.8819 15.6669 18.9636 15.7961 18.9919 15.975C19.0493 16.3385 18.796 16.7854 18.451 16.9292C18.2812 17 18.0902 17 17.7083 17M13.6322 8.58421C14.9744 7.92968 15.8967 6.57054 15.8967 5C15.8967 3.42946 14.9744 2.07032 13.6322 1.41579M11.8207 5C11.8207 7.20914 9.99576 9 7.74462 9C5.49348 9 3.66857 7.20914 3.66857 5C3.66857 2.79086 5.49348 1 7.74462 1C9.99576 1 11.8207 2.79086 11.8207 5ZM1.45775 15.1674C2.90185 13.0396 5.18067 11.6667 7.74462 11.6667C10.3086 11.6667 12.5874 13.0396 14.0315 15.1674C14.3479 15.6336 14.506 15.8666 14.4878 16.1644C14.4736 16.3962 14.3188 16.68 14.13 16.8201C13.8876 17 13.5542 17 12.8874 17H2.60187C1.93504 17 1.60163 17 1.3592 16.8201C1.17045 16.68 1.01559 16.3962 1.00141 16.1644C0.983202 15.8666 1.14138 15.6336 1.45775 15.1674Z" stroke="#515151" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                        {t('HousingPage.Sections.Components.GuestsNumbered', { count: housingData.maxGuests, number: housingData.maxGuests })}
                    </div>
                </div>
            </section>
        </>
    );
}