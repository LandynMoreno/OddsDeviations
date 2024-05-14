import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';

function CreateAccount () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
  
    function handleUsernameChange (event) {
      setUsername(event.target.value);
    };
  
    function handlePasswordChange (event) {
      setPassword(event.target.value);
    };
  
    function handleSignUp () {
      navigate('/CreateAccount');
    };
  
    function isValidPassword (password) {
        // Regular expression to match the criteria
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };
  
    async function handleLogin () {
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
      
        setErrorMessage(''); // Clear any previous error messages
      
        try {
          const accountData = username.includes('@')
            ? { email: username, password }
            : { username, password };
      
          console.log(accountData);
      
          const response = await fetch('http://localhost:8080/accounts/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(accountData),
          });
      
          if (response.ok) {
            console.log('Account Logged In Successfully!');
            setUsername('');
            setPassword('');
            navigate('/account');
          } else {
            throw new Error(
              'An error occurred while logging into the account or the account does not exist.'
            );
          }
        } catch (error) {
          console.error('Error Logging into account:', error);
          setErrorMessage(error.message);
        }
    };

    return (
        <div className="create-account-container">
            CREATE ACCOUNT
        </div>
    );
}

export default CreateAccount;
  
