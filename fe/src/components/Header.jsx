import { IoStatsChartOutline } from "react-icons/io5";
import classes from "./Header.module.css"

function Header() {
    return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <IoStatsChartOutline />
        Cryptocurrency Market Insights
      </h1>
    </header>
  );
}

export default Header;