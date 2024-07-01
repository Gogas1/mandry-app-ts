import { FormEvent, useContext, useState } from "react";
import AuthContext from "./auth/AuthenticationContext";

import "../styles/forms/form.scss"
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const authContext  = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { login } = authContext;

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(''); 
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState<Date | null>(null);

    const onPhoneSignUpHandle = async function PhoneSignUp(event: FormEvent<HTMLButtonElement>) {
      event.preventDefault();
      
      const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/auth/signup";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            surname,
            phone,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          login(data.token, data.userData);
          window.location.href = '/';
        } else if (response.status === 400) {
          const errorData = await response.json();
          console.log(errorData.validationErrorsGrous);
        } else if (response.status === 409) {
          const errorData = await response.json();
          console.log(errorData.obfuscatedUserData);
        }
      } catch (error) {
        console.log('error', error);
      }
    }

    const onEmailSignUpHandle = async function PhoneSignUp(event: FormEvent<HTMLButtonElement>) {
      event.preventDefault();

      const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/a/auth/signup";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            surname,
            email,
            password,
            BirthDate: birthDate
          }),
        });
        if (response.ok) {
          const data = await response.json();
          login(data.token, data.userData);
          navigate("/");
        } else if (response.status === 400) {
          const errorData = await response.json();
          console.log(errorData.validationErrorsGrous);
        } else if (response.status === 409) {
          const errorData = await response.json();
          console.log(errorData.obfuscatedUserData);
        }
      } catch (error) {
        console.log('error', error);
      }
    }

    const onNameChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    }

    const onSurnameChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSurname(event.target.value);
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

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputDate = event.target.valueAsDate;
      setBirthDate(inputDate);
    };

    return (
      <>
        <div className="form">
            <input
                className="form-input" 
                placeholder="name" 
                name="name" 
                onChange={onNameChangeHandle}/>
            <input 
                className="form-input"
                placeholder="surname" 
                name="surname" 
                onChange={onSurnameChangeHandle}/>
            <input 
                className="form-input"
                placeholder="email" 
                name="phone" 
                onChange={onEmailChangeHandle}/>
            <input
                className="form-input"
                placeholder="phone"
                name="phone"
                onChange={onPhoneChangeHandle}/>
            <input
                className="form-input"
                placeholder="password" 
                name="password" 
                onChange={onPasswordChangeHandle}/>
            <input
                type="date"
                className="form-input"
                value={birthDate ? birthDate.toISOString().substr(0, 10) : ''}
                onChange={handleDateChange} />
            <div className="form-button-group">
                <button 
                    onClick={onPhoneSignUpHandle}>Phone SignUp</button>
                <button 
                    onClick={onEmailSignUpHandle}>Email SignUp</button>
            </div>
        </div>
        
        
      </>  
    );
}