import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import classes from './Graph.module.css'

function Graph({data}) {
    const CustomizedDot = (props) => {
        const {cx, cy} = props;

        return (
            <svg x={cx - 5} y={cy - 5} width={10} height={10} fill="gray" opacity="0" viewBox="0 0 1024 1024">
                <circle cx="512" cy="512" r="512"/>
            </svg>
        );
    };

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
            <ResponsiveContainer height={600}>
                <LineChart data={data}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" strokeWidth="0.5" className={classes.graph}/>
                    <XAxis
                        dataKey="datetime"
                        stroke="#fff"
                        interval={Math.ceil(data.length / 10)}
                        angle={-45}
                        textAnchor="end"
                        tickFormatter={formatTime}
                        fontSize="13"
                        className={classes.graph}
                    />
                    <YAxis stroke="#fff" fontSize="13" tickFormatter={formatYAxis} className={classes.graph}/>
                    <Tooltip contentStyle={{background: "black", opacity: "0.65"}} labelStyle={{color: "white"}}
                             itemStyle={{color: "white"}} className={classes.graph}/>
                    <Line type="monotone" dataKey="value" stroke="#F5F5F5" activeDot={{r: 8}} dot={<CustomizedDot/>}
                          className={classes.graph}/>
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}

export default Graph;