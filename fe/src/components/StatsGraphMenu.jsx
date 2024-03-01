import {useState} from "react";
import Graph from "./Graph";
import StatsCard from "./StatsCard";
import classes from "./StatsGraphMenu.module.css"

function StatsGraphMenu({
                            initPrices,
                            initMarketCaps,
                            initTotalVolumes,
                            initPricesStats,
                            initMarketCapsStats,
                            initTotalVolumesStats,
                            initCorrelationMatrix
                        }) {
    const prices = initPrices;
    const marketCaps = initMarketCaps;
    const totalVolumes = initTotalVolumes;
    const pricesStats = initPricesStats;
    const marketCapsStats = initMarketCapsStats;
    const totalVolumesStats = initTotalVolumesStats;
    const correlationMatrix = initCorrelationMatrix;
    const [activeGraphIndex, setActiveGraphIndex] = useState(0);

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