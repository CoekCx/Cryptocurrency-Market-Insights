import requests
import time


class CoinGeckoApi:
    base_url = "https://api.coingecko.com/api/v3"
    btc_data = None
    last_fetch_time = 0
    fetch_interval = 1800  # 30 minutes in seconds

    @staticmethod
    def get_bitcoin_market_data():
        current_time = time.time()
        if CoinGeckoApi.btc_data and current_time - CoinGeckoApi.last_fetch_time < CoinGeckoApi.fetch_interval:
            return CoinGeckoApi.btc_data

        try:
            # Endpoint to get market data for Bitcoin
            endpoint = "/coins/bitcoin/market_chart"

            # Parameters to specify data range (past 24 hours)
            params = {
                "vs_currency": "usd",
                "days": "1"
            }

            # Make request to CoinGecko API
            response = requests.get(f"{CoinGeckoApi.base_url}{endpoint}", params=params)

            # Check if request was successful
            if response.status_code == 200:
                print('Fetched data from API')
                data = response.json()
                CoinGeckoApi.btc_data = data
                CoinGeckoApi.last_fetch_time = current_time
                return data
            else:
                # Handle error response
                return None
        except Exception as e:
            print(f"Error fetching Bitcoin market value: {e}")
            return None

    @staticmethod
    def get_current_bitcoin_market_value():
        current_time = time.time()
        if CoinGeckoApi.last_fetch_time and current_time - CoinGeckoApi.last_fetch_time < CoinGeckoApi.fetch_interval:
            # If within the fetch interval, return the previously fetched market value
            return CoinGeckoApi.btc_data["prices"][-1][1]

        try:
            # Endpoint to get market data for Bitcoin
            endpoint = "/coins/bitcoin/market_chart"

            # Parameters to specify data range (past 24 hours)
            params = {
                "vs_currency": "usd",
                "days": "1"
            }

            # Make request to CoinGecko API
            response = requests.get(f"{CoinGeckoApi.base_url}{endpoint}", params=params)

            # Check if request was successful
            if response.status_code == 200:
                print('Fetched data from API')
                data = response.json()
                # Extract market value for Bitcoin from the response
                market_value = data["prices"][-1][1]  # Last element of prices list contains market value
                CoinGeckoApi.last_fetch_time = current_time
                return market_value
            else:
                # Handle error response
                return None
        except Exception as e:
            print(f"Error fetching Bitcoin market value: {e}")
            return None
