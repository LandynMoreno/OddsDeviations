import React from 'react';
import './Home.css'; // Make sure to include your actual CSS file name

const Home = () => {
    return (
        <div className="container">
            <div className="welcome-container">
                <h1 className="welcome-title">Make your bets, smarter!</h1>
                <p className="welcome-subheading">Use the data to your advantage and play discrepancies in your favor.</p>
                <button className="welcome-button">Check out the tool</button>
            </div>
            <div className="section">
                <div className="section-content">
                    <h2>Purpose</h2>
                    <p>The purpose of this tool is essentially to allow a bettor to capitalize on value when betting.
                        For example, unlike sportsbooks, there are fixed odds on DFS apps. By only playing: a.
                        lines that are favored by sportsbooks and b. discrepancies between the DFS apps and sportsbooks, you
                        become advantageous. Ex: If you play on a DFS app 2 picks for a 3x payout, this is the equivalent of -137 odds for each.
                        Therefore, if every sportsbook is offering -160 or worse odds on those same plays, there is a better value in playing those 2
                        plays on the DFS app. </p>
                </div>
                <div className="section-content">
                    <img className="stock-image" src="/assets/stock-image-1.png" alt="Stock Image"/>
                </div>
            </div>
            <div className="section flipped">
                <div className="section-content flipped">
                    <h2>Upcoming Additions</h2>
                    <p>The next version will include, but is not limited to the following. The tool will allow for full account
                        access and settings. Additionally, expect a more cleaned up UI of the results from the tool. Lastly, the
                        tool may be adding logistic regression machine learning models in order to assist with pick predictions. 
                    </p>
                </div>
                <div className="section-content flipped">
                    <img className="stock-image" src="/assets/stock-image-2.jpg" alt="Second Stock Image"/>
                </div>
            </div>
        </div>
    );
};

export default Home;
