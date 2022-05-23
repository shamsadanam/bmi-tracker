import React from "react";
import { alpha } from "@mui/material/styles";
import { red, pink, green, blue, brown, yellow } from "@mui/material/colors";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "BMI Chart",
    },
  },
};

const generateData = (from, to, count) => {
  let data = [];
  for (let i = from, j = 0; j <= count; i += Math.ceil(to / count), j++) {
    i <= to ? data.push(i) : data.push(to);
  }
  console.log(data);
  return data;
};

const graphColors = {
  underweight: yellow["A100"],
  healthy: green["A100"],
  overweight: pink["A100"],
  obesity: pink["A200"],
};

const ShowLineChart = ({ dates, bmis }) => {
  const labels = dates;
  const rangeDatasetsStyles = {
    fill: true,
    // pointBackgroundColor: "transparent",
    // pointBorderColor: "transparent",
    showLine: false,
  };
  const rangeDatasets = [
    {
      ...rangeDatasetsStyles,
      label: "Underweight",
      fill: "origin",
      backgroundColor: graphColors.underweight,
      data: generateData(18.4, 18.4, dates.length),
    },
    {
      ...rangeDatasetsStyles,
      label: "Healthy Weight",
      backgroundColor: graphColors.healthy,
      data: generateData(18.6, 24.9, dates.length),
    },
    {
      ...rangeDatasetsStyles,
      label: "Over Weight",
      backgroundColor: graphColors.overweight,
      data: generateData(25, 39.9, dates.length),
    },
    {
      ...rangeDatasetsStyles,
      label: "Obesity",
      // fill: {
      //   value: 70,
      // },
      backgroundColor: graphColors.obesity,
      data: generateData(39.9, 70, dates.length),
    },
  ];

  const data = {
    labels,
    datasets: [
      // {
      //   label: "Dataset 1",
      //   fill: false,
      //   data: bmis,
      //   borderColor: blue[500],
      //   backgroundColor: yellow[400],
      // },
      ...rangeDatasets,
    ],
  };

  return <Line options={options} data={data} />;
};

export default ShowLineChart;

// BMI Ranges
// BMI	Weight Status
// Below 18.5	Underweight
// 18.5 – 24.9	Healthy weight
// 25.0 – 29.9	Overweight
// 30.0 and above	Obesity
