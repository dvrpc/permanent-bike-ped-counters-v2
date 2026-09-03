import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { CountProperties, TableOption } from "@types";
import { Bar } from "react-chartjs-2";

interface Props {
  type: TableOption;
  count: CountProperties;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  stacked: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Volume By Month",
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        maxRotation: 45,
        minRotation: 45,
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
    },
  },
};

const monthNums = Array.from({ length: 12 }, (_, i) => i + 1).reverse();

export default function VolumeByMonthChart(props: Props) {
  const { type, count } = props;

  const labels = monthNums.map(
    (monthNum) => count[`MONTH${monthNum}` as keyof CountProperties],
  );

  const directionLabels = Array.from(
    new Set([count.INDIR, count.OUTDIR].filter(Boolean) as string[]),
  );

  const getSeries = (prefix: "PED" | "BIKE") => {
    const palette =
      prefix === "PED" ? ["#1f77b4", "#6baed6"] : ["#d95f02", "#f28e2b"];

    return directionLabels.map((direction, directionIndex) => ({
      label: direction,
      data: monthNums.map(
        (monthNum) =>
          count[
            `${prefix}${direction === count.INDIR ? "IN" : "OUT"}${monthNum}` as keyof CountProperties
          ] as number,
      ),
      backgroundColor: palette[directionIndex % palette.length],
      borderColor: palette[directionIndex % palette.length],
      borderWidth: 1,
    }));
  };

  const data = {
    labels,
    datasets: [
      ...(type !== "Bike Counts" ? getSeries("PED") : []),
      ...(type !== "Pedestrian Counts" ? getSeries("BIKE") : []),
    ],
  };

  const chartSummary = `Monthly ${type.toLowerCase()} data for ${count.LOCATIONNAME}. Months: ${labels.join(", ")}.`;

  return (
    <div>
      <div className="sr-only" aria-live="polite">
        {chartSummary}
      </div>
      <Bar data={data} options={options} aria-label={chartSummary} />
    </div>
  );
}
