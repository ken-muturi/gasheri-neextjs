import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { range } from 'lodash'

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const LineChart = () => {
    const [data, setData] = useState([]);
    const [year, setYear] = useState(2024);
    const [month, setMonth] = useState(1);

    const days = getDaysInMonth(year, month);

    console.log({ year })
    console.log({ month })
    console.log({ days })
    useEffect(() => {
        const getData = async () => {
            const res = await fetch('/api/weather-stations/humidity/monthly');
            const relativeHumidity = await res.json();
            setData(relativeHumidity);
        }
        getData();
    }, [])

    const daysArray = [...Array(days).keys()].map(i => i + 1);
    const series = daysArray.map(day => {
        const daysHumidity = data.find(d => d.day === day && d.month === month + 1)
        return {
            avg: parseFloat(daysHumidity?.avg.toFixed(2) ?? 0),
            min: parseFloat(daysHumidity?.min.toFixed(2) ?? 0),
            max: parseFloat(daysHumidity?.max.toFixed(2) ?? 0),
        }
    });

    const chartOptions = {
        title: {
            text: 'Monthly Relative Humidity'
        },
        xAxis: {
            categories: daysArray // list of number 1 to days (28/29/30/31)
        },
        yAxis: {
            min: 0,
            tickInterval: 5,
            max: 60,
        },
        series: [
            {
                name: 'Min Humidity',
                data: series.map(d => d.min)
            },
            {
                name: 'AVG Humidity',
                data: series.map(d => d.avg)
            },
            {
                name: 'Max Humidity',
                data: series.map(d => d.max)
            },
        ]
    }

    return (
        <div>
            <div className="mb-3">
                <select onChange={(e) => {
                    setYear(e.target.value || new Date().getFullYear())
                }}>
                    <option value="">select year</option>
                    {range(2000, new Date().getFullYear()).reverse().map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>
            {months.map((m, index) => <span
                className={`pagination ${month == index ? 'active' : ''}`}
                onClick={() => {
                    setMonth(index);
                }} key={m}>
                {m}
            </span>
            )}

        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            />
        </div>
    )
}

export default LineChart