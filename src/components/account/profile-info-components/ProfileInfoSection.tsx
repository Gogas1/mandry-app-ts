import { useModal } from "../../app/ModalContext";
import TextPromptModal from "../modals/TextPromptModal";
import { ProfileInfo } from "../ProfileInfoPage";
import { useTranslation } from "react-i18next";
import TextInputBorderless from "../../app/Fields/TextInputBorderless";

import balloonIcon from '../../../assets/icons/profile/info/baloon.svg';
import bookIcon from '../../../assets/icons/profile/info/book.svg';
import caseIcon from '../../../assets/icons/profile/info/case.svg';
import clockIcon from '../../../assets/icons/profile/info/clock.svg';
import globusIcon from '../../../assets/icons/profile/info/globus.svg';
import hatIcon from '../../../assets/icons/profile/info/hat.svg';
import heartIcon from '../../../assets/icons/profile/info/heart.svg';
import languageIcon from '../../../assets/icons/profile/info/language.svg';
import lightbulbIcon from '../../../assets/icons/profile/info/lightbulb.svg';
import noteIcon from '../../../assets/icons/profile/info/note.svg';
import pawIcon from '../../../assets/icons/profile/info/paw.svg';
import wandIcon from '../../../assets/icons/profile/info/wand.svg';

interface ProfileInfoSectionProps {
    profileInfo: ProfileInfo;
    handleProfileInfoChange: (profileInfo: ProfileInfo) => void;
}

export default function ProfileInfoSection({ profileInfo, handleProfileInfoChange }: ProfileInfoSectionProps) {
    const { t } = useTranslation();

    const { openModal, closeModal } = useModal();

    const handleEducationModalOpening = () => {
        const handleClose = () => closeModal('info-modal');
        openModal("info-modal", 
        <TextPromptModal 
            header={t('ProfileInfo.Info.Education.Modal.Header')} 
            bodyText={t('ProfileInfo.Info.Education.Modal.Body')}
            closeModal={handleClose}
            valueHandler={handleEducationValueSetting} />);
    }

    const handleEducationValueSetting = (value: string) => {
        const updatedProfileInfo = { ...profileInfo };
        updatedProfileInfo.education = value;
        handleProfileInfoChange(updatedProfileInfo);
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
        const updatedProfileInfo = { ...profileInfo };
        updatedProfileInfo.residence = value;
        handleProfileInfoChange(updatedProfileInfo);
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
        const updatedProfileInfo = { ...profileInfo };
        updatedProfileInfo.birthdate = value;
        handleProfileInfoChange(updatedProfileInfo);
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
        const updatedProfileInfo = { ...profileInfo };
        updatedProfileInfo.mainHobby = value;
        handleProfileInfoChange(updatedProfileInfo);
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
        const updatedProfileInfo = { ...profileInfo };
        updatedProfileInfo.skills = value;
        handleProfileInfoChange(updatedProfileInfo);
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
        const updatedProfileInfo = { ...profileInfo };
        updatedProfileInfo.timeThings = value;
        handleProfileInfoChange(updatedProfileInfo);
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
        const updatedProfileInfo = { ...profileInfo };
        updatedProfileInfo.profession = value;
        handleProfileInfoChange(updatedProfileInfo);
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
        const updatedProfileInfo = { ...profileInfo };
        updatedProfileInfo.languages = value;
        handleProfileInfoChange(updatedProfileInfo);
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
        const updatedProfileInfo = { ...profileInfo };
        updatedProfileInfo.song = value;
        handleProfileInfoChange(updatedProfileInfo);
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
        const updatedProfileInfo = { ...profileInfo };
        updatedProfileInfo.fact = value;
        handleProfileInfoChange(updatedProfileInfo);
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
        const updatedProfileInfo = { ...profileInfo };
        updatedProfileInfo.biography = value;
        handleProfileInfoChange(updatedProfileInfo);
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
        const updatedProfileInfo = { ...profileInfo };
        updatedProfileInfo.pets = value;
        handleProfileInfoChange(updatedProfileInfo);
    }

    return (
        <>
            <div className='column'>
                <TextInputBorderless
                    label={t('ProfileInfo.Info.Education.Label')}
                    icon={hatIcon}
                    showLabelAlways={true}
                    disableManual={false}
                    onClick={handleEducationModalOpening}
                    outerValue={profileInfo.education} />
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
                    outerValue={profileInfo.birthdate} />
                <TextInputBorderless
                    label={t('ProfileInfo.Info.Skills.Label')}
                    icon={wandIcon}
                    showLabelAlways={true}
                    disableManual={false}
                    onClick={handleSkillsModalOpening}
                    outerValue={profileInfo.skills} />
                <TextInputBorderless
                    label={t('ProfileInfo.Info.SpendTimeThings.Label')}
                    icon={clockIcon}
                    showLabelAlways={true}
                    disableManual={false}
                    onClick={handleTimeThingsModalOpening}
                    outerValue={profileInfo.timeThings} />
            </div>
            <div className='column'>
                <TextInputBorderless
                    label={t('ProfileInfo.Info.Profession.Label')}
                    icon={caseIcon}
                    showLabelAlways={true}
                    disableManual={false}
                    onClick={handleProfessionModalOpening}
                    outerValue={profileInfo.profession} />
                <TextInputBorderless
                    label={t('ProfileInfo.Info.Languages.Label')}
                    icon={languageIcon}
                    showLabelAlways={true}
                    disableManual={false}
                    onClick={handleLanguagesModalOpening}
                    outerValue={profileInfo.languages} />
                <TextInputBorderless
                    label={t('ProfileInfo.Info.Song.Label')}
                    icon={noteIcon}
                    showLabelAlways={true}
                    disableManual={false}
                    onClick={handleSongModalOpening}
                    outerValue={profileInfo.song} />
                <TextInputBorderless
                    label={t('ProfileInfo.Info.Fact.Label')}
                    icon={lightbulbIcon}
                    showLabelAlways={true}
                    disableManual={false}
                    onClick={handleFactModalOpening}
                    outerValue={profileInfo.fact} />
                <TextInputBorderless
                    label={t('ProfileInfo.Info.Biography.Label')}
                    icon={bookIcon}
                    showLabelAlways={true}
                    disableManual={false}
                    onClick={handleBiographyModalOpening}
                    outerValue={profileInfo.biography} />
                <TextInputBorderless
                    label={t('ProfileInfo.Info.Pets.Label')}
                    icon={pawIcon}
                    showLabelAlways={true}
                    disableManual={false}
                    onClick={handlePetsModalOpening}
                    outerValue={profileInfo.pets} />
            </div>
        </>
    );
}