import pandas as pd

# Load the CSV files into DataFrames
books_results_df = pd.read_csv('./books-results.csv')
output_df = pd.read_csv('./output.csv')

# Merge the DataFrames based on your specified conditions
combined_df = pd.merge(
    books_results_df,
    output_df[['Name', 'Stat Type', 'Line']],
    left_on=['Player', 'Stat Type'],
    right_on=['Name', 'Stat Type'],
    how='inner'
)

# Select and rename columns as specified, assuming 'Line_y' from books_results and 'Line_x' from output
final_df = combined_df.drop(columns=['Name']).rename(columns={'Line_y': 'DFS', 'Line_x': 'Books'})

# Convert odds to numeric for comparison, assuming 'Odds' are stored as strings
final_df['Odds'] = pd.to_numeric(final_df['Odds'], errors='coerce')

# Define new conditions
final_df['Edge Type'] = pd.NA  # Initialize the 'Edge Type' column with NA values

# Define the list of specified bookmakers
specified_bookmakers = ['draftkings', 'fanduel']

# Check if 'Bookmaker' is one of the specified bookmakers
bookmaker_condition = final_df['Bookmaker'].isin(specified_bookmakers)

final_df.loc[(final_df['Books'] > final_df['DFS']) & (final_df['Over/Under'] == 'Over') & (final_df['Odds'] <= -120) & (bookmaker_condition), 'Edge Type'] = 'Over Discrepancy'
final_df.loc[(final_df['Books'] < final_df['DFS']) & (final_df['Over/Under'] == 'Under') & (final_df['Odds'] <= -120) & (bookmaker_condition), 'Edge Type'] = 'Under Discrepancy'
final_df.loc[(final_df['Books'] == final_df['DFS']) & (final_df['Odds'] <= -135) & (bookmaker_condition), 'Edge Type'] = 'Heavy Favorite'
final_df.loc[(final_df['Books'] == final_df['DFS']) & (final_df['Odds'] <= -125) & (final_df['Odds'] > -135) & (bookmaker_condition), 'Edge Type'] = 'Favored Line'

# Filter out rows that don't meet any conditions
final_df = final_df.dropna(subset=['Edge Type'])

# Order the DataFrame based on the 'Edge Type' column to prioritize the conditions
# This ordering assumes the categorical sorting of the 'Edge Type' column values matches your desired order
ordered_df = final_df.sort_values(by='Edge Type', key=lambda col: col.map({'Over Discrepancy': 1, 'Under Discrepancy': 2, 'Heavy Favorite': 3, 'Favored Line': 4}))

# Save the ordered DataFrame to a new CSV file
ordered_df.to_csv('./ordered_combined_books_output.csv', index=False)

print("CSV file has been ordered and saved.")
