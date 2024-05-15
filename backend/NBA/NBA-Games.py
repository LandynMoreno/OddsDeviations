from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

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


@app.route('/get-nba-games', methods=['GET'])
def get_nba_games():
    url = f"https://api.the-odds-api.com/v4/sports/{SPORT}/odds/?apiKey={API_KEY}&regions={REGIONS}&markets={MARKETS}"
    
    response = requests.get(url)
    games_data = response.json()

    games_list = []
    for game in games_data:
        game_info = {
            'id': game['id'],
            'game': f"{game['home_team']} vs {game['away_team']}"
        }
        games_list.append(game_info)
    
    print(jsonify(games_list))
    print('Remaining requests', response.headers['x-requests-remaining'])
    print('Used requests', response.headers['x-requests-used'])
    return jsonify(games_list)

@app.route('/get-player-props', methods=['POST'])
def get_player_props():
    data = request.json
    event_id = data['event_id']
    prop_type = data['prop_type']
    print(event_id)
    print(prop_type)

    player_props_data = []
    for prop_market in [prop_type]:
        response = requests.get(
            f'https://api.the-odds-api.com/v4/sports/{SPORT}/events/{event_id}/odds',
            params={
                'api_key': API_KEY,
                'regions': REGIONS,
                'markets': prop_market,
                'oddsFormat': ODDS_FORMAT,
                'dateFormat': DATE_FORMAT,
            }
        )
        if response.status_code == 200:
            odds_data = response.json()

            for bookmaker in odds_data['bookmakers']:
                for market in bookmaker['markets']:
                    if market['key'] == prop_market:
                        for outcome in market['outcomes']:
                            player_data = {
                                'Game' : odds_data['away_team'] + ' @ ' + odds_data['home_team'],
                                'Time' : odds_data['commence_time'],
                                'Bookmaker': bookmaker['title'],
                                'Player': outcome['description'],
                                'Prop': prop_market,
                                'OverUnder': outcome['name'],
                                'Odds': outcome['price'],
                                'Line': outcome['point']
                            }
                            player_props_data.append(player_data)
        else:
            print(f'Failed to get player props: {response.text}')
    print('Remaining requests', response.headers['x-requests-remaining'])
    print('Used requests', response.headers['x-requests-used'])
    return player_props_data

if __name__ == '__main__':
    app.run(debug=True)
