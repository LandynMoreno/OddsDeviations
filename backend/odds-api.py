import requests
import pandas as pd

API_KEY = 'f8685598c539eb62bce16883f33aaca3'
SPORT = 'basketball_nba'
REGIONS = 'us'
MARKETS = 'h2h'
# Define all possible PROP_MARKETS
PROP_MARKETS = [
    'player_points', 'player_rebounds', 'player_assists', 
    'player_threes', 'player_blocks', 'player_steals', 
    'player_blocks_steals', 'player_turnovers', 
    'player_points_rebounds_assists', 'player_points_rebounds', 
    'player_points_assists', 'player_rebounds_assists'
]
# PROP_MARKETS = 'player_rebounds'
ODDS_FORMAT = 'american'
DATE_FORMAT = 'iso'

# Initialize player_props_data outside the main event loop
player_props_data = []

odds_response = requests.get(
    f'https://api.the-odds-api.com/v4/sports/{SPORT}/odds',
    params={
        'api_key': API_KEY,
        'regions': REGIONS,
        'markets': MARKETS,
        'oddsFormat': ODDS_FORMAT,
        'dateFormat': DATE_FORMAT,
    }
)

if odds_response.status_code == 200:
    odds_json = odds_response.json()

    for event in odds_json:
        event_id = event['id']
        home_team = event['home_team']
        away_team = event['away_team']
        print(f"Fetching player props for: {away_team} vs {home_team}")

        for prop_market in PROP_MARKETS:
            player_props_response = requests.get(
                f'https://api.the-odds-api.com/v4/sports/{SPORT}/events/{event_id}/odds',
                params={
                    'api_key': API_KEY,
                    'regions': REGIONS,
                    'markets': prop_market,
                    'oddsFormat': ODDS_FORMAT,
                    'dateFormat': DATE_FORMAT,
                }
            )

            if player_props_response.status_code == 200:
                player_props_json = player_props_response.json()

                for bookmaker in player_props_json['bookmakers']:
                    bookmaker_key = bookmaker['key']

                    for market in bookmaker['markets']:
                        if market['key'] == prop_market:
                            for outcome in market['outcomes']:
                                player_data = {
                                    'Bookmaker': bookmaker_key,
                                    'Player': outcome['description'],
                                    'Stat Type': prop_market,
                                    'Over/Under': outcome['name'],
                                    'Odds': outcome['price'],
                                    'Line': outcome['point']
                                }
                                player_props_data.append(player_data)
            else:
                print(f'Failed to get player props for event ID {event_id}: status_code {player_props_response.status_code}, response body {player_props_response.text}')

# Create the DataFrame after processing all events
player_props_df = pd.DataFrame(player_props_data)

# Dictionary mapping the old values to the new ones
replacements = {
    'player_points': 'Points',
    'player_rebounds': 'Rebounds',
    'player_assists': 'Assists',
    'player_threes': '3-PT Made',
    'player_blocks': 'Blocks',
    'player_steals': 'Steals',
    'player_blocks_steals': 'Blks+Stls',
    'player_turnovers': 'Turnovers',
    'player_points_rebounds_assists': 'Pts+Rebs+Asts',
    'player_points_rebounds': 'Pts+Rebs',
    'player_points_assists': 'Pts+Asts',
    'player_rebounds_assists': 'Rebs+Asts'
}

# Replace the values in the 'Stat Type' column
player_props_df['Stat Type'] = player_props_df['Stat Type'].replace(replacements)

# Save the DataFrame to a CSV file
player_props_df.to_csv('books-results.csv', index=False)
print('ALL BOOKS LINES HAVE BEEN FETCHED')

# Check the usage quota
print('Remaining requests', odds_response.headers['x-requests-remaining'])
print('Used requests', odds_response.headers['x-requests-used'])
