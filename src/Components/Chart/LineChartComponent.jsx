import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
export default function LineChartComponent() {
  const data = [
    {
      name: '01',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: '02',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: '03',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: '04',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: '05',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: '06',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: '07',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: '08',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: '09',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: '10',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: '11',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: '12',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]
  return (
    <>
      <div className="flex justify-between ">
        <p className="text-[#9bacbc] text-[10px]">SALES TREND</p>
        <p className="text-[#9bacbc] text-[10px]">JAN 01 - JAN15</p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={200}
          data={data}
          margin={{
            top: 5,
            // right: 30,
            // left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          {/* <YAxis /> */}
          <Tooltip />
          {/* <Legend /> */}
          {/* <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          /> */}
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}
