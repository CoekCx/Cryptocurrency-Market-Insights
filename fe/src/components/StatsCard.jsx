import StatWithToolTip from './StatWithToolTip'
import classes from './StatsCard.module.css';

function StatsCard({title, statsData, correlationData, currencySymbol}) {
    const currentStatType = title.slice(0, -6).toLowerCase() + 's';

    const roundDecimals = (value, numberOfDecimals = 2) => {
        // Check if the value is a number
        if (typeof value !== 'number') {
            return value; // Return the value unchanged if it's not a number
        }

        // Round the value to the specified number of decimals
        const roundedValue = Number.parseFloat(value).toFixed(numberOfDecimals);

        // Convert the rounded value to a string with commas as thousand separators
        return roundedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const stats = [
        {
            title: 'Prices vs Market Caps',
            body: `The correlation coefficient between prices and market capitalizations.`,
            label: 'Correlation (P-MC):',
            value: `${roundDecimals(correlationData.prices_vs_market_caps * 100)}%`
        },
        {
            title: 'Prices vs Total Volumes',
            body: `The correlation coefficient between prices and total volumes`,
            label: 'Correlation (P-TV):',
            value: `${roundDecimals(correlationData.prices_vs_total_volumes * 100)}%`
        },
        {
            title: 'Market Caps vs Total Volumes',
            body: `The correlation coefficient between market capitalizations and total volumes.`,
            label: 'Correlation (MC-TV):',
            value: `${roundDecimals(correlationData.market_caps_vs_total_volumes * 100)}%`
        },
        {
            title: 'The Count',
            body: `Number of data points in the ${currentStatType} dataset.`,
            label: 'Count:',
            value: statsData.count
        },
        {
            title: 'The Mean',
            body: `The average value of ${currentStatType} in the dataset.`,
            label: 'Mean:',
            value: `${roundDecimals(statsData.mean)} ${currencySymbol}`
        },
        {
            title: 'The Standard Deviation',
            body: `The standard deviation of ${currentStatType} in the dataset.`,
            label: 'Standard Deviation:',
            value: `${roundDecimals(statsData.std)} ${currencySymbol}`
        },
        {
            title: 'The Minimum',
            body: `The minimum value of ${currentStatType} in the dataset.`,
            label: 'Minimum:',
            value: `${roundDecimals(statsData.min)} ${currencySymbol}`
        },
        {
            title: 'The First Quartile',
            body: `The 25th percentile of ${currentStatType} in the dataset.`,
            label: '25%:',
            value: `${roundDecimals(statsData['25%'])} ${currencySymbol}`
        },
        {
            title: 'The Median',
            body: `The 50th percentile of ${currentStatType} in the dataset.`,
            label: '50%:',
            value: `${roundDecimals(statsData['50%'])} ${currencySymbol}`
        },
        {
            title: 'The Third Quartile',
            body: `The 75th percentile of ${currentStatType} in the dataset.`,
            label: '75%:',
            value: `${roundDecimals(statsData['75%'])} ${currencySymbol}`
        },
        {
            title: 'The Maximum',
            body: `The maximum value of ${currentStatType} in the dataset.`,
            label: 'Maximum:',
            value: `${roundDecimals(statsData.max)} ${currencySymbol}`
        },
    ];

    const statsElements = stats.map((stat, index) => (
        <StatWithToolTip title={stat.title} body={stat.body}>
            <div className={classes.dataRow} key={index}>
                <p className={classes.label}>{stat.label}</p>
                <p className={classes.value}>{stat.value}</p>
            </div>
        </StatWithToolTip>
    ))

    return (
        <div className={classes.card}>
            <h1 className={classes.title}>{title}</h1>

            {statsElements}
        </div>
    );
}

export default StatsCard;
