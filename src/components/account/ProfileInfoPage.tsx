import { Link } from 'react-router-dom';

import personIcon from '../../assets/icons/profile/user-circle-stroke-rounded 1.svg';

import '../../styles/account/profile/profile-info-page.scss';

import balloonIcon from '../../assets/icons/profile/info/baloon.svg';
import bookIcon from '../../assets/icons/profile/info/book.svg';
import caseIcon from '../../assets/icons/profile/info/case.svg';
import clockIcon from '../../assets/icons/profile/info/clock.svg';
import globusIcon from '../../assets/icons/profile/info/globus.svg';
import hatIcon from '../../assets/icons/profile/info/hat.svg';
import heartIcon from '../../assets/icons/profile/info/heart.svg';
import languageIcon from '../../assets/icons/profile/info/language.svg';
import lightbulbIcon from '../../assets/icons/profile/info/lightbulb.svg';
import noteIcon from '../../assets/icons/profile/info/note.svg';
import pawIcon from '../../assets/icons/profile/info/paw.svg';
import wandIcon from '../../assets/icons/profile/info/wand.svg';
import TextInputBorderless from '../app/Fields/TextInputBorderless';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useModal } from '../app/ModalContext';
import TextPromptModal from './modals/TextPromptModal';

interface ProfileInfo {
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
}

export default function ProfileInfoPage() {
    const { t } = useTranslation();

    const [profileInfo, setProfileInfo] = useState<ProfileInfo>(
        { 
            education: '',
            residence: '',
            birthdate: '',
            mainHobby: '',
            skills: '',
            timeThings: '',
            profession: '',
            languages: '',
            song: '',
            fact: '',
            biography: '',
            pets: ''
        } as ProfileInfo);
    
    const { openModal, closeModal } = useModal();

    {

    }

    const handleEducationModalOpening = () => {
        const handleClose = () => closeModal('info-modal');
        openModal("info-modal", 
        <TextPromptModal 
            header={t('ProfileInfo.Info.Education.Modal.Header')} 
            bodyText={t('ProfileInfo.Info.Education.Modal.Body')}
            closeModal={handleClose}
            valueHandler={handleEducationValueSetting} />);

        console.log(profileInfo);
    }

    const handleEducationValueSetting = (value: string) => {
        console.log(value);
        setProfileInfo({ 
            education: value,
            residence: profileInfo.residence,
            birthdate: profileInfo.birthdate,
            mainHobby: profileInfo.mainHobby,
            skills: profileInfo.skills,
            timeThings: profileInfo.timeThings,
            profession: profileInfo.profession,
            languages: profileInfo.languages,
            song: profileInfo.song,
            fact: profileInfo.fact,
            biography: profileInfo.biography,
            pets: profileInfo.pets
        } as ProfileInfo);
    }

    const handleResidenceModalOpening = () => {
        const handleClose = () => closeModal('info-modal');
        openModal("info-modal", 
        <TextPromptModal 
            header={t('ProfileInfo.Info.ResidencePlace.Modal.Header')} 
            bodyText={t('ProfileInfo.Info.ResidencePlace.Modal.Body')}
            closeModal={handleClose}
            valueHandler={handleResidenceValueSetting} />);
    }

    const handleResidenceValueSetting = (value: string) => {
        setProfileInfo({ 
            education: profileInfo.education,
            residence: value,
            birthdate: profileInfo.birthdate,
            mainHobby: profileInfo.mainHobby,
            skills: profileInfo.skills,
            timeThings: profileInfo.timeThings,
            profession: profileInfo.profession,
            languages: profileInfo.languages,
            song: profileInfo.song,
            fact: profileInfo.fact,
            biography: profileInfo.biography,
            pets: profileInfo.pets
        } as ProfileInfo);
    }

    const handleBirthdateModalOpening = () => {
        const handleClose = () => closeModal('info-modal');
        openModal("info-modal", 
        <TextPromptModal 
            header={t('ProfileInfo.Info.Birthdate.Modal.Header')} 
            bodyText={t('ProfileInfo.Info.Birthdate.Modal.Body')}
            closeModal={handleClose}
            valueHandler={handleBirthdateValueSetting} />);
    }

    const handleBirthdateValueSetting = (value: string) => {
        setProfileInfo({ 
            education: profileInfo.education,
            residence: profileInfo.residence,
            birthdate: value,
            mainHobby: profileInfo.mainHobby,
            skills: profileInfo.skills,
            timeThings: profileInfo.timeThings,
            profession: profileInfo.profession,
            languages: profileInfo.languages,
            song: profileInfo.song,
            fact: profileInfo.fact,
            biography: profileInfo.biography,
            pets: profileInfo.pets
        } as ProfileInfo);
    }

    const handleMainhobbyModalOpening = () => {
        const handleClose = () => closeModal('info-modal');
        openModal("info-modal", 
        <TextPromptModal 
            header={t('ProfileInfo.Info.MainHobby.Modal.Header')} 
            bodyText={t('ProfileInfo.Info.MainHobby.Modal.Body')}
            closeModal={handleClose}
            valueHandler={handleMainhobbyValueSetting} />);
    }

    const handleMainhobbyValueSetting = (value: string) => {
        setProfileInfo({ 
            education: profileInfo.education,
            residence: profileInfo.mainHobby,
            birthdate: profileInfo.birthdate,
            mainHobby: value,
            skills: profileInfo.skills,
            timeThings: profileInfo.timeThings,
            profession: profileInfo.profession,
            languages: profileInfo.languages,
            song: profileInfo.song,
            fact: profileInfo.fact,
            biography: profileInfo.biography,
            pets: profileInfo.pets
        } as ProfileInfo);
    }

    const handleSkillsModalOpening = () => {
        const handleClose = () => closeModal('info-modal');
        openModal("info-modal", 
        <TextPromptModal 
            header={t('ProfileInfo.Info.Skills.Modal.Header')} 
            bodyText={t('ProfileInfo.Info.Skills.Modal.Body')}
            closeModal={handleClose}
            valueHandler={handleSkillsValueSetting} />);
    }

    const handleSkillsValueSetting = (value: string) => {
        setProfileInfo({ 
            education: profileInfo.education,
            residence: profileInfo.residence,
            birthdate: profileInfo.birthdate,
            mainHobby: profileInfo.mainHobby,
            skills: value,
            timeThings: profileInfo.timeThings,
            profession: profileInfo.profession,
            languages: profileInfo.languages,
            song: profileInfo.song,
            fact: profileInfo.fact,
            biography: profileInfo.biography,
            pets: profileInfo.pets
        } as ProfileInfo);
    }

    const handleTimeThingsModalOpening = () => {
        const handleClose = () => closeModal('info-modal');
        openModal("info-modal", 
        <TextPromptModal 
            header={t('ProfileInfo.Info.SpendTimeThings.Modal.Header')} 
            bodyText={t('ProfileInfo.Info.SpendTimeThings.Modal.Body')}
            closeModal={handleClose}
            valueHandler={handleTimeThingsValueSetting} />);
    }

    const handleTimeThingsValueSetting = (value: string) => {
        setProfileInfo({ 
            education: profileInfo.education,
            residence: profileInfo.residence,
            birthdate: profileInfo.birthdate,
            mainHobby: profileInfo.mainHobby,
            skills: profileInfo.skills,
            timeThings: value,
            profession: profileInfo.profession,
            languages: profileInfo.languages,
            song: profileInfo.song,
            fact: profileInfo.fact,
            biography: profileInfo.biography,
            pets: profileInfo.pets
        } as ProfileInfo);
    }

    const handleProfessionModalOpening = () => {
        const handleClose = () => closeModal('info-modal');
        openModal("info-modal", 
        <TextPromptModal 
            header={t('ProfileInfo.Info.Profession.Modal.Header')} 
            bodyText={t('ProfileInfo.Info.Profession.Modal.Body')}
            closeModal={handleClose}
            valueHandler={handleProfessionValueSetting} />);
    }

    const handleProfessionValueSetting = (value: string) => {
        setProfileInfo({ 
            education: profileInfo.education,
            residence: profileInfo.residence,
            birthdate: profileInfo.birthdate,
            mainHobby: profileInfo.mainHobby,
            skills: profileInfo.skills,
            timeThings: profileInfo.timeThings,
            profession: value,
            languages: profileInfo.languages,
            song: profileInfo.song,
            fact: profileInfo.fact,
            biography: profileInfo.biography,
            pets: profileInfo.pets
        } as ProfileInfo);
    }

    const handleLanguagesModalOpening = () => {
        const handleClose = () => closeModal('info-modal');
        openModal("info-modal", 
        <TextPromptModal 
            header={t('ProfileInfo.Info.Languages.Modal.Header')} 
            bodyText={t('ProfileInfo.Info.Languages.Modal.Body')}
            closeModal={handleClose}
            valueHandler={handleLanguagesValueSetting} />);
    }

    const handleLanguagesValueSetting = (value: string) => {
        setProfileInfo({ 
            education: profileInfo.education,
            residence: profileInfo.residence,
            birthdate: profileInfo.birthdate,
            mainHobby: profileInfo.mainHobby,
            skills: profileInfo.skills,
            timeThings: profileInfo.timeThings,
            profession: profileInfo.profession,
            languages: value,
            song: profileInfo.song,
            fact: profileInfo.fact,
            biography: profileInfo.biography,
            pets: profileInfo.pets
        } as ProfileInfo);
    }

    const handleSongModalOpening = () => {
        const handleClose = () => closeModal('info-modal');
        openModal("info-modal", 
        <TextPromptModal 
            header={t('ProfileInfo.Info.Song.Modal.Header')} 
            bodyText={t('ProfileInfo.Info.Song.Modal.Body')}
            closeModal={handleClose}
            valueHandler={handleSongValueSetting} />);
    }

    const handleSongValueSetting = (value: string) => {
        setProfileInfo({ 
            education: profileInfo.education,
            residence: profileInfo.residence,
            birthdate: profileInfo.birthdate,
            mainHobby: profileInfo.mainHobby,
            skills: profileInfo.skills,
            timeThings: profileInfo.timeThings,
            profession: profileInfo.profession,
            languages: profileInfo.languages,
            song: value,
            fact: profileInfo.fact,
            biography: profileInfo.biography,
            pets: profileInfo.pets
        } as ProfileInfo);
    }

    const handleFactModalOpening = () => {
        const handleClose = () => closeModal('info-modal');
        openModal("info-modal", 
        <TextPromptModal 
            header={t('ProfileInfo.Info.Fact.Modal.Header')} 
            bodyText={t('ProfileInfo.Info.Fact.Modal.Body')}
            closeModal={handleClose}
            valueHandler={handleFactValueSetting} />);
    }

    const handleFactValueSetting = (value: string) => {
        setProfileInfo({ 
            education: profileInfo.education,
            residence: profileInfo.residence,
            birthdate: profileInfo.birthdate,
            mainHobby: profileInfo.mainHobby,
            skills: profileInfo.skills,
            timeThings: profileInfo.timeThings,
            profession: profileInfo.profession,
            languages: profileInfo.languages,
            song: profileInfo.song,
            fact: value,
            biography: profileInfo.biography,
            pets: profileInfo.pets
        } as ProfileInfo);
    }

    const handleBiographyModalOpening = () => {
        const handleClose = () => closeModal('info-modal');
        openModal("info-modal", 
        <TextPromptModal 
            header={t('ProfileInfo.Info.Biography.Modal.Header')} 
            bodyText={t('ProfileInfo.Info.Biography.Modal.Body')}
            closeModal={handleClose}
            valueHandler={handleBiographyValueSetting} />);
    }

    const handleBiographyValueSetting = (value: string) => {
        setProfileInfo({ 
            education: profileInfo.education,
            residence: profileInfo.residence,
            birthdate: profileInfo.birthdate,
            mainHobby: profileInfo.mainHobby,
            skills: profileInfo.skills,
            timeThings: profileInfo.timeThings,
            profession: profileInfo.profession,
            languages: profileInfo.languages,
            song: profileInfo.song,
            fact: profileInfo.fact,
            biography: value,
            pets: profileInfo.pets
        } as ProfileInfo);
    }

    const handlePetsModalOpening = () => {
        const handleClose = () => closeModal('info-modal');
        openModal("info-modal", 
        <TextPromptModal 
            header={t('ProfileInfo.Info.Pets.Modal.Header')} 
            bodyText={t('ProfileInfo.Info.Pets.Modal.Body')}
            closeModal={handleClose}
            valueHandler={handlePetsValueSetting} />);
    }

    const handlePetsValueSetting = (value: string) => {
        setProfileInfo({ 
            education: profileInfo.education,
            residence: profileInfo.residence,
            birthdate: profileInfo.birthdate,
            mainHobby: profileInfo.mainHobby,
            skills: profileInfo.skills,
            timeThings: profileInfo.timeThings,
            profession: profileInfo.profession,
            languages: profileInfo.languages,
            song: profileInfo.song,
            fact: profileInfo.fact,
            biography: profileInfo.biography,
            pets: value
        } as ProfileInfo);
    }

    return (
        <>
            <div className="profile-info-page">
                <div className="profile-info-page-content">                    
                    <div className='profile-info'>
                        <div className='header'>
                            {t('ProfileInfo.Header')}
                        </div>
                        <div className='discl'>
                            {t('ProfileInfo.Discl')}
                        </div>
                        <div className='info'>
                            <div className='column'>
                                <TextInputBorderless
                                    label={t('ProfileInfo.Info.Education.Label')} 
                                    icon={hatIcon} 
                                    showLabelAlways={true}
                                    disableManual={false}
                                    onClick={handleEducationModalOpening}
                                    outerValue={profileInfo.education}/>
                                <TextInputBorderless
                                    label={t('ProfileInfo.Info.ResidencePlace.Label')}
                                    icon={globusIcon}
                                    showLabelAlways={true}
                                    disableManual={false}
                                    onClick={handleResidenceModalOpening}
                                    outerValue={profileInfo.residence} />
                                <TextInputBorderless
                                    label={t('ProfileInfo.Info.Birthdate.Label')}
                                    icon={balloonIcon}
                                    showLabelAlways={true}
                                    disableManual={false}
                                    onClick={handleBirthdateModalOpening}
                                    outerValue={profileInfo.birthdate} />
                                <TextInputBorderless
                                    label={t('ProfileInfo.Info.MainHobby.Label')} 
                                    icon={heartIcon}
                                    showLabelAlways={true}
                                    disableManual={false}
                                    onClick={handleMainhobbyModalOpening} 
                                    outerValue={profileInfo.birthdate}/>
                                <TextInputBorderless
                                    label={t('ProfileInfo.Info.Skills.Label')}
                                    icon={wandIcon}
                                    showLabelAlways={true}
                                    disableManual={false} 
                                    onClick={handleSkillsModalOpening}
                                    outerValue={profileInfo.skills}/>
                                <TextInputBorderless
                                    label={t('ProfileInfo.Info.SpendTimeThings.Label')} 
                                    icon={clockIcon}
                                    showLabelAlways={true}
                                    disableManual={false} 
                                    onClick={handleTimeThingsModalOpening}
                                    outerValue={profileInfo.timeThings}/>
                            </div>
                            <div className='column'>
                                <TextInputBorderless
                                    label={t('ProfileInfo.Info.Profession.Label')}
                                    icon={caseIcon}
                                    showLabelAlways={true}
                                    disableManual={false}
                                    onClick={handleProfessionModalOpening}
                                    outerValue={profileInfo.profession}/>
                                <TextInputBorderless
                                    label={t('ProfileInfo.Info.Languages.Label')}
                                    icon={languageIcon}
                                    showLabelAlways={true}
                                    disableManual={false}
                                    onClick={handleLanguagesModalOpening}
                                    outerValue={profileInfo.languages}/>
                                <TextInputBorderless
                                    label={t('ProfileInfo.Info.Song.Label')}
                                    icon={noteIcon}
                                    showLabelAlways={true}
                                    disableManual={false}
                                    onClick={handleSongModalOpening}
                                    outerValue={profileInfo.song}/>
                                <TextInputBorderless
                                    label={t('ProfileInfo.Info.Fact.Label')}
                                    icon={lightbulbIcon}
                                    showLabelAlways={true}
                                    disableManual={false}
                                    onClick={handleFactModalOpening}
                                    outerValue={profileInfo.fact}/>
                                <TextInputBorderless
                                    label={t('ProfileInfo.Info.Biography.Label')}
                                    icon={bookIcon}
                                    showLabelAlways={true}
                                    disableManual={false}
                                    onClick={handleBiographyModalOpening}
                                    outerValue={profileInfo.biography}/>
                                <TextInputBorderless
                                    label={t('ProfileInfo.Info.Pets.Label')}
                                    icon={pawIcon}
                                    showLabelAlways={true}
                                    disableManual={false}
                                    onClick={handlePetsModalOpening}
                                    outerValue={profileInfo.pets}/>
                            </div>
                        </div>
                        <div className='additional-info'>
                            <div className='header'>
                                {t('ProfileInfo.Additional.Header')}
                            </div>
                            <textarea className='textarea' placeholder={t('ProfileInfo.Additional.Placeholder')} />
                        </div>
                        <div className='hobbies'>
                            <div className='header'>
                                {t('ProfileInfo.Hobbies.Header')}            
                            </div>
                            <div className='description'>
                                {t('ProfileInfo.Hobbies.Description')}
                            </div>
                            <Link className='link' to={"account/hobbies"}>{t('ProfileInfo.Hobbies.Link')}</Link>
                        </div>
                    </div>
                    <div className="avatar-section">
                        <div className='avatar'>
                            <img src={personIcon} />
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}