import {useEffect, useState} from "react";
import Graph from "./Graph";
import classes from "./GraphMenu.module.css"

function GraphMenu() {
    const [prices, setPrices] = useState([])
    const [marketCaps, setMarketCaps] = useState([])
    const [totalVolumes, setTotalVolumes] = useState([])
    const [activeGraphIndex, setActiveGraphIndex] = useState(0);

    useEffect(() => {
        async function fetchBtcData() {
            const response = await fetch('http://127.0.0.1:5000/bitcoin_market_value')
            const responseData = await response.json();
            if (responseData !== undefined) {
                setPrices(responseData.prices);
                setMarketCaps(responseData.market_caps)
                setTotalVolumes(responseData.total_volumes)
            }
        }

        fetchBtcData();
    }, [])

    const graphData = [
        {data: prices},
        {data: marketCaps},
        {data: totalVolumes}
    ];

    const graphs = graphData.map(graphDataPoint => (
        <div className={classes.graphContainer}>
            <Graph title={graphDataPoint.title} data={graphDataPoint.data}/>
        </div>
    ))

    return (
        <div className={classes.cryptoContainer}>
            <div className={classes.tabs}>
                <menu>
                    <button
                        className={activeGraphIndex === 0 ? classes.active : ""}
                        onClick={() => setActiveGraphIndex(0)}
                    >
                        Price
                    </button>
                    <button
                        className={activeGraphIndex === 1 ? classes.active : ""}
                        onClick={() => setActiveGraphIndex(1)}
                    >
                        Market Cap
                    </button>
                    <button
                        className={activeGraphIndex === 2 ? classes.active : ""}
                        onClick={() => setActiveGraphIndex(2)}
                    >
                        Total Volume
                    </button>
                </menu>
                <div id="tab-content">
                    {graphs[activeGraphIndex]}
                </div>
            </div>

        </div>
    );
}

export default GraphMenu;