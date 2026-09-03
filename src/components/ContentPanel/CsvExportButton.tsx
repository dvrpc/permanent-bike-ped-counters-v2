import type { CountProperties, TableOption } from "@types";
import { Download } from "lucide-react";

interface Props {
  counts: CountProperties[] | undefined;
  selectedTableOption: TableOption;
}

export default function CsvExportButton({
  counts,
  selectedTableOption,
}: Props) {
  if (!counts) {
    return (
      <button
        type="button"
        disabled
        className="ml-auto rounded-full border border-dvrpc-blue-3 bg-white px-3 py-1.5 text-xs font-semibold text-dvrpc-blue-3 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      >
        Export to CSV
      </button>
    );
  }

  const selectedTypes: Array<{ label: string; key: "BIKE" | "PED" }> = [];

  if (
    selectedTableOption === "Bike Counts" ||
    selectedTableOption === "All Counts"
  ) {
    selectedTypes.push({ label: "Bike Counts", key: "BIKE" });
  }

  if (
    selectedTableOption === "Pedestrian Counts" ||
    selectedTableOption === "All Counts"
  ) {
    selectedTypes.push({ label: "Pedestrian Counts", key: "PED" });
  }

  const handleExportCsv = () => {
    const monthLabels = Array.from({ length: 12 }, (_, index) => {
      const monthNumber = 12 - index;
      const value = counts[0]?.[`MONTH${monthNumber}` as keyof CountProperties];
      return value ? String(value) : `Month ${monthNumber}`;
    });

    const headers = ["Location", "Type", "Year-to-date", ...monthLabels];

    const rows: string[][] = [];

    counts.forEach((count) => {
      selectedTypes.forEach(({ label, key }) => {
        const yearToDate = String(
          count[`${key}_YR` as keyof CountProperties] ?? "",
        );

        const row = [count.LOCATIONNAME, label, yearToDate];

        for (let monthNumber = 12; monthNumber >= 1; monthNumber -= 1) {
          row.push(
            String(
              count[`${key}${monthNumber}` as keyof CountProperties] ?? "",
            ),
          );
        }

        rows.push(row);
      });
    });

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const countType =
      selectedTableOption === "All Counts"
        ? "all"
        : selectedTableOption === "Bike Counts"
          ? "bike"
          : "pedestrian";
    const currentDate = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `permbikeped_${countType}_${currentDate}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleExportCsv}
      className="ml-auto inline-flex items-center gap-2 rounded-full border border-dvrpc-blue-3 bg-white px-4 py-1.5 text-sm font-medium text-dvrpc-blue-3 transition-colors hover:bg-dvrpc-blue-7"
    >
      <Download size={16} aria-hidden="true" />
      Export to CSV
    </button>
  );
}
//px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
