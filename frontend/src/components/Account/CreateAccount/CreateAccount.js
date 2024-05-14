import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';

function CreateAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    function handleEmailChange(event) {
        setEmail(event.target.value);
    };

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    };

    function handleConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    async function handleCreateAccount() {
        if (!email || !password || !confirmPassword) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (!isValidPassword(password)) {
            setErrorMessage(
                'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.'
            );
            return;
        }

        setErrorMessage('');

        try {
            const accountData = { email: email, password: password };
            const response = await fetch('http://localhost:8080/accounts/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(accountData),
            });

            if (response.ok) {
                console.log('Account Created Successfully!');
                navigate('/login');
            } else {
                throw new Error('An error occurred while creating the account.');
            }
        } catch (error) {
            console.error('Error creating account:', error);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="create-account-container">
            <form onSubmit={(e) => e.preventDefault()} className="create-account-form">
                <h4>Create your account</h4>

                <div className="inputs-container">
                    <label htmlFor="email">
                        Email address
                        <input type="text" id="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" />
                    </label>

                    <label htmlFor="password">
                        Password
                        <input type="password" id="password" value={password} onChange={handlePasswordChange} placeholder="Create your password" />
                    </label>

                    <label htmlFor="confirm-password">
                        Confirm Password
                        <input type="password" id="confirm-password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm your password" />
                    </label>
                </div>

                <button type="submit" onClick={handleCreateAccount}>Sign Up</button>

                {errorMessage && <div className="error-message">{errorMessage}</div>}
                
                <div className="login-text">
                    Already have an account? <span onClick={() => navigate('/login')}>Log In</span>
                </div>
            </form>
        </div>
    );
}

export default CreateAccount;
