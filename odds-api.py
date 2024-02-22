import requests
import pandas as pd

API_KEY = 'f8685598c539eb62bce16883f33aaca3'
SPORT = 'basketball_nba'
REGIONS = 'us'
MARKETS = 'h2h'
# test
# PROP_MARKETS = 'player_points,player_rebounds,player_assists,player_threes,player_blocks,player_steals,player_blocks_steals,player_turnovers,player_points_rebounds_assists,player_points_rebounds,player_points_assists,player_rebounds_assists'
PROP_MARKETS = 'player_rebounds'
ODDS_FORMAT = 'american'
DATE_FORMAT = 'iso'

# Initialize an empty pandas DataFrame to store player props data
player_props_df = pd.DataFrame(columns=['Event ID', 'Player Points', 'Player Rebounds', 'Player Assists', 'Player Threes', 'Player Blocks', 'Player Steals', 'Player Blocks/Steals', 'Player Turnovers', 'Player Points/Rebounds/Assists', 'Player Points/Rebounds', 'Player Points/Assists', 'Player Rebounds/Assists'])

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

if odds_response.status_code != 200:
    print(f'Failed to get odds: status_code {odds_response.status_code}, response body {odds_response.text}')
else:
    odds_json = odds_response.json()

    for event in odds_json:
        event_id = event['id']
        print(f"Fetching player props for event ID: {event_id}")

        player_props_response = requests.get(
            f'https://api.the-odds-api.com/v4/sports/{SPORT}/events/{event_id}/odds',
            params={
                'api_key': API_KEY,
                'regions': REGIONS,
                'markets': PROP_MARKETS,
                'oddsFormat': ODDS_FORMAT,
                'dateFormat': DATE_FORMAT,
            }
        )

        if player_props_response.status_code != 200:
            print(f'Failed to get player props for event ID {event_id}: status_code {player_props_response.status_code}, response body {player_props_response.text}')
        else:
            player_props_json = player_props_response.json()
            print (player_props_json)
            # Process player props JSON data as needed
            # Assuming player_props_json is a dictionary containing player props data
            # You need to extract the relevant information and append it to the DataFrame
            # For example:
            # player_props_data = {
            #     'Event ID': event_id,
            #     'Player Points': player_props_json['player_points'],
            #     'Player Rebounds': player_props_json['player_rebounds'],
            #     'Player Assists': player_props_json['player_assists'],
            #     'Player Threes': player_props_json['player_threes'],
            #     'Player Blocks': player_props_json['player_blocks'],
            #     'Player Steals': player_props_json['player_steals'],
            #     'Player Blocks/Steals': player_props_json['player_blocks_steals'],
            #     'Player Turnovers': player_props_json['player_turnovers'],
            #     'Player Points/Rebounds/Assists': player_props_json['player_points_rebounds_assists'],
            #     'Player Points/Rebounds': player_props_json['player_points_rebounds'],
            #     'Player Points/Assists': player_props_json['player_points_assists'],
            #     'Player Rebounds/Assists': player_props_json['player_rebounds_assists']
            # }

            # Append player props data to the DataFrame
            # player_props_df = player_props_df.append(player_props_data, ignore_index=True)

    # Save DataFrame to CSV
    # player_props_df.to_csv('player_props_data.csv', index=False)

    # Check the usage quota
    print('Remaining requests', odds_response.headers['x-requests-remaining'])
    print('Used requests', odds_response.headers['x-requests-used'])
