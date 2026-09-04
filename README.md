# PermBikePed v2

DVRPC uses permanently-installed counters to document use of the region’s Circuit Trails network as well as on-road bicycle facilities. This interactive map provides a snapshot of this data in a simple, user-friendly format allowing users to explore counts from throughout the region. DVRPC also takes short-duration bicycle and pedestrian counts. Data from these counts is available [https://www.dvrpc.org/webmaps/trafficcounts/](here).

## Setup

Create an env file, and copy the contents of env_sample and replace with your mapbox token

```
npm install
npm run dev
```

## Geospatial Data dependencies

- [DVRPC Enterprise ArcGIS Services](https://arcgis.dvrpc.org/portal/rest/services/)

## Database dependencies

- DVRPC's Oracle Cloud
