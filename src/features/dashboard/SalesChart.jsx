// React & Libraries
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

// Styles
import styled from "styled-components";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

// Features Components
import { DashboardBox } from "../index";

// UI Components
import { Heading } from "../../ui";

function SalesChart({ bookings, numDays }) {
  const isDarkMode = true;
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map(date => ({
    label: format(date, "MMM dd "),
    totalSales: bookings
      .filter(booking => isSameDay(date, new Date(booking.created_at)))
      .reduce((acc, curr) => acc + curr.totalPrice, 0),
    extrasSales: bookings
      .filter(booking => isSameDay(date, new Date(booking.created_at)))
      .reduce((acc, curr) => acc + curr.extrasPrice, 0),
  }));

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis dataKey="label" />
          <YAxis unit="$" />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyleType={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total Sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

export default SalesChart;