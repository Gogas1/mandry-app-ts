import { Link } from "react-router-dom";
import '../../../styles/housing/sections/owner-section.scss'

import avatarPlaceholder from '../../../assets/icons/profile/user-circle-stroke-rounded 1.svg';

import languageIcon from '../../../assets/icons/profile/info/language.svg';
import locationIcon from '../../../assets/icons/profile/info/location.svg';
import { UserData } from "../HousingPage";
import { useTranslation } from "react-i18next";

interface OwnerSectionProps {
    userData: UserData
}

export default function OwnerSection({ userData }: OwnerSectionProps) {
    const { t } = useTranslation();

    return (
        <section className="owner-section">
            <div className="profile-info">
                <div className="profile-card">
                    <img className="profile-image" src={userData.avatar ? userData.avatar.src : avatarPlaceholder} />
                    <p className="profile-name">{`${userData.name} ${userData.surname}`}</p>
                    <p className="profile-status">{t('HousingPage.Sections.OwnerInfo.OwnerStatus')}</p>
                </div>
                <div className="profile-numbers">
                    <div className="numbers-item">
                        <p className="numbers-item__header">{t('HousingPage.Sections.OwnerInfo.ReviewsLabel')}</p>
                        <p className="numbers-item__value">{userData.reviewsCount}</p>
                    </div>
                    <div className="numbers-item">
                        <p className="numbers-item__header">{t('HousingPage.Sections.OwnerInfo.RatingLabel')}</p>
                        <p className="numbers-item__value">{userData.averageRating}</p>
                    </div>
                    <div className="numbers-item">
                        <p className="numbers-item__header">{t('HousingPage.Sections.OwnerInfo.OwnerFromLabel')}</p>
                        <p className="numbers-item__value">{getDateDifference(userData.ownerFrom)}</p>
                    </div>
                </div>
            </div>
            <div className="about-data">
                <div className="upper-data">
                    <div className="data-1">
                        <div className="about">
                            <div className="about__label">
                                <img src={languageIcon} />
                                {userData.userAbout ? userData.userAbout.languages : t('HousingPage.Sections.OwnerInfo.LanguagesNotSpecified')}
                            </div>
                            <hr className="about-divider" />
                            <div className="about__label">
                                <img src={locationIcon} />
                                {userData.userAbout ? userData.userAbout.residence : t('HousingPage.Sections.OwnerInfo.ResidenceNotSpecified')}
                            </div>
                        </div>
                        <div className="about-response">
                            <p>{t('HousingPage.Sections.OwnerInfo.ResponseSpeed', { time: "100%" })}</p>
                            <p>{t('HousingPage.Sections.OwnerInfo.ResponseTime')}</p>
                        </div>
                    </div>
                    <div className="data-2">
                        {userData.userAbout ? userData.userAbout.aboutMe : t('HousingPage.Sections.OwnerInfo.AboutMeNotSpecified')}
                        <Link to={'/'} className="link">{t('HousingPage.Sections.OwnerInfo.More')}</Link>
                    </div>
                </div>
                <div className="bottom-data">
                    <Link to={'/'} className="link-button">{t('HousingPage.Sections.OwnerInfo.TextToOwner')}</Link>
                </div>
            </div>
        </section>
    );
}

function getDateDifference(dateString: string): number {
    const date = new Date(dateString);

    if (isNaN(date.getTime()) || dateString === '0001-01-01T00:00:00') {
        return 0;
    }
    
    const now = new Date();
    const diffYears = now.getFullYear() - date.getFullYear();
    
    const isBefore = now.getMonth() < date.getMonth() || 
                     (now.getMonth() === date.getMonth() && now.getDate() < date.getDate());

    return isBefore ? diffYears - 1 : diffYears;
};