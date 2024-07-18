import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import OGCFeatureLayer from "@arcgis/core/layers/OGCFeatureLayer";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";

import "./style.css";

const map = new Map();

const view = new MapView({
  container: "viewDiv",
  map,
});

const workingLayer = new OGCFeatureLayer({
  title: 'name Field is editable=true',
  url: "https://demo.ldproxy.net/vineyards",
  collectionId: "vineyards",
  objectIdField: "OBJECTID",
  fields: [
    {
      alias: "OBJECTID",
      editable: false,
      name: "OBJECTID",
      nullable: false,
      type: "oid",
    },
    {
      alias: "name",
      editable: true,
      name: "name",
      nullable: false,
      type: "string",
    },
  ],
});

const notWorkingLayer = new OGCFeatureLayer({
  title: 'name Field is editable=false',
  url: "https://demo.ldproxy.net/vineyards",
  collectionId: "vineyards",
  objectIdField: "OBJECTID",
  fields: [
    {
      alias: "OBJECTID",
      editable: false,
      name: "OBJECTID",
      nullable: false,
      type: "oid",
    },
    {
      alias: "name",
      editable: false,
      name: "name",
      nullable: false,
      type: "string",
    },
  ],
});

map.addMany([workingLayer, notWorkingLayer]);

async function queryCountryRegionAttributeWhenLoaded(layer: OGCFeatureLayer) {
  const layerView = await view.whenLayerView(layer);
  await view.goTo(layer.fullExtent);
  await reactiveUtils.whenOnce(() => !layerView.updating);
  const { features: [feature] } = await layerView.queryFeatures({ outFields: ['name'], num: 1 });
  if (!feature) {
    throw new Error('No features found');
  }
  console.info(`${layer.title}: name=${feature.attributes.name}`);
}

queryCountryRegionAttributeWhenLoaded(workingLayer).catch(console.error);
queryCountryRegionAttributeWhenLoaded(notWorkingLayer).catch(console.error);
