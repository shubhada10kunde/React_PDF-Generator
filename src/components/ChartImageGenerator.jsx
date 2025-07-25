// src/components/ChartImageGenerator.jsx
import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const ChartImageGenerator = ({ chartId, title, data, onImageGenerated }) => {
  const chartRef = useRef(null);

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: `${title} Close Price`,
        data: data.map((d) => d.close),
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: {
      onComplete: () => {
        if (chartRef.current) {
          const base64 = chartRef.current.toBase64Image();
          onImageGenerated(chartId, base64);
        }
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ display: "none" }}>
      <Line
        data={chartData}
        options={chartOptions}
        ref={(ref) => {
          if (ref) chartRef.current = ref.chart || ref.chartInstance;
        }}
      />
    </div>
  );
};

export default ChartImageGenerator;
