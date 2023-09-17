import React, { useState } from 'react';
import { DeckGL } from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import mapboxgl from 'mapbox-gl';

// 设置Mapbox的access token
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const INITIAL_VIEW_STATE = {
  latitude: 38,
  longitude: -100,
  zoom: 4,
  minZoom: 2,
  maxZoom: 8
};

const MAP_STYLE = 'mapbox://styles/mapbox/dark-v9';

// 你的GeoJSON数据源
const DATA_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/highway/roads.json';

export default function App() {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  // 处理地图缩放
  const handleZoom = ({ viewState }) => {
    setViewState(viewState);
  };

  // 处理地图平移
  const handlePan = ({ viewState }) => {
    setViewState(viewState);
  };

  const layers = [
    new MapboxLayer({ id: 'basemap', mapboxgl, type: 'raster', layout: {} }),
    new GeoJsonLayer({
      id: 'geojson',
      data: DATA_URL,
      stroked: false,
      filled: false,
      lineWidthMinPixels: 0.5,
      parameters: {
        depthTest: false
      },
      getLineColor: [200, 200, 200],
      pickable: true
    })
  ];

  return (
    <DeckGL
      layers={layers}
      viewState={viewState}
      controller
      onViewportChange={handleZoom}
      onViewStateChange={handlePan}
      getTooltip={({ object }) => (object ? `${object.properties.name}` : null)}
    >
      <div id="mapbox" style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }} />
    </DeckGL>
  );
}
