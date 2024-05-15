import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

function Home () {

    const navigate = useNavigate();

    function navigateToPropPicker () {
        navigate('PropPicker');
    }

    return (
        <div className="container">
            <div className="welcome-container">
                <h1 className="welcome-title">Make your bets, smarter!</h1>
                <p className="welcome-subheading">Use the data to your advantage and play discrepancies in your favor.</p>
                <button onClick={navigateToPropPicker}>Check out the tool</button>
            </div>
            <div className="section">
                <div className="section-content">
                    <h2>Purpose</h2>
                    <p>The purpose of this tool is essentially to allow a bettor to capitalize on value when betting.
                        Not all sportsbooks advertise the same odds; therefore, if a user is looking to make a bet,
                        they should utilize Odds Deviations first to ensure that they are getting the best possible value 
                        for their specific bet. Additionally, users can take advantage of Odds Deviations by scanning the tool
                        for arbitrage betting opportunities and more.</p>
                </div>
                <div className="section-content">
                    <img className="stock-image" src="/assets/stock-image-1.png" alt="Random"/>
                </div>
            </div>
            <div className="section flipped">
                <div className="section-content flipped">
                    <h2>Upcoming Additions</h2>
                    <p>The next version will include, but is not limited to the following:
                        <ul className='right-align-list'>
                            <li>Full account access and settings.</li>
                            <li/>
                            <li>User interface improvements.</li>
                            <li/>
                            <li>Automation that points out arbitrage opportunties or large odds discrepancies.</li>
                            <li/>
                            <li>Logistical regression machine learning models in order to assist with pick predictions.</li>
                        </ul> 
                    </p>
                </div>
                <div className="section-content flipped">
                    <img className="stock-image" src="/assets/stock-image-2.png" alt="Second Random"/>
                </div>
            </div>
        </div>
    );
};

export default Home;
