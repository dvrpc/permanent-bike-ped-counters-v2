import type {
  SourceSpecification,
  LayerSpecification,
  MapMouseEvent,
  GeoJSONFeature,
} from "mapbox-gl";

// Map Types

export type MouseEvent = MapMouseEvent & {
  features?: GeoJSONFeature[];
};
export type GeoJSONProperties = Record<string, string | number | boolean>;

export interface LayerMap {
  [key: string]: LayerSpecification;
}

export interface SourceMap {
  [key: string]: SourceSpecification;
}

export interface CountProperties {
  LOCATIONID: number;
  LOCATIONNAME: string;
  INDIR: string;
  OUTDIR: string;
  BIKE_YR: number;
  PED_YR: number;
  TOTAL1: number;
  PED1: number;
  PEDIN1: number;
  PEDOUT1: number;
  BIKE1: number;
  BIKEIN1: number;
  BIKEOUT1: number;
  MONTH1: string;
  TOTAL2: number;
  PED2: number;
  PEDIN2: number;
  PEDOUT2: number;
  BIKE2: number;
  BIKEIN2: number;
  BIKEOUT2: number;
  MONTH2: string;
  TOTAL3: number;
  PED3: number;
  PEDIN3: number;
  PEDOUT3: number;
  BIKE3: number;
  BIKEIN3: number;
  BIKEOUT3: number;
  MONTH3: string;
  TOTAL4: number;
  PED4: number;
  PEDIN4: number;
  PEDOUT4: number;
  BIKE4: number;
  BIKEIN4: number;
  BIKEOUT4: number;
  MONTH4: string;
  TOTAL5: number;
  PED5: number;
  PEDIN5: number;
  PEDOUT5: number;
  BIKE5: number;
  BIKEIN5: number;
  BIKEOUT5: number;
  MONTH5: string;
  TOTAL6: number;
  PED6: number;
  PEDIN6: number;
  PEDOUT6: number;
  BIKE6: number;
  BIKEIN6: number;
  BIKEOUT6: number;
  MONTH6: string;
  TOTAL7: number;
  PED7: number;
  PEDIN7: number;
  PEDOUT7: number;
  BIKE7: number;
  BIKEIN7: number;
  BIKEOUT7: number;
  MONTH7: string;
  TOTAL8: number;
  PED8: number;
  PEDIN8: number;
  PEDOUT8: number;
  BIKE8: number;
  BIKEIN8: number;
  BIKEOUT8: number;
  MONTH8: string;
  TOTAL9: number;
  PED9: number;
  PEDIN9: number;
  PEDOUT9: number;
  BIKE9: number;
  BIKEIN9: number;
  BIKEOUT9: number;
  MONTH9: string;
  TOTAL10: number;
  PED10: number;
  PEDIN10: number;
  PEDOUT10: number;
  BIKE10: number;
  BIKEIN10: number;
  BIKEOUT10: number;
  MONTH10: string;
  TOTAL11: number;
  PED11: number;
  PEDIN11: number;
  PEDOUT11: number;
  BIKE11: number;
  BIKEIN11: number;
  BIKEOUT11: number;
  MONTH11: string;
  TOTAL12: number;
  PED12: number;
  PEDIN12: number;
  PEDOUT12: number;
  BIKE12: number;
  BIKEIN12: number;
  BIKEOUT12: number;
  MONTH12: string;
}

export type TableOption = "Pedestrian Counts" | "Bike Counts" | "All Counts";
