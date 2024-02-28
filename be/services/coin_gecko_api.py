import requests


class CoinGeckoApi:
    base_url = "https://api.coingecko.com/api/v3"

    @staticmethod
    def get_bitcoin_market_data():
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
                data = response.json()
                return data
            else:
                # Handle error response
                return None
        except Exception as e:
            print(f"Error fetching Bitcoin market value: {e}")
            return None

    @staticmethod
    def get_current_bitcoin_market_value():
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
                data = response.json()
                # Extract market value for Bitcoin from the response
                market_value = data["prices"][-1][1]  # Last element of prices list contains market value
                return market_value
            else:
                # Handle error response
                return None
        except Exception as e:
            print(f"Error fetching Bitcoin market value: {e}")
            return None
