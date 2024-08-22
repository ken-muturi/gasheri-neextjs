import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const LineChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch('/api/weather-stations/humidity');
            const relativeHumidity = await res.json();
            setData(relativeHumidity);
        }
        getData();
    }, [])

    const chartOptions = {
        title: {
            text: 'My chart'
        },
        series: [{
            data: data.map(d => d.relative_humidity)
        }]
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
        />
    )
}

export default LineChart