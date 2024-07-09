import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function Graph() {
  return (
    <BarChart
      series={[
        { data: [35, 44, 24, 34, 30, 10] },
        { data: [51, 6, 49, 30, 20, 40] },
      ]}
      height={290}
      width={650}
      xAxis={[{ data: ['November', 'December','January', 'February', 'March', 'April'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}