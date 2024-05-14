import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [emailForReset, setEmailForReset] = useState('');

    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignUp = () => {
        navigate('/CreateAccount');
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleLogin = async () => {
        if (!username || !password) {
            setErrorMessage('Please enter both username/email and password.');
            return;
        }

        if (!isValidPassword(password)) {
            setErrorMessage(
                'Invalid Password, password must be at least 8 characters long with the criteria of at least one lowercase letter, one uppercase letter, one digit, and one special character.'
            );
            return;
        }

        setErrorMessage('');

        try {
            const accountData = username.includes('@') ? { email: username, password } : { username, password };
            const response = await fetch('http://localhost:8080/accounts/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(accountData),
            });

            if (response.ok) {
                navigate('/');
            } else {
                throw new Error('An error occurred while logging into the account or the account does not exist.');
            }
        } catch (error) {
            console.error('Error Logging into account:', error);
            setErrorMessage(error.message);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleResetPassword = () => {
        console.log('Reset password for:', emailForReset);
        // Here you can add the logic to handle the password reset request
        toggleModal();
    };

    return (
        <div className="login-container">

            {!showModal && (
                <form onSubmit={(e) => e.preventDefault()} className="login-form">
                    <h4>Sign in to your account</h4>

                    <div className="inputs-container">
                        <label htmlFor="username">
                            Email address
                            <input type="text" id="username" value={username} onChange={handleUsernameChange} placeholder="Enter your email" />
                        </label>

                        <label htmlFor="password">
                            Password
                            <input type="password" id="password" value={password} onChange={handlePasswordChange} placeholder="Enter your password" />
                            <div className="forgot-password" onClick={toggleModal}>Forgot password?</div>
                        </label>
                    </div>

                    <button type="submit" onClick={handleLogin}>Sign in</button>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <div className="signup-text">
                        Not a member? <span onClick={handleSignUp}>Sign Up Now</span>
                    </div>
                </form>
            )}


            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Forgot Password?</h4>
                        <input
                            type="email"
                            value={emailForReset}
                            onChange={(e) => setEmailForReset(e.target.value)}
                            placeholder="Enter your email"
                        />
                        <div className="buttons-container">
                            <button onClick={handleResetPassword}>Reset my password</button>
                            <button onClick={toggleModal}>Back to Login</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Login;
