from flask import Flask, jsonify
from flask_cors import CORS
from services.coin_gecko_api import CoinGeckoApi
from models.crypto_currency_data_set import CryptoCurrencyDataSet
from services.data_analyzer import DataAnalyzer

app = Flask(__name__)
CORS(app)


@app.route('/get_crypto_stats/<string:currency>/<string:cryptocurrency>', methods=['GET'])
def get_crypto_stats(currency, cryptocurrency):
    bitcoin_market_data = CoinGeckoApi.get_crypto_market_data(cryptocurrency, currency)
    if bitcoin_market_data is not None:
        btc_data_set = CryptoCurrencyDataSet(bitcoin_market_data)
        btc_data = btc_data_set.to_dict()
        btc_analized_data = DataAnalyzer.analyze_crypto_data(btc_data)
        btc_data.update(btc_analized_data)
        response = btc_data
        return jsonify(response)
    else:
        return jsonify({"error": "Failed to fetch Bitcoin market data"}), 500


if __name__ == '__main__':
    app.run(debug=True)
