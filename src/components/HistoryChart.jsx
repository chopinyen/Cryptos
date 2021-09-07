import React, { useRef, useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
import { historyOptions } from "../chartConfigs/chartConfigs";
import dateFormat from 'dateformat';

Chart.register(...registerables);

const HistoryChart = ({ data }) => {
    const chartRef = useRef();
    const { day, week, year, detail } = data;
    const [timeFormat, setTimeFormat] = useState("1y");

    const determineTimeFormat = () => {
        switch (timeFormat) {
            case "24h":
                return day;
            case "7d":
                return week;
            case "1y":
                return year;
            default:
                return day;
        }
    };

    const determineXFormat = () => {
        switch (timeFormat) {
            case "24h":
                return "shortTime";
            case "7d":
                return "m/d/yy HH:MM";
            case "1y":
                return "shortDate";
            default:
                return "shortTime";
        }
    };

    useEffect(() => {
        var chartInstance;

        if (chartRef && chartRef.current && detail) {
            chartInstance = new Chart(chartRef.current, {
                type: "line",
                data: {
                    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    // datasets: [{
                    //     label: `${detail.name} price`,
                    //     data: [12, 19, 3, 5, 2, 3],
                    //     borderWidth: 1
                    // }]
                    labels: determineTimeFormat().map((item) => dateFormat(new Date(item.x), determineXFormat())),

                    datasets: [
                        {
                            label: `${detail.name} price`,
                            data: determineTimeFormat().map((item) => item.y),
                            backgroundColor: "rgba(174, 305, 194, 0.5)",
                            borderColor: "rgba(174, 305, 194, 0.4)",
                            pointRadius: 0,
                        },
                    ],
                },
                options: {
                    ...historyOptions,
                },
            });
        }

        // when component unmounts
        return () => {
            if(chartInstance != null)
                chartInstance.destroy();
        };
    }, [timeFormat]);

    const renderPrice = () => {
        if (detail) {
            return (
                <>
                    <p className="my-0">
                        Current: ${detail.current_price.toFixed(2)}
                    </p>
                    <p
                        className={
                            detail.price_change_24 < 0
                                ? "text-danger my-0"
                                : "text-success my-0"
                        }
                    >
                        {detail.price_change_percentage_24h.toFixed(2)}%
                    </p>
                </>
            );
        }
    };

    return (
        <div className="bg-white border mt-2 rounded p-3">
            <div>{renderPrice()}</div>
            <div>
                <canvas
                    ref={chartRef}
                    id="myChart"
                    width={250}
                    height={250}
                ></canvas>
            </div>
            <div className="chart-button mt-1">
                <button
                    onClick={() => setTimeFormat("24h")}
                    className="btn btn-outline-secondary btn-sm"
                >
                    24h
                </button>
                <button
                    onClick={() => setTimeFormat("7d")}
                    className="btn btn-outline-secondary btn-sm mx-1"
                >
                    7d
                </button>
                <button
                    onClick={() => setTimeFormat("1y")}
                    className="btn btn-outline-secondary btn-sm"
                >
                    1y
                </button>
            </div>
        </div>
    );
};

export default HistoryChart;
