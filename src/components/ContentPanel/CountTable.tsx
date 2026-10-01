import { useEffect, useRef } from "react";
import type { CountProperties, TableOption } from "@types";
import VolumeByMonthChart from "./VolumeByMonthChart";
import React from "react";

interface Props {
  counts: CountProperties[] | undefined;
  setSelectedCounter: (counterId: number) => void;
  setHoveredCounter: (counterId: number | undefined) => void;
  selectedCounter: number | undefined;
  selectedTableOption: TableOption;
}
export default function CountTable(props: Props) {
  const {
    counts,
    selectedCounter,
    setSelectedCounter,
    setHoveredCounter,
    selectedTableOption,
  } = props;

  const showBikeColumns =
    selectedTableOption === "Bike Counts" ||
    selectedTableOption === "All Counts";
  const showPedColumns =
    selectedTableOption === "Pedestrian Counts" ||
    selectedTableOption === "All Counts";
  const colSpan = selectedTableOption == "All Counts" ? 2 : 1;
  const rowRefs = useRef<Record<number, HTMLTableRowElement | null>>({});

  const formatCountValue = (value: number | undefined) => {
    if (value === undefined || value === null || value === 0) {
      return "N/A";
    }

    return value.toLocaleString();
  };

  useEffect(() => {
    if (selectedCounter === undefined) return;

    const row = rowRefs.current[selectedCounter];
    if (row) {
      row.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedCounter]);

  return (
    <table className="min-w-full divide-y divide-slate-200 text-left">
      <thead className="bg-slate-100 text-slate-600">
        <tr>
          <th className="px-4 py-3 text-sm font-semibold"></th>
          <th colSpan={colSpan} className="px-4 py-3 text-sm font-semibold">
            Previous Month
          </th>
          <th colSpan={colSpan} className="px-4 py-3 text-sm font-semibold">
            Year-to-date
          </th>
        </tr>
        <tr className="border-t border-slate-200 bg-slate-50">
          <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wide">
            Location
          </th>
          {showBikeColumns && (
            <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wide">
              Bicyclists
            </th>
          )}
          {showPedColumns && (
            <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wide">
              Pedestrian
            </th>
          )}
          {showBikeColumns && (
            <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wide">
              Bicyclists
            </th>
          )}
          {showPedColumns && (
            <th className="px-4 py-3 text-sm font-semibold uppercase tracking-wide">
              Pedestrian
            </th>
          )}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200 bg-white">
        {counts ? (
          counts.map((count) => {
            const showBikeChart = showBikeColumns && Boolean(count.BIKE_YR);
            const showPedChart = showPedColumns && Boolean(count.PED_YR);

            return (
              <React.Fragment key={count.LOCATIONID}>
                <tr
                  key={count.LOCATIONID}
                  ref={(element) => {
                    rowRefs.current[count.LOCATIONID] = element;
                  }}
                  aria-selected={selectedCounter === count.LOCATIONID}
                  className={`cursor-pointer border-l-4 transition-colors ${
                    selectedCounter === count.LOCATIONID
                      ? "border-dvrpc-blue-3 bg-dvrpc-blue-7 font-semibold"
                      : "border-transparent hover:border-slate-300 hover:bg-slate-100"
                  }`}
                  onClick={() => setSelectedCounter(count.LOCATIONID)}
                  onMouseEnter={() => setHoveredCounter(count.LOCATIONID)}
                  onMouseLeave={() => setHoveredCounter(undefined)}
                >
                  <td className="px-4 py-3 text-sm text-slate-800">
                    {count.LOCATIONNAME}
                  </td>
                  {showBikeColumns && (
                    <td className="px-4 py-3 text-sm text-slate-800">
                      {formatCountValue(
                        count[`BIKE1` as keyof CountProperties] as
                          | number
                          | undefined,
                      )}
                    </td>
                  )}
                  {showPedColumns && (
                    <td className="px-4 py-3 text-sm text-slate-800">
                      {formatCountValue(
                        count[`PED1` as keyof CountProperties] as
                          | number
                          | undefined,
                      )}
                    </td>
                  )}
                  {showBikeColumns && (
                    <td className="px-4 py-3 text-sm text-slate-800">
                      {formatCountValue(count.BIKE_YR)}
                    </td>
                  )}
                  {showPedColumns && (
                    <td className="px-4 py-3 text-sm text-slate-800">
                      {formatCountValue(count.PED_YR)}
                    </td>
                  )}
                </tr>
                {selectedCounter === count.LOCATIONID && (
                  <tr>
                    <td
                      colSpan={selectedTableOption === "All Counts" ? 5 : 3}
                      className="p-4"
                    >
                      <div className="flex flex-wrap">
                        {showBikeChart && (
                          <div className="w-1/2 min-w-sm ">
                            <VolumeByMonthChart
                              type={"Bike Counts"}
                              count={count}
                            />
                          </div>
                        )}
                        {showPedChart && (
                          <div className="w-1/2 min-w-sm">
                            <VolumeByMonthChart
                              type={"Pedestrian Counts"}
                              count={count}
                            />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })
        ) : (
          <tr>
            <td
              colSpan={5}
              className="px-4 py-6 text-center text-sm text-slate-500"
            >
              Loading data...
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
