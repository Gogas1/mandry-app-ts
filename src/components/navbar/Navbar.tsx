import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import "../../styles/navbar/navbar.scss";

import appLogo from "../../assets/icons/navbar/Logo2.svg";
import languageSelectorIcon from "../../assets/icons/navbar/languages.svg";
import favouritesIcon from "../../assets/icons/navbar/favourites.svg";

import ProfilePopup from "./ProfilePopup";
import LanguagePopup from "./LanguagePopup";
import FavouritesPopup from "./FavouritesPopup";
import NavbarProfileItem from "./NavbarProfileItem";
import ProfileLinksPopup from "./ProfileLinksPopup";
import { ColorTheme, useUserSettings } from "../app/UserSettingsContext";

export default function Navbar() {
    const { t } = useTranslation();
    const { colorTheme, navbarWidth } = useUserSettings();
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
        <nav id="navbar-wrapper" style={{ display: navbarWidth > 0 ? 'flex' : 'block', alignItems: 'center' }}>
          <div 
            className={`navbar-border ${colorTheme === ColorTheme.DARK ? 'dark' : ''}`} 
            style={{ minWidth: navbarWidth, maxWidth: navbarWidth > 0 ? `${navbarWidth}px` : undefined }}>
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
                <div className="navbar-item navbar-icon" onClick={() => handlePopupOpen("favsPopup")}>
                  <img src={favouritesIcon} alt="favourites"  className="inner-icon"/>
                </div>
                {/* <div className="navbar-icon navbar-item" onClick={() => handlePopupOpen("profilePopup")}>
                  <img src={profileLinkIcon} alt="profile" className="inner-icon"/>
                </div>  */}
                <NavbarProfileItem 
                  onClick={handlePopupOpen}/>
              </div>      
            </div>
          </div>
          <div className="popups-wrapper">
            <LanguagePopup
              isOpen={openedPopup === 'languagePopup'}
              closeAll={handleClosePopups} 
              style={{ right: navbarWidth > 0 ? `calc(50% - ${navbarWidth / 2}px + 126px)` : `226px` }} />
            <FavouritesPopup
              isOpen={openedPopup === 'favsPopup'}
              closeAll={handleClosePopups}
              style={{ right: navbarWidth > 0 ? `calc(50% - ${navbarWidth / 2}px + 45px)` : `145px` }} />
            <ProfilePopup
              isOpen={openedPopup === 'signInPopup'}
              closeAll={handleClosePopups}
              style={{ right: navbarWidth > 0 ? `calc(50% - ${navbarWidth / 2}px)` : `100px` }}
               />
            <ProfileLinksPopup
              isOpen={openedPopup === 'profilePopup'}
              closeAll={handleClosePopups}
              style={{ right: navbarWidth > 0 ? `calc(50% - ${navbarWidth / 2}px + 4px)` : `104px` }}
            />
          </div>
        </nav>
      </>
    );
}