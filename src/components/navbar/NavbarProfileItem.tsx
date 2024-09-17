import { useContext } from "react";
import profileLinkIcon from "../../assets/icons/navbar/profile.svg";
import AuthContext from "../auth/AuthenticationContext";

import '../../styles/navbar/navbar-profile-item.scss';
import { ImageHelper } from "../../helpers/ImageHelper";

interface NavbarProfileItemProps {
    onClick: (popupName: string) => void;
}

export default function NavbarProfileItem({ onClick }: NavbarProfileItemProps) {
    const authContext = useContext(AuthContext);
    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { authState } = authContext;

    const handlePopupOpen = () => {
        if(!authState.isAuthenticated) {
            onClick("signInPopup");
        } else {
            onClick("profilePopup");
        }
    }

    return (
        <>
            {!authState.isAuthenticated ? 
            (
                <div className="navbar-icon navbar-item profile-item" onClick={handlePopupOpen}>
                    <img src={profileLinkIcon} alt="profile" className="inner-icon"/>
                </div>) : 
            (
                <div className="navbar-icon navbar-item profile-item" onClick={handlePopupOpen}>
                    {authState.user?.avatar ? (
                        <div className="profile-image-container">
                            <img src={authState.user.avatar && (ImageHelper.getAvatarImage(authState.user?.avatar))} />
                        </div>
                    ) : (
                        <div className="profile-icon">
                            {authState.user?.name.charAt(0)}
                        </div>  
                    )}
                    
                </div>
            ) }
            
        </>
    );
}