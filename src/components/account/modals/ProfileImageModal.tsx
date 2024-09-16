import crossIcon from '../../../assets/icons/meta/close-cross.svg';
import profileIcon from '../../../assets/icons/profile/user-circle-stroke-rounded 1.svg';
import { ImageHelper } from '../../../helpers/ImageHelper';
import { User } from '../../auth/AuthenticationContext';

interface ProfileImageModalProps {
    user: User | null;
    hideModal: () => void;
}

export default function ProfileImageModal({ hideModal, user }: ProfileImageModalProps) {
    return (
        <>
            <div className="profile-image-modal__panel">
                <div className='panel-test'>
                    <h2 className='header'>
                        {user?.name}
                    </h2>
                    <hr className='divider' />
                    <div className='image-container'>
                        {user ? (
                            <img
                                src={user.avatar ? (ImageHelper.getAvatarImage(user?.avatar)) : profileIcon}
                                alt="profile" />
                        ) : (
                            <img
                                src={profileIcon}
                                alt="profile" />
                        )}
                    </div>
                    
                </div>
                
            </div>
            <button className="profile-image-modal__close" onClick={() => hideModal()}>
                <img src={crossIcon} />
            </button>
        </>
    );
}