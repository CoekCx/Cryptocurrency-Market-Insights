# Cryptocurrency Market Insights

A web application that provides detailed insights into cryptocurrency data using the CoinGecko API. The backend is built with Python Flask, while the frontend is developed in React.

[![Demo video](https://img.youtube.com/vi/)](https://www.youtube.com/embed/7OrIbBUfW68)

## Features

- Fetches real-time data for Bitcoin, Ethereum, and Tether.
- Allows users to view data in USD, EUR, or GBP.
- Displays initial CoinGecko API data in graphical form.
- Provides statistical analysis for prices, market caps, and total volumes:
  - Count
  - Mean
  - Standard Deviation
  - Minimum
  - 25th Percentile
  - Median (50th Percentile)
  - 75th Percentile
  - Maximum
- Calculates correlations between:
  - Prices and market caps
  - Prices and total volumes
  - Market caps and total volumes

## Backend (Python Flask)

### Endpoints

1. `/get_crypto_stats/<string:currency>/<string:cryptocurrency>`: Fetches raw data from the CoinGecko API and information derived from analyzing said data.

### Setup & Installation

1. Clone this repository: `git clone https://github.com/CoekCx/Cryptocurrency-Market-Insights`
2. Navigate to the project directory: `cd CryptoMarketInsights`
3. Install dependencies: `pip install -r requirements.txt`
4. Run the app: `flask run`

## Frontend (React)

Displays fetched and analyzed cryptocurrency data in an intuitive UI.

### Setup & Installation

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the app: `npm start`

## Warning
Please note that the cryptocurrency market is highly volatile, and investing in cryptocurrencies carries significant risks. Only invest money that you can afford to lose.

## License
This project is licensed under the [MIT License](LICENSE).
