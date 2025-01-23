/* eslint-disable no-unused-vars */
"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSelector } from "react-redux"
const chartData = [
  {date: '2025-01-19', projects: 100, tasks: 10}, 
  {date: '2025-01-20', projects: 50, tasks: 2},
  {date: '2025-01-21', projects: 10, tasks: 5},
  {date: '2025-01-22', projects: 105, tasks: 0},
  {date: '2025-01-23', projects: 30, tasks: 10},
  {date: '2025-01-24', projects: 42, tasks: 22},
  {date: '2025-01-25', projects: 72, tasks: 42},
  {date: '2025-01-26', projects: 87, tasks: 93},

]


const formatProjectData = (projects) => {
  const dateCountMap = {};

  projects.forEach((project) => {
    // Function to format date to 'YYYY-MM-DD'
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD part
    };

    // Process project creation date
    if (project.createdAt) {
      const formattedDate = formatDate(project.createdAt);
      if (dateCountMap[formattedDate]) {
        dateCountMap[formattedDate].projects += 1;
      } else {
        dateCountMap[formattedDate] = { date: formattedDate, projects: 1, tasks: 0 };
      }
    }

    // Process issues creation dates
    if (project.issues && Array.isArray(project.issues)) {
      project.issues.forEach((issue) => {
        if (issue.createdAt) {
          const formattedDate = formatDate(issue.createdAt);
          if (dateCountMap[formattedDate]) {
            dateCountMap[formattedDate].tasks += 1;
          } else {
            dateCountMap[formattedDate] = { date: formattedDate, projects: 0, tasks: 1 };
          }
        }
      });
    }
  });

  // Convert object to array and sort by date
  const result = Object.values(dateCountMap).sort((a, b) => new Date(a.date) - new Date(b.date));

  return result;
};


const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  projects: {
    label: "Projects",
    color: "hsl(var(--chart-1))",
  },
  tasks: {
    label: "Tasks",
    color: "hsl(var(--chart-2))",
  },
}

export const Chart = ()=> {

  
  const {project} = useSelector((store)=>store);
  
  // const chartData = formatProjectData(project?.projects);
  // console.log(chartData);


  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="bg-black project-card-container">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="font-sans">Project - Task Details</CardTitle>
          <CardDescription className="font-sans">
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange} >
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto font-sans"
            aria-label="Select a value"
          >
            <SelectValue className="font-sans" placeholder="Last 3 months"  />
          </SelectTrigger>
          <SelectContent className="rounded-xl font-sans">
            <SelectItem value="90d" className="rounded-lg font-sans">
             <span className="font-sans">Last 3 months</span>
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              <span className="font-sans"> Last 30 days </span>
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
             <span className="font-sans"> Last 7 days</span> 
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillProjects" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-projects)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-projects)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillTasks" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-tasks)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-tasks)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            {/* <CartesianGrid vertical={true} /> */}
            <XAxis
              
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                className="font-sans"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="tasks"
              type="natural"
              fill="url(#fillTasks)"
              stroke="var(--color-tasks)"
              stackId="a"
            />
            <Area
              dataKey="projects"
              type="natural"
              fill="url(#fillProjects)"
              stroke="var(--color-projects)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
export default Chart;