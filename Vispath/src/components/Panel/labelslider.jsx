import React from 'react';
import { Slider } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';

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
  const submitToBackend = (type, value) => {
    // 构造URL
    const url = `http://localhost:5000/data?type=${encodeURIComponent(type)}&value=${encodeURIComponent(value)}`;
    axios.get(url)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error("Error sending data to backend:", error);
    });
  };

  return(
<>
  <h4>热门程度</h4>
  <Slider marks={marks} value={setpath_hot} onAfterChange={(value) => { setPathHot(value); submitToBackend('setpath_hot', value); }} max={1.8}/>

  <h4>服务设施完善程度</h4>
  <Slider marks={marks} value={setpath_service} onAfterChange={(value) => {setPathService(value);submitToBackend('setpath_service', value);}} max={1.8}/>

  <h4>挑战性</h4>
  <Slider marks={marks} value={setpath_challenge} onAfterChange={(value) => { setPathChallenge(value); submitToBackend('setpath_challenge', value); }} max={1.8}/>

  <h4>天气状况</h4>
  <Slider marks={marks} value={setpath_weather} onAfterChange={(value) => { setPathWeather(value); submitToBackend('setpath_weather', value); }} max={1.8}/>
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