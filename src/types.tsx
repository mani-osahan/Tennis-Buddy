export interface FeatureAttributes {
  NAME: string;
  ADDRESS: string;
  [key: string]: any;
}

export interface FeatureGeometry {
  type: string;
  coordinates: [number, number];
}

export interface Feature {
  attributes: FeatureAttributes;
  geometry: FeatureGeometry;
}


export interface GeoJSONResponse{
    features: Feature[]
}