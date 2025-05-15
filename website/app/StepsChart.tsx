"use client";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

interface StepData {
  date: string;
  steps: number;
}

const stepsData: StepData[] = [
  {date: 'Mon', steps: 7500},
  {date: 'Tue', steps: 8200},
  {date: 'Wed', steps: 6800},
  {date: 'Thu', steps: 9100},
  {date: 'Fri', steps: 10500},
  {date: 'Sat', steps: 12000},
  {date: 'Sun', steps: 9800},
];

export default function StepsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={stepsData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
        <XAxis dataKey="date" className="text-sm text-gray-600"/>
        <YAxis className="text-sm text-gray-600"/>
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
          }}
          labelStyle={{color: '#333', fontWeight: 'bold'}}
          itemStyle={{color: '#555'}}
        />
        <Legend wrapperStyle={{paddingTop: '10px'}}/>
        <Line type="monotone" dataKey="steps" stroke="#3b82f6" activeDot={{r: 8}} strokeWidth={2}/>
      </LineChart>
    </ResponsiveContainer>
  );
}
