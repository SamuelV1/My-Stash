import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { createFalse } from 'typescript';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    yAxes: {
      gridLines: {
        display: false,
        color: "#382842",
      },
      ticks: {
        beginAtZero: true,
        display: false
      }
    },
    xAxes: {
      gridLines: {
        display: false,
        color: "#382842"
      },
      ticks: {
        display: false
      }
    },
  },
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['old', "", ""];

export const data = {
  labels,
  datasets: [
    {
      data: [40, 40, 10],
      borderColor: '#df7c05',
      backgroundColor: 'rgba(153, 202, 5, 0.5)',
    },
    {
      data: [40, 30, 5],
      borderColor: '#df7c05',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function Graph(props: any) {
   const data = {
    labels,
    datasets: [
      {
        data: [0, 1, props.change],
        borderColor: '#df7c05',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Line options={options} data={data} />;
}

