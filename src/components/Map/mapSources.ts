import type { SourceMap } from "@types";

const sources: SourceMap = {
  countyboundaries: {
    type: "vector",
    url: "https://tiles.dvrpc.org/data/boundaries/countyboundaries",
  },
  municipalboundaries: {
    type: "vector",
    url: "https://tiles.dvrpc.org/data/boundaries/municipalboundaries",
  },
  circuittrails: {
    type: "vector",
    url: "https://tiles.dvrpc.org/data/transportation/circuittrails",
  },
  permBikePedCounts: {
    type: "geojson",
    data: "https://apis.dvrpc.org/internal/bikeped/permbikeped/geojson",
    promoteId: "LOCATIONID",
  },
};
export default sources;
