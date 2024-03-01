import pandas as pd


class DataAnalyzer:
    @staticmethod
    def analyze_crypto_data(crypto_data):
        # Create DataFrame for prices
        prices_df = pd.DataFrame(crypto_data['prices'])
        prices_df['datetime'] = pd.to_datetime(prices_df['datetime'])

        # Create DataFrame for market caps
        market_caps_df = pd.DataFrame(crypto_data['market_caps'])
        market_caps_df['datetime'] = pd.to_datetime(market_caps_df['datetime'])

        # Create DataFrame for total volumes
        total_volumes_df = pd.DataFrame(crypto_data['total_volumes'])
        total_volumes_df['datetime'] = pd.to_datetime(total_volumes_df['datetime'])

        # Descriptive statistics
        prices_stats = prices_df['value'].describe().to_dict()
        market_caps_stats = market_caps_df['value'].describe().to_dict()
        total_volumes_stats = total_volumes_df['value'].describe().to_dict()

        # Correlation analysis
        correlation_matrix = {
            'prices_vs_market_caps': prices_df['value'].corr(market_caps_df['value']),
            'prices_vs_total_volumes': prices_df['value'].corr(total_volumes_df['value']),
            'market_caps_vs_total_volumes': market_caps_df['value'].corr(total_volumes_df['value'])
        }

        return {
            'prices_stats': prices_stats,
            'market_caps_stats': market_caps_stats,
            'total_volumes_stats': total_volumes_stats,
            'correlation_matrix': correlation_matrix,
        }
