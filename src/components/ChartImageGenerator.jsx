// src/components/ChartImageGenerator.jsx
import React, { useRef, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { toPng } from "html-to-image";

const ChartImageGenerator = ({ chartId, title, data, onImageGenerated }) => {
  const containerRef = useRef(null);

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
        if (containerRef.current) {
          toPng(containerRef.current)
            .then((dataUrl) => {
              onImageGenerated(chartId, dataUrl);
            })
            .catch((err) => {
              console.error("Error generating chart image:", err);
            });
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
    <div ref={containerRef} style={{ width: 400, height: 300 }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartImageGenerator;
