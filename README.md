# OGCFeatureLayerView returns incomplete features at least on field has set editable=false

This sample demonstrates how to reproduce an issue with [@arcgis/core/layers/OGCFeatureLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-OGCFeatureLayer.html) when querying features from the layer view.

In this sample the same OGC Feature Collection is loaded as OGCFeatureLayer twice, but with different field configurations. Both field configurations reference the `Country_Region` field. One has set the `editable` flag to `true` and one has set it to `false`. When the `editable` flag is set to `false`, the `Country_Region` field will not be returned in query results from the OGCFeatureLayerView.

## Get Started

1. Run `npm install` and then start adding modules.
2. Run `npm run dev` to start the dev server.
