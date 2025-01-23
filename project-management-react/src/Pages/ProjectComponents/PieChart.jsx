/* eslint-disable no-unused-vars */
"use client"
import React, { useEffect } from 'react'

import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks } from '@/Redux/Issues/Action'


export const chartConfig = {
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-1))",
  },
  progress: {
    label: "In Progress",
    color: "hsl(var(--chart-2))",
  },
  done: {
    label: "Done",
    color: "hsl(var(--chart-3))",
  },
}

export const PieChartComponent = ()=> {


  const {id} = useParams();
  const dispatch = useDispatch();
  const {issue} = useSelector(store=>store);

  useEffect(()=>{
     dispatch(fetchTasks(id));
  },[])

  console.log("Issues Inside pie chart component : ",issue);

   // Process the tasks data to count statuses
   const getChartData = () => {
    if (!issue?.issues || issue?.issues.length === 0) {
      return [
        { status: "pending", tasks: 0, fill: "var(--color-pending)" },
        { status: "progress", tasks: 0, fill: "var(--color-progress)" },
        { status: "done", tasks: 0, fill: "var(--color-done)" },
      ];
    }

    const statusCounts = issue.issues.reduce((acc, task) => {
      const status = task.status?.toLowerCase();
      if (status === "pending" || status === "in progress" || status === "done") {
        acc[status] = (acc[status] || 0) + 1;
      }
      return acc;
    }, {});

    return [
      { status: "pending", tasks: statusCounts["pending"] || 0, fill: "var(--color-pending)" },
      { status: "progress", tasks: statusCounts["in progress"] || 0, fill: "var(--color-progress)" },
      { status: "done", tasks: statusCounts["done"] || 0, fill: "var(--color-done)" },
    ];
  };

  const chartData = getChartData();


  return (
    <Card className="flex flex-col bg-black">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-sans">Track Task Status</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="tasks"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold font-sans"
                        >
                         {issue?.issues?.length}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground font-sans"
                        >
                          Tasks
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm text-center">
        <div className="flex items-center gap-2 font-medium leading-none font-sans">
          Task progress<TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground font-sans">
          Showing completion , pending and in progress tasks
        </div>
      </CardFooter>
    </Card>
  )
}

export default PieChartComponent;

