import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { range } from 'lodash'
import Table from '../../Table'

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

const LineChart = () => {
    const [type, setType] = useState('humidity');
    const [data, setData] = useState([]);
    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState(currentMonth);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`/api/weather-stations/monthly/${type}`);
            const apiData = await res.json();
            setData(apiData);
        }
        getData();
    }, [])

    const currentMonthDays = getDaysInMonth(year, month);
    const categories = [...Array(currentMonthDays).keys()].map(i => i + 1);
    const series = categories.map(day => {
        const currentDaysData = data.find(d => d.day === day && d.month === month + 1)
        return {
            day: day,
            avg: currentDaysData?.avg.toFixed(2) ?? null,
            min: currentDaysData?.min.toFixed(2) ?? null,
            max: currentDaysData?.max.toFixed(2) ?? null,
        }
    });

    let chartVizSeries = [
        {
            name: 'Min ' + type,
            data: series.map(d => d.min)
        },
        {
            name: 'AVG ' + type,
            data: series.map(d => d.avg)
        },
        {
            name: 'MAX ' + type,
            data: series.map(d => d.max)
        },
    ];

    const chartOptions = {
        title: {
            text: type.toUpperCase()
        },
        xAxis: {
            categories: categories // list of number 1 to days (28/29/30/31)
        },
        yAxis: {
            min: 0,
            tickInterval: 5,
            max: Math.max(...series.map(d => d.max)) || 60,
        },
        series: chartVizSeries
    }

    return (
        <div>
            <div className="mb-3">
                <select onChange={(e) => {
                    setYear(e.target.value || currentYear)
                }}>
                    <option value="">select year</option>
                    {range(2000, currentYear + 1).reverse().map(y => (
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
            <Table data={series} />
        </div >
    )
}

export default LineChart