import {useEffect, useState} from "react";
import Graph from "./Graph";
import StatsCard from "./StatsCard";
import classes from "./StatsGraphMenu.module.css"

function StatsGraphMenu() {
    const [prices, setPrices] = useState([])
    const [marketCaps, setMarketCaps] = useState([])
    const [totalVolumes, setTotalVolumes] = useState([])
    const [pricesStats, setPrices_stats] = useState([])
    const [marketCapsStats, setMarketCapsStats] = useState([])
    const [totalVolumesStats, setTotalVolumesStats] = useState([])
    const [correlationMatrix, setCorrelationMatrix] = useState([])
    const [activeGraphIndex, setActiveGraphIndex] = useState(0);

    useEffect(() => {
        async function fetchBtcData() {
            const response = await fetch('http://127.0.0.1:5000/bitcoin_market_value')
            const responseData = await response.json();
            if (responseData !== undefined) {
                setPrices(responseData.prices);
                setMarketCaps(responseData.market_caps)
                setTotalVolumes(responseData.total_volumes)
                setPrices_stats(responseData.prices_stats)
                setMarketCapsStats(responseData.market_caps_stats)
                setTotalVolumesStats(responseData.total_volumes_stats)
                setCorrelationMatrix(responseData.correlation_matrix)
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

    const statsData = [
        {title: 'Price Stats', statsData: pricesStats, correlationData: correlationMatrix},
        {title: 'Market Cap Stats', statsData: marketCapsStats, correlationData: correlationMatrix},
        {title: 'Total Volume Stats', statsData: totalVolumesStats, correlationData: correlationMatrix}
    ]

    const statsCards = statsData.map(statsDataPoint => (
        <StatsCard title={statsDataPoint.title} statsData={statsDataPoint.statsData}
                   correlationData={statsDataPoint.correlationData}/>
    ))

    const menuButtonTexts = [
        {text: 'Price'},
        {text: 'Market Cap'},
        {text: 'Total Volume'},
    ]

    const buttonsMenu = (
        <menu>
            {menuButtonTexts.map((btn, index) => (
                <button
                    key={index}
                    className={activeGraphIndex === index ? classes.active : ""}
                    onClick={() => setActiveGraphIndex(index)}
                >
                    {btn.text}
                </button>
            ))}
        </menu>
    );

    return (
        <div className={classes.cryptoContainer}>
            <div className={classes.tabs}>
                {buttonsMenu}
                <div className={classes.dashboard}>
                    {statsCards[activeGraphIndex]}
                    {graphs[activeGraphIndex]}
                </div>
            </div>
        </div>
    );
}

export default StatsGraphMenu;