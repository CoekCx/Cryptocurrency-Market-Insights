from datetime import datetime
from tabulate import tabulate


class CryptoCurrencyDataSet:
    def __init__(self, data):
        self._prices = self._convert_to_datetime(data.get('prices', []))
        self._market_caps = self._convert_to_datetime(data.get('market_caps', []))
        self._total_volumes = self._convert_to_datetime(data.get('total_volumes', []))

    @staticmethod
    def _convert_to_datetime(data_list):
        return [(datetime.utcfromtimestamp(timestamp / 1000), value) for timestamp, value in data_list]

    @property
    def prices(self):
        return self._prices

    @property
    def market_caps(self):
        return self._market_caps

    @property
    def total_volumes(self):
        return self._total_volumes

    def __repr__(self):
        prices_table = tabulate(self._prices, headers=["Timestamp", "Value"], tablefmt="pretty")
        market_caps_table = tabulate(self._market_caps, headers=["Timestamp", "Value"], tablefmt="pretty")
        total_volumes_table = tabulate(self._total_volumes, headers=["Timestamp", "Value"], tablefmt="pretty")

        return f"Prices:\n{prices_table}\n\nMarket Caps:\n{market_caps_table}\n\nTotal Volumes:\n{total_volumes_table}"
