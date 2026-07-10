import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDarkMode } from '../../context/DarkModeContext';
import { useEffect, useState } from 'react';
import {
  eachDayOfInterval,
  format,
  formatDate,
  isSameDay,
  subDays,
} from 'date-fns';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  min-width: 0;

  padding: 2rem 1.6rem;

  @media (min-width: 48em) {
    padding: 3.2rem;
  }

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const ChartScroll = styled.div`
  width: 100%;
  min-width: 0;

  @media (max-width: 47.99em) {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
  }
`;

const ChartFrame = styled.div`
  width: 100%;
  min-width: 0;

  @media (max-width: 47.99em) {
    width: 72rem;
  }
`;

const fakeData = [
  { label: 'Jan 09', totalSales: 480, extrasSales: 20 },
  { label: 'Jan 10', totalSales: 580, extrasSales: 100 },
  { label: 'Jan 11', totalSales: 550, extrasSales: 150 },
  { label: 'Jan 12', totalSales: 600, extrasSales: 50 },
  { label: 'Jan 13', totalSales: 700, extrasSales: 150 },
  { label: 'Jan 14', totalSales: 800, extrasSales: 150 },
  { label: 'Jan 15', totalSales: 700, extrasSales: 200 },
  { label: 'Jan 16', totalSales: 650, extrasSales: 200 },
  { label: 'Jan 17', totalSales: 600, extrasSales: 300 },
  { label: 'Jan 18', totalSales: 550, extrasSales: 100 },
  { label: 'Jan 19', totalSales: 700, extrasSales: 100 },
  { label: 'Jan 20', totalSales: 800, extrasSales: 200 },
  { label: 'Jan 21', totalSales: 700, extrasSales: 100 },
  { label: 'Jan 22', totalSales: 810, extrasSales: 50 },
  { label: 'Jan 23', totalSales: 950, extrasSales: 250 },
  { label: 'Jan 24', totalSales: 970, extrasSales: 100 },
  { label: 'Jan 25', totalSales: 900, extrasSales: 200 },
  { label: 'Jan 26', totalSales: 950, extrasSales: 300 },
  { label: 'Jan 27', totalSales: 850, extrasSales: 200 },
  { label: 'Jan 28', totalSales: 900, extrasSales: 100 },
  { label: 'Jan 29', totalSales: 800, extrasSales: 300 },
  { label: 'Jan 30', totalSales: 950, extrasSales: 200 },
  { label: 'Jan 31', totalSales: 1100, extrasSales: 300 },
  { label: 'Feb 01', totalSales: 1200, extrasSales: 400 },
  { label: 'Feb 02', totalSales: 1250, extrasSales: 300 },
  { label: 'Feb 03', totalSales: 1400, extrasSales: 450 },
  { label: 'Feb 04', totalSales: 1500, extrasSales: 500 },
  { label: 'Feb 05', totalSales: 1400, extrasSales: 600 },
  { label: 'Feb 06', totalSales: 1450, extrasSales: 400 },
];

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(function () {
    const mediaQuery = window.matchMedia('(max-width: 47.99em)');

    function handleChange() {
      setIsMobile(mediaQuery.matches);
    }

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: formatDate(date, 'MMM dd'),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    }
  });


  const isDataInvalid = (data) => {
    return (
      !data ||
      data.length === 0 ||
      data.every((item) => item === null) ||
      data.every((item) => item === undefined)
    );
  };

  const chartData = isDataInvalid(data) ? fakeData : data;

  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#c7d2fe', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };

  return (
    <StyledSalesChart>
      <h2>
        Sales from {format(allDates.at(0), 'MMM dd yyyy')} &mdash;{' '}
        {format(allDates.at(-1), 'MMM dd yyyy')}
      </h2>
      <ChartScroll>
        <ChartFrame>
          <ResponsiveContainer height={isMobile ? 190 : 260} width='100%'>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 0, left: 0, bottom: isMobile ? 10 : 0 }}
            >
              {/* <AreaChart data={data?.length < 1 ? fakeData : data}> */}
              <XAxis
                dataKey='label'
                tick={{ fill: colors.text }}
                tickLine={{ stroke: colors.text }}
                interval={0}
                minTickGap={isMobile ? 8 : 24}
              />
              <YAxis
                unit='$'
                tick={{ fill: colors.text }}
                tickLine={{ stroke: colors.text }}
                width={isMobile ? 42 : 56}
              />

              <CartesianGrid strokeDasharray='4' />
              <Tooltip contentStyle={{ backgroundColor: colors.background }} />
              <Area
                dataKey='totalSales'
                type='monotone'
                stroke={colors.totalSales.stroke}
                fill={colors.totalSales.fill}
                strokeWidth={2}
                name='Total Sales'
                unit='$'
              />
              <Area
                dataKey='extrasSales'
                type='monotone'
                stroke={colors.extrasSales.stroke}
                fill={colors.extrasSales.fill}
                strokeWidth={2}
                name='Extra Sales'
                unit='$'
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartFrame>
      </ChartScroll>
    </StyledSalesChart>
  );
}

export default SalesChart;
    