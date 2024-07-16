import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import "../../styles/navbar/navbar.scss";

import appLogo from "../../assets/icons/navbar/Logo2.svg";
import languageSelectorIcon from "../../assets/icons/navbar/languages.svg";
import favouritesIcon from "../../assets/icons/navbar/favourites.svg";
import profileLinkIcon from "../../assets/icons/navbar/profile.svg";

import ProfilePopup from "./ProfilePopup";
import LanguagePopup from "./LanguagePopup";

export default function Navbar() {
    const { t } = useTranslation();
    const [openedPopup, setOpenedPopup] = useState('');

    const handlePopupOpen = (name: string) => {
      if(openedPopup === name) {
        handleClosePopups();
        return;
      }

      setOpenedPopup(name);
    }

    const handleClosePopups = () => {
      setOpenedPopup('');
    }

    return (
      <>
        <nav id="navbar-wrapper">
          <div id="navbar-border">
            <div id="navbar">
              <Link to="/housing-offer" className="navbar-text" id="housing-offer">
                {t('createHousing')}
              </Link>
              <Link to="/" id="home-logo">
                <img src={appLogo} alt="home logo" />
              </Link>
              <div id="navbar-icons-group">
                <div 
                  tabIndex={0}
                  className="navbar-item navbar-icon"
                  onClick={() => handlePopupOpen('languagePopup')}>
                  <img src={languageSelectorIcon} alt="languages" className="inner-icon" />
                  
                </div>
                <Link to="favourites" className="navbar-item navbar-icon">
                  <img src={favouritesIcon} alt="favourites"  className="inner-icon"/>
                </Link>
                <div className="navbar-icon navbar-item" onClick={() => handlePopupOpen("profilePopup")}>
                  <img src={profileLinkIcon} alt="profile" className="inner-icon"/>
                </div> 
              </div>      
            </div>
          </div>
          <div className="popups-wrapper">
            <LanguagePopup isOpen={openedPopup === 'languagePopup'} closeAll={handleClosePopups} />
            <ProfilePopup isOpen={openedPopup === 'profilePopup'} closeAll={handleClosePopups} />
          </div> 
        </nav>
      </>  
    );
}