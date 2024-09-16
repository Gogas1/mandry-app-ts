import { Link } from 'react-router-dom';

import photoIcon from '../../assets/icons/meta/photo.svg';
import personIcon from '../../assets/icons/profile/user-circle-stroke-rounded 1.svg';

import '../../styles/account/profile/profile-info-page.scss';

import { useTranslation } from 'react-i18next';
import ProfileInfoSection from './profile-info-components/ProfileInfoSection';
import { useContext, useState } from 'react';
import AuthContext from '../auth/AuthenticationContext';
import { ImageHelper } from '../../helpers/ImageHelper';

export interface ProfileInfo {
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
    const authContext = useContext(AuthContext);
    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { authState, updateAvatar } = authContext;

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

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const sendNewAvatar = async (file: File) => {
        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/a/avatar/my/change"
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authState.token}`,
                    'ngrok-skip-browser-warning': 'true'
                },
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                updateAvatar(result.src);
            }
        }
        catch (error) {
            console.log(error);
        }
        
    }

    const handleProfileInfoChange = (profileInfo: ProfileInfo) => {
        setProfileInfo(profileInfo);
    } 

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
            sendNewAvatar(file);
        }
    };

    const handleButtonClick = () => {
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };

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
                            <ProfileInfoSection 
                                profileInfo={profileInfo} 
                                handleProfileInfoChange={handleProfileInfoChange} />
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
                            <div className='avatar-container'>
                                {authState.user ? (
                                    <img src={authState.user.avatar ? (ImageHelper.getAvatarImage(authState.user?.avatar)) : personIcon} />
                                ) : (
                                    <img src={personIcon} />
                                )}
                            </div>
                            
                        </div>
                        <input
                            type="file"
                            id="file-input"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <button className='avatar-change' onClick={handleButtonClick}>
                            <img src={photoIcon} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}