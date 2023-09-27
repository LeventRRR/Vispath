import React from 'react';
import { Slider } from 'antd';
import { connect } from 'react-redux';

// 组件功能：选择偏好

const marks = {
  0.2:'0',
  1.8: {
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
  <Slider marks={marks} value={setpath_hot} onChange={(value) => { console.log('热门程度:', value); }}
  onAfterChange={(value) => { setPathHot(value) }} max={1.8}/>

  <h4>服务设施完善程度</h4>
  <Slider marks={marks} value={setpath_service} onChange={(value) => { console.log('服务设施完善程度:', value); }}
  onAfterChange={(value) => {setPathService(value)}} max={1.8}/>

  <h4>挑战性</h4>
  <Slider marks={marks} value={setpath_challenge} onChange={(value) => { console.log('挑战性:', value); }}
  onAfterChange={(value) => { setPathChallenge(value) }} max={1.8}/>

  <h4>天气状况</h4>
  <Slider marks={marks} value={setpath_weather} onChange={(value) => { console.log('天气状况:', value); }}
  onAfterChange={(value) => { setPathWeather(value) }} max={1.8}/>
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