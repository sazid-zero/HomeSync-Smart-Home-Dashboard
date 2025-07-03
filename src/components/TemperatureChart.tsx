import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import React from "react";

type TemperatureChartProps = {
    selectedRange: string;
};

// ✅ Mock data
const dataToday = [
    { time: '9.00', usage: 2.1 },
    { time: '10.00', usage: 2.3 },
    { time: '11.00', usage: 2.8 },
    { time: '12.00', usage: 3.0 },
    { time: '13.00', usage: 3.5 },
    { time: '14.00', usage: 2.9 },
    { time: '15.00', usage: 2.7 },
    { time: '16.00', usage: 3.2 },
    { time: '17.00', usage: 2.4 },
    { time: '18.00', usage: 3.1 },
    { time: '19.00', usage: 2.8 }
];

const dataWeek = [
    { time: 'Mon', usage: 25 },
    { time: 'Tue', usage: 22 },
    { time: 'Wed', usage: 30 },
    { time: 'Thu', usage: 28 },
    { time: 'Fri', usage: 26 },
    { time: 'Sat', usage: 24 },
    { time: 'Sun', usage: 27 }
];

const dataMonth = [
    { time: 'Week 1', usage: 150 },
    { time: 'Week 2', usage: 165 },
    { time: 'Week 3', usage: 140 },
    { time: 'Week 4', usage: 175 }
];

// ✅ Component
const TemperatureChart: React.FC<TemperatureChartProps> = ({ selectedRange }) => {
    // Choose data based on range
    const data =
        selectedRange === 'This Week'
            ? dataWeek
            : selectedRange === 'This Month'
                ? dataMonth
                : dataToday;

    // Max value for highlighting
    const maxUsage = Math.max(...data.map((d) => d.usage));

    // Total kW usage
    const totalUsage = data.reduce((sum, d) => sum + d.usage, 0).toFixed(2);

    // Total hours (or days/weeks depending on range)
    const totalHours = data.length;

    return (
        <div className="w-full h-full bg-white rounded-xl pl-4 pr-4 pt-3 pb-2 shadow-xl">
            <div className="flex justify-start space-x-6 items-center">
                <div className="flex flex-col space-y-1">
                    <span className="text-[8px] font-semibold text-gray-400">Total Spend</span>
                    <span className="text-black text-[12px] font-bold">{totalUsage} kW</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-[8px] font-semibold text-gray-400">Total Hours</span>
                    <span className="text-black text-[12px] font-bold">{totalHours} h</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-[8px] font-semibold text-gray-400">Highest Usage</span>
                    <span className="text-black text-[12px] font-bold">{maxUsage} kW</span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="75%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 8, fontWeight: 600 }}
                    />
                    <YAxis domain={[2,4]} hide />
                    <Tooltip
                        formatter={(value) => [`${value} kW`, 'Usage']}
                        cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                    />
                    <Bar dataKey="usage" barSize={16}>
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={entry.usage === maxUsage ? '#000' : '#e5e7eb'}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TemperatureChart;
