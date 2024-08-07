# OddsDeviations
 
Crafted with React, Python, and more, Odds Deviations is a tool designed for betting enthusiasts seeking to maximize their wagering value. By allowing users to select specific player props, this tool analyzes and identifies the most advantageous bets. It highlights discrepancies between daily fantasy sports (DFS) apps and traditional sportsbooks, pinpointing bets that are heavily favored by sportsbooks yet undervalued on DFS platforms. With the strategic insights, bettors can exploit these differences to their benefit, ensuring they place bets where the value surpasses the odds offered by sportsbooks.

The purpose of this tool is essentially to allow a bettor to capitalize on value when betting.
For example, unlike sportsbooks, there are fixed odds on DFS apps. By only playing: a.
lines that are favored by sportsbooks and b. discrepancies between the DFS apps and sportsbooks, you
become advantageous. Ex: If you play on a DFS app 2 picks for a 3x payout, this is the equivalent of -137 odds for each.
Therefore, if every sportsbook is offering -160 or worse odds on those same plays, there is a better value in playing those 2 plays on the DFS app.

How to use this project:
Clone the Repo then perform the following commands in your terminal.

To run the frontend:
cd OddsDeviations -> cd frontend

Now from the ~/OddsDeviations/Frontend run the following command: npm start

This should boot up an instance of the frontend on your localhost that will be making endpoint calls to the localhost:5000. Therefore, we should load up the backend on the localhost as well.

To run the backend:
On a seperately running terminal, cd OddsDeviations -> cd backend -> cd NBA

Now from the ~/OddsDeviations/Backend/NBA run the following command: flask --app .\NBA-Games.py run

This should boot up an instance of the backend on your localhost that will be the REST API server to the frontend.
