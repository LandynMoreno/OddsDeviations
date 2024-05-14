from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

@app.route('/get-nba-games', methods=['GET'])
def get_nba_games():
    api_key = 'f8685598c539eb62bce16883f33aaca3'
    url = f"https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey={api_key}&regions=us&markets=h2h"
    
    response = requests.get(url)
    games_data = response.json()

    games_list = []
    for game in games_data:
        game_info = {
            'id': game['id'],
            'game': f"{game['home_team']} vs {game['away_team']}"
        }
        games_list.append(game_info)
    
    return jsonify(games_list)

if __name__ == '__main__':
    app.run(debug=True)
