import React, { useState } from 'react'
import LineChart from "@/components/Highcharts/Daily/LineChart";
import BarChart from "@/components/Highcharts/Daily/BarChart";

export default function Home() {
  const [type, setType] = useState('humidity')
  return (
    <div>
      <div className="mb-3">
        {['rainfall', 'humidity'].map((t) => <span
          className={`pagination ${t == type ? 'active' : ''}`}
          onClick={() => {
            setType(t);
          }} key={t}>
          {t.toUpperCase()}
        </span>
        )}
      </div>

      {type === "humidity" && <LineChart />}
      {type === "rainfall" && <BarChart />}
    </div>
  );
}
