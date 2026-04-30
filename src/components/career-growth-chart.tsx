"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { year: 1, value: 2.5, label: "Year 1: $2.5M" },
  { year: 2, value: 4.2 },
  { year: 3, value: 6.1 },
  { year: 4, value: 8.1, label: "Year 4: $8.1M" },
  { year: 5, value: 10.2 },
  { year: 6, value: 12.0 },
  { year: 7, value: 13.8 },
  { year: 8, value: 15.3, label: "Year 8: $15.3M" },
  { year: 9, value: 16.5 },
  { year: 10, value: 18.2 },
  { year: 11, value: 20.5 },
  { year: 12, value: 22.7, label: "Year 12: $22.7M" },
]

const chartConfig = {
  value: {
    label: "Value ($M)",
    color: "#00d2ff",
  },
} satisfies ChartConfig

export function CareerGrowthChart() {
  return (
    <ChartContainer config={chartConfig} className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 40,
            right: 40,
            left: 20,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00d2ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00d2ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            vertical={false} 
            strokeDasharray="0" 
            stroke="rgba(255,255,255,0.08)" 
          />
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickMargin={12}
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: "500" }}
          />
          <YAxis
            tickLine={true}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickMargin={10}
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: "500" }}
            ticks={[0, 11.25, 22.5, 33.75]}
            tickFormatter={(value) => `$${value.toFixed(2)}M`}
            domain={[0, 35]}
          />
          <Tooltip 
            content={<ChartTooltipContent hideLabel />} 
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#00d2ff"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorValue)"
            animationDuration={2000}
            dot={(props) => {
              const { cx, cy, payload } = props as { cx: number, cy: number, payload: { year: number, label?: string } };
              if (payload.label) {
                return (
                  <g key={`dot-${payload.year}`}>
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={5} 
                      fill="#00d2ff" 
                      stroke="#05070a" 
                      strokeWidth={2} 
                      className="drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]"
                    />
                    <text 
                      x={cx} 
                      y={cy - 20} 
                      fill="white" 
                      fontSize={11} 
                      fontWeight="700" 
                      textAnchor="middle"
                      className="drop-shadow-[0_2px_4px_rgba(0,0,0,1)] font-sans"
                    >
                      {payload.label}
                    </text>
                  </g>
                );
              }
              return null;
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
