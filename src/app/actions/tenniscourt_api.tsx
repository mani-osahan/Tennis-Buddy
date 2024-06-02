// tenniscourt_api.ts
import { GeoJSONResponse } from '@/types';

const tennisAPI = async (): Promise<GeoJSONResponse> => {
  try {
    const res = await fetch(
      'https://maps.ottawa.ca/arcgis/rest/services/Parks_Inventory/MapServer/21/query?outFields=*&where=1%3D1&f=geojson'
    );
    const data: GeoJSONResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export default tennisAPI;
