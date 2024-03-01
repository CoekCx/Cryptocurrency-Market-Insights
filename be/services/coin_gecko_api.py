import requests
import time


class CoinGeckoApi:
    base_url = "https://api.coingecko.com/api/v3"
    last_received_data = {}
    last_fetch_times = {}  # Dictionary to store last fetch time for each combination
    fetch_interval = 1800  # 30 minutes in seconds

    @staticmethod
    def get_crypto_market_data(cryptocurrency, vs_currency):
        current_time = time.time()
        last_fetch_time = CoinGeckoApi.last_fetch_times.get((cryptocurrency, vs_currency), 0)
        if current_time - last_fetch_time < CoinGeckoApi.fetch_interval:
            return CoinGeckoApi.last_received_data.get((cryptocurrency, vs_currency))

        try:
            # Endpoint to get market data for specified cryptocurrency
            endpoint = f"/coins/{cryptocurrency}/market_chart"

            # Parameters to specify data range (past 24 hours) and currency
            params = {
                "vs_currency": vs_currency,
                "days": "1"
            }

            # Make request to CoinGecko API
            response = requests.get(f"{CoinGeckoApi.base_url}{endpoint}", params=params)

            # Check if request was successful
            if response.status_code == 200:
                print('Fetched data from API')
                data = response.json()
                CoinGeckoApi.last_fetch_times[(cryptocurrency, vs_currency)] = current_time
                CoinGeckoApi.last_received_data[(cryptocurrency, vs_currency)] = data
                return data
            else:
                # Handle error response
                return None
        except Exception as e:
            print(f"Error fetching {cryptocurrency} market data: {e}")
            return None

    @staticmethod
    def get_current_crypto_market_value(cryptocurrency, vs_currency):
        current_time = time.time()
        last_fetch_time = CoinGeckoApi.last_fetch_times.get((cryptocurrency, vs_currency), 0)
        if current_time - last_fetch_time < CoinGeckoApi.fetch_interval:
            # If within the fetch interval, return the previously fetched market value
            return CoinGeckoApi.last_received_data.get((cryptocurrency, vs_currency))["prices"][-1][1]

        try:
            # Endpoint to get market data for specified cryptocurrency
            endpoint = f"/coins/{cryptocurrency}/market_chart"

            # Parameters to specify data range (past 24 hours) and currency
            params = {
                "vs_currency": vs_currency,
                "days": "1"
            }

            # Make request to CoinGecko API
            response = requests.get(f"{CoinGeckoApi.base_url}{endpoint}", params=params)

            # Check if request was successful
            if response.status_code == 200:
                print('Fetched data from API')
                data = response.json()
                # Extract market value for specified cryptocurrency from the response
                market_value = data["prices"][-1][1]  # Last element of prices list contains market value
                CoinGeckoApi.last_fetch_times[(cryptocurrency, vs_currency)] = current_time
                CoinGeckoApi.last_received_data[(cryptocurrency, vs_currency)] = data
                return market_value
            else:
                # Handle error response
                return None
        except Exception as e:
            print(f"Error fetching {cryptocurrency} market value: {e}")
            return None
