
export default async function tennisAPI(){

    const apiURL = "https://maps.ottawa.ca/arcgis/rest/services/Parks_Inventory/MapServer/21/query?outFields=*&where=1%3D1&f=geojson"

    const res = await(fetch(apiURL))
    const data = await res.json()

    console.log(data)

    return data

}