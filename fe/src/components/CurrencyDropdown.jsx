import {Dropdown} from "react-bootstrap";
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from "./CurrencyDropdown.module.css";

function CurrencyDropdown({values, onChange}) {
    const [selectedCurrency, setSelectedCurrency] = useState(
        <>{values[0].icon}{values[0].name}</>
    );

    const handleCurrencySelect = (value) => {
        setSelectedCurrency(<>{value.icon} {value.name}</>);
        console.log(`Calling change with value: ${value.text}`)
        onChange(value.text);
    };

    const dropdownMenu = (
        <Dropdown.Menu style={{minWidth: 'auto'}}>
            {values.map((value) => (
                <Dropdown.Item
                    key={value.name}
                    onClick={() => handleCurrencySelect(value)}
                    style={{display: 'flex', alignItems: 'center'}}
                >
                    <div className={classes.parentContainer}>{value.icon} {value.name}</div>
                </Dropdown.Item>
            ))}
        </Dropdown.Menu>
    );


    return (
        <Dropdown>
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                {selectedCurrency}
            </Dropdown.Toggle>

            {dropdownMenu}
        </Dropdown>
    );
}

export default CurrencyDropdown;
