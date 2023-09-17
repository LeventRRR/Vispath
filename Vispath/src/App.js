import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer} from '@deck.gl/layers';
import axios from 'axios';
import {Map} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import Panel from './components/Panel';
import './App.css';


const DATA_URL =
  'data/beijing.geojson'; 
// 视角设置
  const INITIAL_VIEW_STATE = {
    latitude: 40,
    longitude: 116 ,
    zoom: 8,
    minZoom: 2,
    maxZoom: 18
  }
  
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json'

// 地图绘制
function App({ mapStyle = MAP_STYLE }) {
 
  const [geojson, setGeojson] = useState([])
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  // 输入地图数据
  /*useEffect钩子方法
  useEffect(() => {
    axios.post('http://localhost:5000/data')
      .then(res => {
        console.log(res.data);
        setGeojson(res.data);
      })
      .catch(error => {
        console.error("Error fetching geojson data:", error);
      });
  }, []); 
 */
  const fetchData = () => {  // 提取数据获取操作为一个函数
    axios.post('http://localhost:5000/data')
      .then(res => {
        console.log(res.data);
        setGeojson(res.data);
      })
      .catch(error => {
        console.error("Error fetching geojson data:", error);
      });
  };

  const handleButtonClick = () => {
    fetchData() // 在按钮点击时执行数据获取操作
  };
  // 处理地图缩放平移
  
  const handleZoom = ({ viewState }) => {
    setViewState(viewState);
  }
  const handlePan = ({ viewState }) => {
    setViewState(viewState);
  }

  // 输入地图
  const layers = [new GeoJsonLayer({
    id: 'geojson-layer',
    data:geojson,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    pointType: 'circle',
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [255,51,51],
    getLineColor: [255,51,51],
    getPointRadius: 100,
    getLineWidth: 1,
    getElevation: 30
 }),
    
    new GeoJsonLayer({
    id: 'geojson',
    data :DATA_URL,
    opacity: 0.8,
    stroked: false,
    filled: true,
    extruded: true,
    wireframe: true,
//   getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
    getElevation: f => Math.sqrt(f.properties.Floor) * 20,
    getFillColor: [255, 255, 255],
    getLineColor: [255, 255, 255],
    pickable: true
})
]

 return (
  <div >
   <button className="fetch-data-btn" onClick={handleButtonClick}>启动</button>
   <DeckGL
    viewState={viewState}
    layers={layers}
    onViewportChange={handleZoom}
    onViewStateChange={handlePan}
    pickingRadius={5}
    // getooltip还需另写
    getTooltip={({ object }) =>{
      const hotValue = object?.properties?.hot ?? 'N/A';
      return object && ('热度：'+ hotValue.toString())}
      }
    controller={true}
    >
    <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle} preventStyleDiffing={true} className="map-container"/>
    </DeckGL>
    </div>
 )
}

function AppFinal() {
  return (
    <div>
    <Panel/>
    <App />
    
  </div>
  )
}
export default AppFinal
