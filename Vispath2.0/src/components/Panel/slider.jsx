import React, { useState } from 'react';
import { Slider, Switch } from 'antd';
import { connect } from 'react-redux';

// 组件功能：选择线路长度

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
  

  }
  const onChange = (checked) => {
    setDisabled(checked);
  };
  return (
    <>
    <span style={textStyle}>线路长度(km)</span>
      <Slider range min={2} max={8} defaultValue={[3,7]} disabled={disabled}
      onChange={handleSliderChange} />
      {/* Disabled: <Switch size="small" checked={disabled} onChange={onChange} /> */}
      Disabled: <Switch size="small" checked={disabled} onChange={onChange} /> 
    </>
  );
};
const mapStateToProps = (state) => ({
  setpath_min: state.mapdata.setpath_min,
  setpath_max: state.mapdata.setpath_max,
});

const mapDispatchToProps = (dispatch) => ({
  updatePathMin: (value) => dispatch({ type: 'setpath_min', data: value }),
  updatePathMax: (value) => dispatch({ type: 'setpath_max', data: value })
});

export default connect(mapStateToProps, mapDispatchToProps)(BSlider);