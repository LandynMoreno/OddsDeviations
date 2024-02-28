import json
import pandas as pd

# Load JSON from file with explicit encoding
json_file_path = 'projections.json'
with open(json_file_path, 'r', encoding='utf-8') as file:
    json_data = json.load(file)

# Create DataFrame
df_projections = pd.json_normalize(json_data['data'], max_level=3)

# Include information about new players from 'included'
df_new_players = pd.json_normalize(json_data['included'])

# Merge DataFrames based on 'id'
df = pd.merge(df_projections, df_new_players, left_on='relationships.new_player.data.id', right_on='id', suffixes=('', '_new_player'))

# Filter DataFrame to include only rows where 'relationships.league.data.id' is '7'
df = df[df['relationships.league.data.id'] == '7']

print(df.columns)
# Drop the specified columns
columns_to_drop = ['type', 'id', 'attributes.adjusted_odds',
                   'attributes.custom_image', 'attributes.discount_percentage',
                   'attributes.end_time', 'attributes.flash_sale_line_score',
                   'attributes.status', 'attributes.tv_channel', 'attributes.updated_at',
                   'relationships.duration.data', 'relationships.league.data.type',
                   'relationships.league.data.id', 'relationships.new_player.data.type', 'relationships.new_player.data.id',
                   'relationships.projection_type.data.type', 'relationships.projection_type.data.id',
                   'relationships.stat_type.data.type', 'relationships.stat_type.data.id', 'attributes.hr_20', 'attributes.today',
                   'relationships.duration.data.type', 'relationships.duration.data.id',
                   'attributes.lfg_ignored_leagues', 'attributes.rank_new_player', 'attributes.active',
                   'attributes.f2p_enabled', 'attributes.icon', 'attributes.last_five_games_enabled',
                   'attributes.league_icon_id', 'attributes.projections_count', 'attributes.show_trending',
                   'relationships.projection_filters.data', 'relationships.league.data.type_new_player',
                   'attributes.image_url', 'id_new_player', 'type_new_player', 'attributes.league', 'attributes.league_id',
                   'relationships.league.data.id_new_player', 'attributes.game_id']

df = df.drop(columns=columns_to_drop, errors='ignore')

# Rename columns
column_rename_mapping = {'attributes.board_time': 'Time Posted',
                         'attributes.is_promo': 'Promo',
                         'attributes.line_score': 'Line',
                         'attributes.odds_type': 'Odds Type',
                         'attributes.projection_type': 'Projection Type',
                         'attributes.rank': 'Rank',
                         'attributes.refundable': 'Refundable',
                         'attributes.start_time': 'Game Start Time',
                         'attributes.stat_type': 'Stat Type',
                         'attributes.description': 'Opponent',
                         'attributes.combo': 'Combo Play',
                         'attributes.display_name': 'Display Name',
                         'attributes.market': 'Team City',
                         'attributes.name': 'Name',
                         'attributes.position': 'Position',
                         'attributes.team': 'Team (Abrreviated)',
                         'attributes.team_name': 'Team Name'}

df = df.rename(columns=column_rename_mapping)

# Filter out rows with 'Odds Type' of 'demon' or 'goblin'
df = df[~df['Odds Type'].isin(['demon', 'goblin'])]

print(df.head(3))  # Print specific columns

# Save the filtered DataFrame to CSV
df.to_csv('output.csv', index=False)
