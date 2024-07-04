import { useContext } from "react";
import AuthContext from "./auth/AuthenticationContext";
import "../styles/pages/my-profile/my-profile.scss"
import { Link } from "react-router-dom";

export default function Profile() {
    const authContext = useContext(AuthContext);

    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    return (
        <>
            <div id="my-profile-page">
                <h2>Profileworks over here</h2>
                {authContext.authState.isAuthenticated ? (
                    <>
                        <p>
                            {authContext.authState.user?.id}
                        </p>
                        <p>
                            {authContext.authState.user?.name}
                        </p>
                        <p>
                            {authContext.authState.user?.email}
                        </p>
                    </>                
                    ) :
                    (
                        <>
                            <p>
                                Unauthenticated
                            </p>   
                            <p>
                                <Link className="link" to="/signup">
                                    SignUp
                                </Link>
                                <Link className="link" to="/signin">
                                    SignIn
                                </Link>
                            </p>
                        </>
                        
                    )}
            </div>          
        </>
    );
}