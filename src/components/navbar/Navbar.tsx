import { Link } from "react-router-dom";
import "../../styles/navbar/navbar.scss";

export default function Navbar() {
    return (
      <>
        <nav id="navbar">
            <Link className="navbar-item" to="/signup">Sign Up</Link>
            <Link className="navbar-item" to="/signin">Sign In</Link>
            <Link className="navbar-item" to="/profile/my">Profile</Link>
        </nav>
      </>  
    );
}