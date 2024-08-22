"use client"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/src/app/_Components/ui/Chart/chart"
import {
  CardTitle, Card,
  CardContent,
  CardHeader,
} from "@/src/app/_Components/ui/Chart/card"
const chartData = [
  { month: "January", total: 186 },
  { month: "February", total: 305 },
  { month: "March", total: 237 },
  { month: "April", total: 73 },
  { month: "May", total: 209 },
  { month: "June", total: 214 },
  { month: "July", total: 186 },
  { month: "August", total: 305 },
  { month: "September", total: 237 },
  { month: "October", total: 73 },
  { month: "November", total: 209 },
  { month: "December", total: 214 },
]

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function ChartData() {
  return (
    <Card className="border rounded-lg border-gray-300">
      <CardHeader className="mb-4">
        <CardTitle className="text-base text-gray-900">Tổng quan</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="total" fill="#2563EB" radius={4} >
            <LabelList dataKey='total' position='top' fontSize={9}/>
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
