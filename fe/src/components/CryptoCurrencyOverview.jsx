import {useEffect, useState} from "react";
import Graph from "./Graph";
import classes from "./CryptoCurrencyOverview.module.css"

function CryptoCurrencyOverview() {
    const [prices, setPrices] = useState([])
    const [marketCaps, setMarketCaps] = useState([])
    const [totalVolumes, setTotalVolumes] = useState([])

    useEffect(() => {
        async function fetchBtcData() {
            const response = await fetch('http://127.0.0.1:5000/bitcoin_market_value')
            const responseData = await response.json();
            setPrices(responseData.prices);
            setMarketCaps(responseData.market_caps)
            setTotalVolumes(responseData.total_volumes)
        }

        fetchBtcData();
    }, [])

    return (
        <div className={classes.cryptoContainer}>
            <div className={classes.graphContainer}>
                <Graph title="BTC Price" data={prices}/>
            </div>
            <div className={classes.graphContainer}>
                <Graph title="BTC Market Cap" data={marketCaps}/>
            </div>
            <div className={classes.graphContainer}>
                <Graph title="BTC Total Volume" data={totalVolumes}/>
            </div>
        </div>
    );
}

export default CryptoCurrencyOverview;