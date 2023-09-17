import React, { useState } from 'react';
import { Slider, Switch } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios'; 

const textStyle = {
  fontSize: '13px',
  color: '#404040', 
  fontWeight: 'bolder',
  marginLeft: '0px',
}
const BSlider = ({setpath_min,setpath_max,updatePathMin,updatePathMax}) => {
  const [disabled, setDisabled] = useState(false);

  const handleSliderChange = async(values) => {
    const [newpathmin, newpathmax] = values;
    
    console.log("path_min:", newpathmin);
    console.log("path_max:", newpathmax);
    
    // 更新Redux store
    updatePathMin(newpathmin);
    updatePathMax(newpathmax);
  

  try {
    // 构造URL
  const url = `http://localhost:5000/data?setpath_min=${encodeURIComponent(newpathmin)}&setpath_max=${encodeURIComponent(newpathmax)}`;
    const response = await axios.get(url);
    // 处理响应，例如：检查是否成功
    if(response.data.success) {
      console.log('Data sent successfully!');
    }
  } catch (error) {
    console.error('Error sending data:', error);
  }
  }
  const onChange = (checked) => {
    setDisabled(checked);
  };
  return (
    <>
    <span style={textStyle}>线路长度(km)</span>
      <Slider range min={2} max={8} defaultValue={[2, 8]} disabled={disabled}
      onChange={handleSliderChange} />
      {/* Disabled: <Switch size="small" checked={disabled} onChange={onChange} /> */}
      Disabled: <Switch size="small" checked={disabled} onChange={onChange} /> 
    </>
  );
};
const mapStateToProps = (state) => ({
  setpath_min: state.setpath_min,
  setpath_max: state.setpath_max,
});

const mapDispatchToProps = (dispatch) => ({
  updatePathMin: (value) => dispatch({ type: 'setpath_min', data: value }),
  updatePathMax: (value) => dispatch({ type: 'setpath_max', data: value })
});

export default connect(mapStateToProps, mapDispatchToProps)(BSlider);