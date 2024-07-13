import { Link } from "react-router-dom";
import "../../styles/navbar/navbar.scss";
import appLogo from "../../assets/icons/navbar/LOGO.svg";
import languageSelectorIcon from "../../assets/icons/navbar/languages.svg";
import favouritesIcon from "../../assets/icons/navbar/favourites.svg";
import profileLinkIcon from "../../assets/icons/navbar/profile.svg";
import { FocusEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from 'i18next';

export default function Navbar() {
    const { t } = useTranslation();
    const resources = i18next.options.resources as Record<string, any>;
    const lngs = Object.keys(resources).map(code => {
      return {
        code: code,
        name: resources[code].translation.nativeName
      };
    });

    const [focused, setFocused] = useState(false);

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      setFocused(true);
    };
  
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setFocused(false);
      }
    };

    return (
      <>

        <nav id="navbar-wrapper">
          <div id="navbar-border">
            <div id="navbar">
              
              
              <Link to="/housing-offer" className="navbar-text">
                {t('createHousing')}
              </Link>
              <Link to="/" id="home-logo">
                <img src={appLogo} alt="home logo" />
              </Link>
              <div id="navbar-icons-group">
                <div 
                  tabIndex={0}
                  className="navbar-item navbar-icon"
                  onFocus={handleFocus}
                  onBlur={handleBlur}>
                  <img src={languageSelectorIcon} alt="languages" className="inner-icon" />
                  <div className={`language-menu  ${focused ? 'active' : ''}`}>
                    <select
                      value={i18next.resolvedLanguage}
                      onChange={(e) => i18next.changeLanguage(e.target.value)}>
                      {lngs.map((lng) => (
                        <option key={lng.code} value={lng.code}>
                          {lng.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <Link className="navbar-icon" to="/favourites">
                  <img src={favouritesIcon} alt="favourites"  className="inner-icon"/>
                </Link>
                <Link className="navbar-icon" to="/profile/my">
                  <img src={profileLinkIcon} alt="profile" className="inner-icon"/>
                </Link> 
              </div>
               
            </div> 
          </div>
                  
        </nav>
      </>  
    );
}