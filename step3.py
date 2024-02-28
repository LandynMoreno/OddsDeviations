import pandas as pd

# Load the CSV files into DataFrames
books_results_df = pd.read_csv('./books-results.csv')
output_df = pd.read_csv('./output.csv')

# Ensure column names match your descriptions (adjust column names as necessary)
# Assuming the relevant columns in `output.csv` are exactly named 'Stat Type', 'Combo Play', and 'Display Name'

# Filter `output_df` for the conditions specified
filtered_output_df = output_df[
    (output_df['Stat Type'] == 'Rebounds') &
    (output_df['Combo Play'] == False)  # Assuming 'Combo Play' is a boolean column
]

# Merge the filtered `output_df` with `books_results_df` based on the player's name
# Assuming the player name column in `books_results_df` is named 'player' (adjust as necessary)
combined_df = pd.merge(
    filtered_output_df,
    books_results_df,
    left_on='Display Name',
    right_on='Player',
    how='inner'
)

# Select and rename columns as specified
final_df = combined_df[[
    'Bookmaker', 'Player', 'Split', 'Odds', 'Line_y', 'Line_x'
]].rename(columns={'Line_y': 'Books', 'Line_x': 'DFS'})

# Convert odds to numeric for comparison, assuming 'Odds' are stored as strings
final_df['Odds'] = pd.to_numeric(final_df['Odds'], errors='coerce')

# Define the list of specified bookmakers
specified_bookmakers = ['draftkings', 'fanduel', 'bovada', 'betmgm', 'mybookieag']

# Check if 'Bookmaker' is one of the specified bookmakers
bookmaker_condition = final_df['Bookmaker'].isin(specified_bookmakers)

# Update conditions to include the bookmaker condition
condition1 = (final_df['DFS'] > final_df['Books']) & (final_df['Split'] == 'Under') & (final_df['Odds'] <= -110) & bookmaker_condition
condition2 = (final_df['DFS'] < final_df['Books']) & (final_df['Split'] == 'Over') & (final_df['Odds'] <= -110) & bookmaker_condition
condition3 = (final_df['DFS'] == final_df['Books']) & (final_df['Odds'] <= -130) & bookmaker_condition

# Filter rows that match any of the conditions
priority_rows = final_df[condition1 | condition2 | condition3]

# Filter rows that do not match any of the conditions
other_rows = final_df[~(condition1 | condition2 | condition3)]

# Concatenate the priority rows and the other rows
sorted_final_df = pd.concat([priority_rows, other_rows])

# Save the rearranged DataFrame to a new CSV file
sorted_final_csv_path = './sorted_combined_books_output.csv'
sorted_final_df.to_csv(sorted_final_csv_path, index=False)

sorted_final_csv_path
