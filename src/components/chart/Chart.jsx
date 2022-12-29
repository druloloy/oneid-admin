import "./chart.scss"
import {
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ZAxis
 } from "recharts";
import React from "react";

function Chart({aspect,title, data}) {
    const [data02, setData02] = React.useState([]);
    const [data03, setData03] = React.useState([]);
    const [data01, setData01] = React.useState([]);
    const [data04, setData04] = React.useState([]);

    React.useMemo(() => {
        setData01(data.filter((item) => item.cluster === 0)
                     .map((item) => ({x: item.age, y: item.waitTime})));
        setData02(data.filter((item) => item.cluster === 1)
                     .map((item) => ({x: item.age, y: item.waitTime})));
        setData03(data.filter((item) => item.cluster === 2)
                     .map((item) => ({x: item.age, y: item.waitTime})));
        setData04(data.filter((item) => item.cluster === 3)
                     .map((item) => ({x: item.age, y: item.waitTime})));
    }, [data]);

    return(
        <div className="chart">
            <div className="title">{title}</div>
        <ResponsiveContainer width="100%" aspect={aspect}>
        <ScatterChart
            width={1000}
            height={400}
            margin={{
               top: 20,
               right: 20,
               bottom: 20,
               left: 20
            }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="age" unit="yrs"   />
            <YAxis type="number" dataKey="y" name="wait time" unit="mins" stroke="#8884d8"/>
            <ZAxis range={[10, 11]} />
            
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            
            <Legend />
            <Scatter name="Cluster 1" data={data01} fill="#8884d8" />
            <Scatter name="Cluster 2" data={data02} fill="#82ca9d" />
            <Scatter name="Cluster 3" data={data03} fill="#ff1234" />
            <Scatter name="Cluster 4" data={data04} fill="#ffff00" />
         </ScatterChart>
      </ResponsiveContainer>
        </div>
    );
    
}

export default Chart;