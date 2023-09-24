import React, { useState} from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer} from '@deck.gl/layers';
import './axiosConfig';
import axios from 'axios';
import {Map} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import Panel from './components/Panel';
import './App.css';
import { Alert, Space, Spin } from 'antd';
import { useSelector } from 'react-redux';

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
  const [showBeijingLayer, setShowBeijingLayer] = useState(false); // 默认为不显示
  const mapdata = useSelector(state => state.mapdata);//从state中获取用户输入的数据
  const [isLoading, setIsLoading] = useState(false);//加载指示符
  /*输入地图数据的useEffect钩子方法
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

  // 前后端数据传递写为一个按钮
  const fetchData = async() => {  
    setIsLoading(true);
    // 传递前端数据到后端
    const url = `http://localhost:5000/data`;
    try {
      const response = await axios.get(url, mapdata);
      if(response.data.success) {
        console.log('Data sent successfully!');
      }
    // 从后端获取数据
      const result = await axios.get('/api/data');
      console.log(result.data);
      setGeojson(result.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);  // 结束数据加载
    }
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
   // 切换 "beijing" 图层的可见性
  const toggleBeijingLayer = () => {
    setShowBeijingLayer(!showBeijingLayer);
  };
  const layers = [
    new GeoJsonLayer({
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
    
 ...(showBeijingLayer ? [new GeoJsonLayer({
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
})] : [])
]

 return (
  <div >
   {isLoading?(
   <Space direction="vertical"
   style={{
     width: '100%',
   }}>
   <Spin tip="Loading...">
      <Alert
        message="正在生成路线"
        description="请您稍作等待"
        type="info"
      />
    </Spin>
   </Space>) : (null)}
   <button className="fetch-data-btn" onClick={handleButtonClick}>计算 启动！</button>
   <button className="building" onClick={toggleBeijingLayer}>
        {showBeijingLayer ? '隐藏beijing图层' : '显示beijing图层'}</button>
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
