import React, { useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';

interface SeriesData {
  data: number[]; // Assuming each series consists of an array of numbers
}

interface CarData {
  makat: string;
  kshirot: boolean;
}

export default function VerticalBar() {
  const [chartData, setChartData] = useState<{ xAxis: string[]; series: SeriesData[] }>({
    xAxis: [],
    series: [],
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/cars/tanks")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        const carData: CarData[] = data;

        
        const groupedData: { [key: string]: number } = {};
        carData.forEach(item => {
          if (!groupedData[item.makat]) {
            groupedData[item.makat] = 0;
          }
          if (item.kshirot) {
            groupedData[item.makat]++;
          }
        });

        const makats = Object.keys(groupedData);
        const seriesData: SeriesData[] = [{
          data: makats.map(makat => groupedData[makat])
        }];

        setChartData({
          xAxis: makats,
          series: seriesData,
        });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: chartData.xAxis }]}
      series={chartData.series}
      
      width={500}
      height={300}
    />
  );
}
