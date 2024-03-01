import './App.css';
import Header from "./components/Header"
import StatsGraphMenu from "./components/StatsGraphMenu";
import {useEffect, useState} from "react";

function App() {
    const [prices, setPrices] = useState([])
    const [marketCaps, setMarketCaps] = useState([])
    const [totalVolumes, setTotalVolumes] = useState([])
    const [pricesStats, setPrices_stats] = useState([])
    const [marketCapsStats, setMarketCapsStats] = useState([])
    const [totalVolumesStats, setTotalVolumesStats] = useState([])
    const [correlationMatrix, setCorrelationMatrix] = useState([])
    const [selectedCurrency, setSelectedCurrency] = useState("usd");
    const [selectedCryptoCurrency, setSelectedCryptoCurrency] = useState("bitcoin");

    function currencySelectionChangedHandler(value) {
        setSelectedCurrency(value);
    }

    function cryptoCurrencySelectionChangedHandler(value) {
        setSelectedCryptoCurrency(value);
    }

    useEffect(() => {
        async function fetchBtcData() {
            const url = `http://127.0.0.1:5000/get_crypto_stats/${selectedCurrency}/${selectedCryptoCurrency}`
            console.log(url)
            console.log(`currency: ${selectedCurrency}`)
            console.log(`cryptocurrency: ${selectedCryptoCurrency}`)
            const response = await fetch(url)
            const responseData = await response.json();
            console.log(responseData); // Logging responseData to console
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
    }, [selectedCurrency, selectedCryptoCurrency])

    return (
        <div className="App">
            <Header onCurrencyChange={currencySelectionChangedHandler}
                    onCryptoCurrencyChange={cryptoCurrencySelectionChangedHandler}/>
            <StatsGraphMenu
                initPrices={prices}
                initMarketCaps={marketCaps}
                initTotalVolumes={totalVolumes}
                initPricesStats={pricesStats}
                initMarketCapsStats={marketCapsStats}
                initTotalVolumesStats={totalVolumesStats}
                initCorrelationMatrix={correlationMatrix}
            />
        </div>
    );
}

export default App;
