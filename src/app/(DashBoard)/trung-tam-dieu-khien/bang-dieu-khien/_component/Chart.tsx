"use client";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/app/_Components/ui/Chart/chart";
import {
  CardTitle,
  Card,
  CardContent,
  CardHeader,
} from "@/src/app/_Components/ui/Chart/card";
import { Query_analytic_order } from "@/src/app/_lib/Query_APIs/Analytics/Query";
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/app/_Components/ui/select";
const monthNames = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartData() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  const yearOptions = Array.from({ length: 2 }, (_, i) =>
    String(currentYear - i)
  );
  const { data, isLoading } = Query_analytic_order(year);

  if (isLoading) {
    return <Loading_Dots />;
  }

  const chartData =
    data?.data?.map((item: any) => ({
      month: monthNames[item.month - 1],
      total: item?.totalOrders,
    })) ?? [];

  return (
    <Card className="rounded-lg shadow-lg">
      <div className="flex justify-between w-full whitespace-nowrap items-center">
        <CardHeader>
          <CardTitle className="text-base opacity-80">Tổng quan</CardTitle>
        </CardHeader>
        {/* select year */}

        <div className="pr-6">
          <Select
            value={String(year)}
            onValueChange={(val) => setYear(Number(val))}
          >
            <SelectTrigger>
              <SelectValue placeholder={year} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {yearOptions?.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {data?.error && (
        <div className="text-red-500 text-sm text-center">{data?.message}</div>
      )}

      {!data?.error && (
        <CardContent>
          <ChartContainer config={chartConfig} className="max-h-[50vh] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="total" fill="#2563EB" radius={4}>
                <LabelList dataKey="total" position="top" fontSize={9} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
}
