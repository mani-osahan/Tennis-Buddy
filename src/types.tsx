export interface FeatureAttributes {
  [key: string]: any;
}

export interface FeatureGeometry {
  type: string;
  coordinates: [number, number];
}

export interface Feature {
  properties: FeatureAttributes;
  geometry: FeatureGeometry;

}


export interface GeoJSONResponse{
    features: Feature[]
}