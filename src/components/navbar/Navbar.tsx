import { Link } from "react-router-dom";
import "../../styles/navbar/navbar.scss";
import appLogo from "../../assets/icons/navbar/LOGO.svg";
import languageSelectorIcon from "../../assets/icons/navbar/language_idle.svg";
import favouritesIcon from "../../assets/icons/navbar/favourites_idle.svg";
import profileLinkIcon from "../../assets/icons/navbar/profile_idle.svg";

export default function Navbar() {
    return (
      <>
        <nav id="navbar"> 
            <Link to="/">
              <img src={appLogo} alt="home logo" />
            </Link>
            <div className="line"></div>
            <Link to="/housing-offer" className="navbar-text">
              Запропонувати помешкання
            </Link>
            <div className="navbar-item navbar-icon">
              <img src={languageSelectorIcon} alt="languages" />
            </div>
            <Link className="navbar-icon" to="/favourites">
              <img src={favouritesIcon} alt="favourites" />
            </Link>
            <Link className="navbar-icon" to="/profile/my">
              <img src={profileLinkIcon} alt="profile" />
            </Link>
        </nav>
      </>  
    );
}