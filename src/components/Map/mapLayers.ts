import type { LayerMap } from "@types";

const baseLayers: LayerMap = {
  countyOutline: {
    id: "county-outline-base",
    type: "line",
    source: "countyboundaries",
    "source-layer": "countyboundaries",
    paint: {
      "line-width": 2.5,
      "line-color": "#505a5e",
    },
    filter: ["==", "dvrpc_reg", "Yes"],
  },
  muniOutline: {
    id: "muni-outline-base",
    type: "line",
    source: "municipalboundaries",
    "source-layer": "municipalboundaries",
    paint: {
      "line-width": 0.5,
      "line-color": "#505a5e",
    },
    filter: ["==", "dvrpc_reg", "Yes"],
    minzoom: 9,
  },

  circuitTrails: {
    id: "circuittrails",
    type: "line",
    source: "circuittrails",
    "source-layer": "circuittrails",
    paint: {
      "line-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "#ff0000",
        ["boolean", ["feature-state", "selected"], false],
        "#ff0000",
        [
          "match",
          ["get", "circuit"],
          "Existing",
          "#8EC73D",
          "In Progress",
          "#FDAE61",
          "Pipeline",
          "#B144A5",
          "Planned",
          "#2E9BA8",
          "#0078AE",
        ],
      ],
      "line-width": ["step", ["zoom"], 2, 10, 3, 13, 4],
    },
  },
  permBikePedCounts: {
    id: "permBikePedCounts",
    type: "circle",
    source: "permBikePedCounts",
    paint: {
      "circle-radius": [
        "step",
        ["zoom"],
        [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          14,
          ["boolean", ["feature-state", "selected"], false],
          14,
          10,
        ],
        10,
        [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          16,
          ["boolean", ["feature-state", "selected"], false],
          16,
          12,
        ],
        13,
        [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          18,
          ["boolean", ["feature-state", "selected"], false],
          18,
          14,
        ],
      ],
      "circle-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "#ff0000",
        ["boolean", ["feature-state", "selected"], false],
        "#ff0000",
        "#d53e4f",
      ],
      "circle-opacity": 0.7,
    },
  },
};

export { baseLayers };
