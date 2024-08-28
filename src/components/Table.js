import React from 'react'

const Table = ({ data: series }) => {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        {Object.keys(series[0]).map(k => <th>{k.toUpperCase()}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {series.map((daysData, i) => {
                        return (<tr key={i}>
                            {Object.values(daysData).map((dd, index) => <td key={index}>{dd}</td>)}
                        </tr>);
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table