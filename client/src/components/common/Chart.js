import React from "react";

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function Chart(props) {
  return (
    <ResponsiveContainer width="100%" aspect={4.0 / 2}>
      <LineChart
        margin={{ left: -40, right: 20 }}
        className="chart"
        data={props.data}
        syncId="anyId"
      >
        {props.children}
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey={props.dataKey} interval={5} tick={{ fontSize: 12 }} />
        <YAxis domain={props.domainY} tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend verticalAlign="top" />
      </LineChart>
    </ResponsiveContainer>
  );
}
