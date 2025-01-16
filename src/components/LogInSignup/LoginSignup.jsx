import React, { useEffect, useState } from "react";
import './LoginSignup.css';
import user_icon from '/src/assets/user.png'
import email_icon from '/src/assets/email.png'
import password_icon from '/src/assets/password.png'


function LoginSignup () {
    const [action, setAction] = useState("Login")
    const [signupState, setSignupState] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignupState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

 
    const handleSubmit = (event) => {
        event.preventDefault();

        if(action === "Sign Up") {
            if(signupState.userName && signupState.email && signupState.password) {
                setSuccessMessage('Registration Successful!');
            } else {
                setErrorMessage('Fill in all fields!')
            }

            if(signupState.password !== signupState.confirmPassword) {
                setErrorMessage('Passwords do not match!');
            }
        }
        
    }

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? <div></div> : <div className="input">
                    <img className="icon" src={user_icon} alt="" />
                    <input type="text" placeholder="Username"/>
                </div>}
                <div className="input">
                    <img className="icon" src={email_icon} alt="" />
                    <input type="email" placeholder="Email" />
                </div>
                <div className="input">
                    <img className="icon" src={password_icon} alt="" />
                    <input type="password" placeholder="Password" />
                </div>
            </div>
            {action === "Sign Up" ? <div></div> : <div className="forgot-password">Forgot password? <span>Click here!</span></div>}
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"}
                onClick={() => {setAction("Sign Up")}} onSubmit={handleSubmit}>
                    Sign Up
                    </div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"}
                onClick={() => {setAction("Login")}} >Login</div>
            </div>
        </div>
    )
}



export default LoginSignup;