import { FormEvent, useContext, useState } from "react";
import AuthContext from "./auth/AuthenticationContext";
import { useNavigate } from "react-router-dom";

import "../styles/pages/signin/signin.scss"

export default function SignIn() {
    const authContext = useContext(AuthContext);

    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { login } = authContext;

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(''); 
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); 

    const onPhoneSignInHandle = async function PhoneSignIn(event: FormEvent<HTMLButtonElement>) {
        event.preventDefault();
      
        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/auth/phone"

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  phone,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                login(data.token, data.userData);
                navigate("/");
              } else if (response.status === 400) {
                const errorData = await response.json();
                console.log(errorData.validationErrorsGrous);
              } else if (response.status === 401) {
                const errorData = await response.json();
                console.log(errorData);
              }
        } 
        catch (error) {
            console.log('error', error);
        }
    }

    const onEmailSignInHandle = async function EmailSignIn(event: FormEvent<HTMLButtonElement>) {
        event.preventDefault();
      
        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/auth/email"

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email,
                  password
                }),
            });
            if (response.ok) {
                const data = await response.json();
                login(data.token, data.userData);
                navigate("/");
              } else if (response.status === 400) {
                const errorData = await response.json();
                console.log(errorData.validationErrorsGrous);
              } else if (response.status === 401) {
                const errorData = await response.json();
                console.log(errorData);
              }
        } 
        catch (error) {
            console.log('error', error);
        }
    }

    const onEmailChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
  
    const onPhoneChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    }
  
    const onPasswordChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    }

    return (
        <>
          <div id="sign-in-page">
            <div className="form">
                  <input 
                      className="form-input"
                      placeholder="phone" 
                      name="phone"
                      onChange={onPhoneChangeHandle}/>
                  <button
                      onClick={onPhoneSignInHandle}>Phone SignIn</button>
              </div>
              <div className="form">
                  <input 
                      className="form-input"
                      placeholder="email" 
                      name="email"
                      onChange={onEmailChangeHandle}/>
                  <input 
                      className="form-input"
                      placeholder="password" 
                      name="password"
                      onChange={onPasswordChangeHandle}/>
                  <button
                      onClick={onEmailSignInHandle}>Email SignIn</button>
              </div>
          </div> 
        </>
    );
}