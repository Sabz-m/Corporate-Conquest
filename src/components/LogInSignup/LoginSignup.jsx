import React, { useEffect, useState } from "react";
import './LoginSignup.css';
import user_icon from '/src/assets/user.png'
import email_icon from '/src/assets/email.png'
import password_icon from '/src/assets/password.png'
import { useNavigate } from "react-router-dom";


function LoginSignup () {
    const navigate = useNavigate();
    const [action, setAction] = useState("Login");
    const [loginState, setLoginState] = useState({
        username: '',
        password: '',
    });
    const [signupState, setSignupState] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const clearForm = () => {
        setSignupState({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
    };

    const cleanMessage = () => {
        setErrorMessage("");    //,,,,,,,,,,,,,,,,,,,,,
    }

    const handleLoginChange = (event) => {
        const {name, value} = event.target;
        setLoginState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrorMessage("");
    };

    const handleSignupChange = (event) => {
        const { name, value } = event.target;
        setSignupState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = loginState;

        if (!username || !password) {
            setErrorMessage("Please fill in all the fields!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Login successful');

                localStorage.setItem("token", data.token);
                clearForm();
                setErrorMessage("");
                setTimeout(() => {
                    navigate("/level-selection");
                  }, 1000);
            } else {
                setErrorMessage(data.message || 'Login failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred');
        }
    };

    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        const { username, email, password, confirmPassword } = signupState;


        if(!username || !email || !password || !confirmPassword) {
            setErrorMessage("Please fill in all the fields!")
            return;
        }

        if(password !== confirmPassword) {
            setErrorMessage("Passwords do not match!");
            clearForm();

            setTimeout(() => {
                cleanMessage();
            }, 1000);

            return;
        }

        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ username, email, password })
            })

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Registration successful');
                
                localStorage.setItem("token", data.token)
                
                clearForm();

                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                setErrorMessage(data.message || 'Registration failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred');
        }
        
    }

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>

            <div className="inputs">
                <div className="input">
                    <img className="icon" src={user_icon} alt="" />
                    <input type="text"
                            name="username"
                            placeholder="Username"
                            value={action === "Login" ? loginState.username : signupState.username}
                            onChange={action === "Login" ? handleLoginChange : handleSignupChange}
                    />
                </div>
                {action === "Login" ? <div></div> : <div className="input">
                    <img className="icon" src={email_icon} alt="" />
                    <input type="email"
                        name="email"
                        placeholder="Email"
                        value={signupState.email}
                        onChange={handleSignupChange} 
                    />
                </div>}
                <div className="input">
                    <img className="icon" src={password_icon} alt="" />
                    <input type="password"
                        name="password"
                        placeholder="Password"
                        value={action === "Login" ? loginState.password : signupState.password}
                        onChange={action === "Login" ? handleLoginChange : handleSignupChange}
                    />
                </div>
                {action === "Login" ? <div></div> : <div className="input"> 
                    <img className="icon" src={password_icon} alt="" />
                    <input type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={signupState.confirmPassword}
                            onChange={handleSignupChange}
                    />
                </div>}
            </div>
            {action === "Sign Up" ? <div></div> : <div className="forgot-password">Forgot password? 
                <span> Click here!</span></div>}
                <div className="messages">
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}
                </div>
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"}
                onClick={(event) => {action === "Sign Up" ? handleSignupSubmit(event) : setAction("Sign Up")}}>
                    Sign Up
                    </div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"}
                onClick={(event) => {action === "Login" ? handleLoginSubmit(event) : setAction("Login")}}>
                    Login
                    </div>
            </div>
        </div>
    )
}



export default LoginSignup;