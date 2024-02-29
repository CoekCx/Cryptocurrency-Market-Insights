import {useEffect, useState} from "react";

function DayGraph() {
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
        <>
            {prices.length > 0 && (
                <div>
                    <h1>Prices</h1>
                    <ol>
                        {prices.map((value) => (<li><p>{value[0]}: {value[1]}</p></li>))}
                    </ol>
                </div>
            )}
            {marketCaps.length > 0 && (
                <div>
                    <h1>Market Caps</h1>
                    <ol>
                        {marketCaps.map((value) => (<li><p>{value[0]}: {value[1]}</p></li>))}
                    </ol>
                </div>
            )}
            {totalVolumes.length > 0 && (
                <div>
                    <h1>Total Volumes</h1>
                    <ol>
                        {totalVolumes.map((value) => (<li><p>{value[0]}: {value[1]}</p></li>))}
                    </ol>
                </div>
            )}
        </>
    );
}

export default DayGraph;