import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import sources from "./mapSources";
import Legend from "./Legend";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import type { MouseEvent } from "@types";
import { CustomNavigationControl } from "./CustomNavigationControl";
import { INITIAL_BOUNDS } from "@consts";
import { baseLayers } from "./mapLayers";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  placeholder: "Search to location",
  bbox: [
    -76.09405517578125, 39.49211914385648, -74.32525634765625,
    40.614734298694216,
  ],
  marker: false,
});

type FeatureState = {
  id: number;
  source: string;
};

interface Props {
  setSelectedCounter: (counterId: number) => void;
  selectedCounter: number | undefined;
}

export default function MapboxMap(props: Props) {
  const { selectedCounter, setSelectedCounter } = props;

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const hoverRef = useRef<FeatureState | null>(null);
  const selectRef = useRef<FeatureState | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const setFeatureState = (
    id: number,
    source: string,
    state: Record<string, boolean>,
  ) => {
    mapRef.current?.setFeatureState(
      {
        source,
        id,
      },
      state,
    );
  };

  const clearSelection = () => {
    if (!mapRef.current || !selectRef.current) return;
    mapRef.current.removeFeatureState({
      source: selectRef.current.source,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!e.features || !mapRef.current) return;
    mapRef.current.getCanvas().style.cursor = "pointer";
    if (hoverRef.current)
      setFeatureState(hoverRef.current.id, hoverRef.current.source, {
        hover: false,
      });
    const id = Number(e.features[0].id);

    if (!id) return;

    const source = e.features[0].source + "";
    hoverRef.current = { id, source };
    setFeatureState(id, source, { hover: true });
  };

  const handleMouseLeave = () => {
    if (!mapRef.current) return;
    mapRef.current.getCanvas().style.cursor = "";
    if (hoverRef.current)
      setFeatureState(hoverRef.current.id, hoverRef.current.source, {
        hover: false,
      });
    hoverRef.current = null;
  };

  const handleClick = (e: MouseEvent) => {
    if (!mapRef.current || !e.features) return;
    clearSelection();

    const id = Number(e.features[0].id);

    if (!id) return;

    const source = e.features[0].source + "";
    selectRef.current = { id, source };

    if (source == "permBikePedCounts") {
      setSelectedCounter(id as number);
    }
    setFeatureState(id, source, { selected: true });
  };

  useEffect(() => {
    if (!mapRef.current || !selectedCounter) return;
    if (selectRef.current?.id === selectedCounter) return;
    clearSelection();
    mapRef.current.setFeatureState(
      {
        source: "permBikePedCounts",
        id: selectedCounter,
      },
      { selected: true },
    );
    selectRef.current = {
      id: selectedCounter,
      source: "permBikePedCounts",
    };
  }, [selectedCounter]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/ckirby98/cmndm12qu000m01qlb48t3970",
      bounds: INITIAL_BOUNDS,
      trackResize: true,
    });

    mapRef.current = map;

    map.on("load", () => {
      map.resize();
      map.addControl(geocoder, "top-right");
      map.addControl(new CustomNavigationControl({}, INITIAL_BOUNDS));
      Object.entries(sources).forEach(([id, src]) => map.addSource(id, src));
      Object.values(baseLayers).forEach((layer) => map.addLayer(layer));
    });

    map.on("mousemove", ["permBikePedCounts"], handleMouseMove);
    map.on("mouseleave", ["permBikePedCounts"], handleMouseLeave);
    map.on("click", ["permBikePedCounts"], handleClick);

    return () => map.remove();
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" />
      <Legend />
    </div>
  );
}
