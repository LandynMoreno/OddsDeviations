import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar () {

  const navigate = useNavigate();

  function navigateToHome () {
      navigate('/');
  }

  function navigateToMyAccount () {
    navigate('/Login');
}

  return (
    <div>
      <nav id="desktop-nav">
        <div className="Title" onClick={ navigateToHome }>Odds Deviations</div>
        <div className="Account-Icon" onClick={ navigateToMyAccount }>My Account</div>
      </nav>
    </div>
  );
}

export default NavBar;
