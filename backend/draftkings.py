import requests

# Example URL (Ensure this is correct as per API documentation)
url = 'https://sportsbook.draftkings.com//sites/US-NJ-SB/api/v5/eventgroups/88808?format=json'

# Make the request
odds_response = requests.get(url)

# Check the response
print(f"Status Code: {odds_response.status_code}")
print(f"Headers: {odds_response.headers}")
print("First 500 characters of response text:")
print(odds_response.text[:500])

# Attempt to parse JSON only if content type is application/json
if 'application/json' in odds_response.headers['Content-Type']:
    try:
        odds_json = odds_response.json()
        print(odds_json)
    except ValueError as e:
        print("Failed to decode JSON:", e)
else:
    print("Response content is not in JSON format.")
