import React from 'react';
import { Slider} from 'antd';
import { connect } from 'react-redux';

// 组件功能：选择线路长度

const textStyle = {
  fontSize: '13px',
  color: '#404040', 
  fontWeight: 'bolder',
  marginLeft: '0px',
}
const BSlider = ({setpath_min, setpath_max, setPathValues}) => {


  const handleSliderChange = ([min, max]) => {
 
    console.log("path_min:", min);
    console.log("path_max:", max);
    
    // 更新Redux store
    setPathValues(min, max);
  }


  return (
    <>
    <span style={textStyle}>线路长度(km)</span>
      <Slider range min={2} max={10} value={[setpath_min, setpath_max]} 
      onChange={handleSliderChange} />
    </>
  );
};

const mapStateToProps = (state) => ({
  setpath_min: state.mapdata.setpath_min,
  setpath_max: state.mapdata.setpath_max,
});

const mapDispatchToProps = (dispatch) => ({
  setPathValues: (minValue, maxValue) => dispatch({ type: 'set_path_values', data: {min: minValue, max: maxValue} })
});

export default connect(mapStateToProps, mapDispatchToProps)(BSlider);
