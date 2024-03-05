import pandas as pd
import numpy as np


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

        # Add outliers to prices_df using Z-score method
        threshold = 3

        prices_z_scores = np.abs((prices_df['value'] - prices_df['value'].mean()) / prices_df['value'].std())
        prices_df['is_outlier'] = prices_z_scores > threshold

        market_caps_z_scores = np.abs(
            (market_caps_df['value'] - market_caps_df['value'].mean()) / market_caps_df['value'].std())
        market_caps_df['is_outlier'] = market_caps_z_scores > threshold

        total_volumes_z_scores = np.abs(
            (total_volumes_df['value'] - total_volumes_df['value'].mean()) / total_volumes_df['value'].std())
        total_volumes_df['is_outlier'] = total_volumes_z_scores > threshold

        # Get outliers
        prices_outliers = prices_df[prices_df['is_outlier']]['value'].tolist()
        market_caps_outliers = market_caps_df[market_caps_df['is_outlier']]['value'].tolist()
        total_volumes_outliers = total_volumes_df[total_volumes_df['is_outlier']]['value'].tolist()

        # Add outliers to the stats
        prices_stats['outliers'] = prices_outliers
        market_caps_stats['outliers'] = market_caps_outliers
        total_volumes_stats['outliers'] = total_volumes_outliers

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
