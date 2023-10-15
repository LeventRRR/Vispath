import React from 'react';
import { Slider } from 'antd';
import { connect } from 'react-redux';

// 组件功能：选择权重

const marks = {
  0:'0',
  5: {
    style: {
      color: '#f50',
    },
    label: <strong>max</strong>,
  },
};
const Label = ({ 
  setpath_hot, setPathHot, 
  setpath_service, setPathService, 
  setpath_challenge, setPathChallenge, 
  setpath_weather, setPathWeather 
}) => {
 
  return(
<>
  <h4>热门程度</h4>
  <Slider step={1} marks={marks} value={setpath_hot} onChange={(value) => { console.log('热门程度:', value); }}
  onAfterChange={(value) => { setPathHot(value) }} min={0} max={5} defaultValue={1}/>

  <h4>服务设施完善程度</h4>
  <Slider step={1} marks={marks} value={setpath_service} onChange={(value) => { console.log('服务设施完善程度:', value); }}
  onAfterChange={(value) => {setPathService(value)}} min={0} max={5} defaultValue={1}/>

  <h4>挑战性</h4>
  <Slider step={1} marks={marks} value={setpath_challenge} onChange={(value) => { console.log('挑战性:', value); }}
  onAfterChange={(value) => { setPathChallenge(value) }} min={0} max={5} defaultValue={1}/>

  <h4>天气状况</h4>
  <Slider step={1} marks={marks} value={setpath_weather} onChange={(value) => { console.log('天气状况:', value); }}
  onAfterChange={(value) => { setPathWeather(value) }} min={0} max={5} defaultValue={1}/>
</>
);
}
const mapStateToProps = (state) => ({
  setpath_hot: state.mapdata.setpath_hot,
  setpath_service: state.mapdata.setpath_service,
  setpath_challenge: state.mapdata.setpath_challenge,
  setpath_weather: state.mapdata.setpath_weather,
});

const mapDispatchToProps = (dispatch) => ({
  setPathHot: (value) => {
    dispatch({ type: 'setpath_hot', data: value });
   
  },
  setPathService: (value) => {
    dispatch({ type: 'setpath_service', data: value });
    
  },
  setPathChallenge: (value) => {
    dispatch({ type: 'setpath_challenge', data: value });
   
  },
  setPathWeather: (value) => {
    dispatch({ type: 'setpath_weather', data: value });
   
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Label);