import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import classes from "./Graph.module.css";

function Graph({title, data}) {
    function formatTime(timeString) {
        const time = new Date(timeString);
        const hours = time.getHours().toString().padStart(2, '0'); // Get hours and pad with leading zero if needed
        const minutes = time.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with leading zero if needed
        return `${hours}:${minutes}`; // Return formatted time string
    }

    function formatYAxis(value) {
        // Define a threshold for when to switch to scientific notation
        const threshold = 1e6; // For example, switch to scientific notation if value >= 1 million

        // Check if the value is greater than or equal to the threshold
        if (Math.abs(value) >= threshold) {
            // Convert the value to scientific notation with two decimal places
            const formattedValue = value.toExponential(2);
            return formattedValue;
        } else {
            // Return the original value if it's below the threshold
            return value;
        }
    }

    return (
        <>
            <h1 className={classes.title}>{title}</h1>
            <ResponsiveContainer height={500}>
                <LineChart data={data}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" strokeWidth="0.5"/>
                    <XAxis
                        dataKey="datetime"
                        stroke="#fff"
                        interval={Math.ceil(data.length / 10)}
                        angle={-45}
                        textAnchor="end"
                        tickFormatter={formatTime}
                        fontSize="13"
                    />
                    <YAxis stroke="#fff" fontSize="13" tickFormatter={formatYAxis}/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}

export default Graph;