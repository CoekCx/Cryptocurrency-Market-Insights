import classes from './StatsCard.module.css';

function StatsCard({title, statsData, correlationData}) {
    const roundDecimals = (value, numberOfDecimals = 4) => {
        return Number.parseFloat(value).toFixed(numberOfDecimals);
    };

    return (
        <div className={classes.card}>
            <h1 className={classes.title}>{title}</h1>

            <div className={classes.dataRow}>
                <p className={classes.label}>Count:</p>
                <p className={classes.value}>{statsData.count}</p>
            </div>
            <div className={classes.dataRow}>
                <p className={classes.label}>Mean:</p>
                <p className={classes.value}>{roundDecimals(statsData.mean)}</p>
            </div>
            <div className={classes.dataRow}>
                <p className={classes.label}>Standard Deviation:</p>
                <p className={classes.value}>{roundDecimals(statsData.std)}</p>
            </div>
            <div className={classes.dataRow}>
                <p className={classes.label}>Minimum:</p>
                <p className={classes.value}>{roundDecimals(statsData.min)}</p>
            </div>
            <div className={classes.dataRow}>
                <p className={classes.label}>25%:</p>
                <p className={classes.value}>{roundDecimals(statsData['25%'])}</p>
            </div>
            <div className={classes.dataRow}>
                <p className={classes.label}>50%:</p>
                <p className={classes.value}>{roundDecimals(statsData['50%'])}</p>
            </div>
            <div className={classes.dataRow}>
                <p className={classes.label}>75%:</p>
                <p className={classes.value}>{roundDecimals(statsData['75%'])}</p>
            </div>
            <div className={classes.dataRow}>
                <p className={classes.label}>Maximum:</p>
                <p className={classes.value}>{roundDecimals(statsData.max)}</p>
            </div>
            <div className={classes.dataRow}>
                <p className={classes.label}>Correlation (P-MC):</p>
                <p className={classes.value}>{roundDecimals(correlationData.prices_vs_market_caps * 100, 2)}%</p>
            </div>
            <div className={classes.dataRow}>
                <p className={classes.label}>Correlation (P-TV):</p>
                <p className={classes.value}>{roundDecimals(correlationData.prices_vs_total_volumes * 100, 2)}%</p>
            </div>
            <div className={classes.dataRow}>
                <p className={classes.label}>Correlation (MC-TV):</p>
                <p className={classes.value}>{roundDecimals(correlationData.market_caps_vs_total_volumes * 100, 2)}%</p>
            </div>
        </div>
    );
}

export default StatsCard;
