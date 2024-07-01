import { useContext } from "react";
import AuthContext from "./auth/AuthenticationContext";

export default function Profile() {
    const authContext = useContext(AuthContext);

    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    return (
        <>
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
                    <p>
                        Unauthenticated
                    </p>   
                )}
            
        </>
    );
}