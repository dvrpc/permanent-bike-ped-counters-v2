import { useEffect, useState } from "react";
import type { CountProperties, TableOption } from "@types";
import type { GeoJSONFeature } from "mapbox-gl";
import CountTable from "./CountTable";
import CsvExportButton from "./CsvExportButton";

const previousMonthNum =
  new Date().getMonth() === 0 ? 12 : new Date().getMonth();

interface Props {
  selectedCounter: number | undefined;
  setSelectedCounter: (counterId: number) => void;
}

const tableOptions: TableOption[] = [
  "All Counts",
  "Pedestrian Counts",
  "Bike Counts",
];
export default function ContentPanel(props: Props) {
  const { selectedCounter, setSelectedCounter } = props;
  const [selectedTableOption, setSelectedTableOption] =
    useState<TableOption>("All Counts");
  const [counts, setCounts] = useState<CountProperties[]>();

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const response = await fetch(
          "https://apis.dvrpc.org/internal/bikeped/permbikeped/geojson",
        );
        const data = await response.json();
        const counts: CountProperties[] = data.features.map(
          (feature: GeoJSONFeature) => feature.properties,
        );
        setCounts(counts);
      } catch (error) {
        console.error("Error fetching count data", error);
      }
    };
    loadCounts();
  }, []);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="p-4 border-b border-dvrpc-gray-7">
        <div className="mb-2 flex items-centergap-3">
          <span className="text-sm text-gray-500">Select a table option</span>
        </div>
        <div className="flex items-center gap-2">
          {tableOptions.map((option) => {
            return (
              <button
                key={option}
                onClick={() => setSelectedTableOption(option)}
                className={`
          px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
          ${
            selectedTableOption === option
              ? "bg-dvrpc-blue-3 text-white border-dvrpc-blue-3"
              : "bg-white  border-dvrpc-gray-6 hover:border-dvrpc-blue-3 hover:text-dvrpc-blue-3"
          }
        `}
              >
                {option}
              </button>
            );
          })}
          <CsvExportButton
            counts={counts}
            selectedTableOption={selectedTableOption}
          />
        </div>
      </div>
      <CountTable
        counts={counts}
        setSelectedCounter={setSelectedCounter}
        previousMonthNum={previousMonthNum}
        selectedCounter={selectedCounter}
        selectedTableOption={selectedTableOption}
      />
    </div>
  );
}
