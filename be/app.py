from flask import Flask, jsonify
from flask_cors import CORS
from services.coin_gecko_api import CoinGeckoApi
from models.crypto_currency_data_set import CryptoCurrencyDataSet

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/bitcoin_market_value', methods=['GET'])
def get_bitcoin_market_value():
    bitcoin_market_data = CoinGeckoApi.get_bitcoin_market_data()
    if bitcoin_market_data is not None:
        btc_data_set = CryptoCurrencyDataSet(bitcoin_market_data)
        response = btc_data_set.to_dict()
        return response
    else:
        return jsonify({"error": "Failed to fetch Bitcoin market data"}), 500


if __name__ == '__main__':
    app.run(debug=True)
