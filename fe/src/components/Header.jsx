import {IoStatsChartOutline} from "react-icons/io5";
import CurrencyDropdown from "./CurrencyDropdown";
import {PiCurrencyBtcThin, PiCurrencyDollarLight, PiCurrencyEur} from "react-icons/pi";
import {FaEthereum} from "react-icons/fa";
import {SiTether} from "react-icons/si";
import {BiPound} from "react-icons/bi";
import classes from "./Header.module.css"

function Header({onCurrencyChange, onCryptoCurrencyChange}) {
    const currencies = [
        {
            'icon': <PiCurrencyDollarLight size={25}/>,
            'name': <span className={classes.dropdownOptionText}>USD</span>,
            'text': "usd"
        },
        {
            'icon': <PiCurrencyEur size={25}/>,
            'name': <span className={classes.dropdownOptionText}>EUR</span>,
            'text': "eur"
        },
        {
            'icon': <BiPound size={25}/>,
            'name': <span className={classes.dropdownOptionText}>GBP</span>,
            'text': "gbp"
        },
    ];

    const cryptoCurrencies = [
        {
            'icon': <PiCurrencyBtcThin size={25}/>,
            'name': <span className={classes.dropdownOptionText}>Bitcoin</span>,
            'text': "bitcoin"
        },
        {
            'icon': <FaEthereum size={25}/>,
            'name': <span className={classes.dropdownOptionText}>Ethereum</span>,
            'text': "ethereum"
        },
        {
            'icon': <SiTether size={25}/>,
            'name': <span className={classes.dropdownOptionText}>Tether</span>,
            'text': "tether"
        },
    ];


    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>
                <IoStatsChartOutline/>
                Cryptocurrency Market Insights
            </h1>
            <div className={classes.dropdownMenus}>
                <CurrencyDropdown className={classes.dropdownMenu} values={currencies}
                                  onChange={onCurrencyChange}/>
                <div style={{marginLeft: '20px'}}/>
                <CurrencyDropdown className={classes.dropdownMenu} values={cryptoCurrencies}
                                  onChange={onCryptoCurrencyChange}/>
            </div>
        </header>
    );
}

export default Header;