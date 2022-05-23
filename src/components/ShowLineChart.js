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

const GRAPH_MIN_LIMIT = 10;
const ENLARGE_FOR_DESIGN = 10;
const UNDERWEIGHT_UL = 18.4;
const HEALTHY_LL = 18.5;
const HEALTHY_UL = 24.9;
const OVERWEIGHT_LL = 25;
const OVERWEIGHT_UL = 29.9;
const OBESITY_LL = 30;

const generateData = (from, to, count) => {
  let data = [];
  for (let i = from, j = 0; j <= count; i += Math.ceil(to / count), j++) {
    i <= to ? data.push(i) : data.push(to);
  }
  return data;
};

const graphColors = {
  underweight: yellow["200"],
  healthy: green["200"],
  overweight: pink["200"],
  obesity: pink["300"],
  userDataTangent: blue["800"],
  userDataPosition: yellow["100"],
};

const ShowLineChart = ({ dates, bmis }) => {
  const labels = dates;
  const maxUserBmi = Math.max(...bmis);
  const GRAPH_MAX_LIMIT = Math.max(OBESITY_LL, maxUserBmi) + ENLARGE_FOR_DESIGN;

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
      subtitle: {
        display: true,
        text: "Custom Chart Subtitle",
      },
    },
    scales: {
      y: {
        min: GRAPH_MIN_LIMIT,
        max: GRAPH_MAX_LIMIT,
      },
    },
  };

  const rangeDatasetsStyles = [
    {
      fill: true,
      pointBackgroundColor: "transparent",
      pointBorderColor: "transparent",
      showLine: false,
    },
  ];

  const rangeDatasets = [
    {
      ...rangeDatasetsStyles,
      label: "Underweight",
      backgroundColor: graphColors.underweight,
      data: generateData(UNDERWEIGHT_UL, UNDERWEIGHT_UL, dates.length),
    },
    {
      ...rangeDatasetsStyles,
      label: "Healthy Weight",
      backgroundColor: graphColors.healthy,
      data: generateData(HEALTHY_UL, HEALTHY_UL, dates.length),
    },
    {
      ...rangeDatasetsStyles,
      label: "Over Weight",
      backgroundColor: graphColors.overweight,
      data: generateData(OVERWEIGHT_UL, OVERWEIGHT_UL, dates.length),
    },
    {
      ...rangeDatasetsStyles,
      label: "Obesity",
      backgroundColor: graphColors.obesity,
      data: generateData(GRAPH_MAX_LIMIT, GRAPH_MAX_LIMIT, dates.length),
    },
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "User Data",
        fill: false,
        borderColor: graphColors.userDataTangent,
        pointBackgroundColor: graphColors.userDataPosition,
        backgroundColor: graphColors.userDataTangent,
        data: bmis,
      },
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
