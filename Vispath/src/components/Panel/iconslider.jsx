import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Slider } from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';

// 构造URL
const sendDataToBackend = (type, value) => {
  
  const url = `http://localhost:5000/data?type=${encodeURIComponent(type)}&value=${encodeURIComponent(value)}`;
    axios.get(url)
    .then(response => {
      console.log("Data sent successfully: ", response.data);
    })
    .catch(error => {
      console.error("Error sending data: ", error);
    });
  }

//---连接要求——景观---
const IconSlider1 = ({ setlandscape_compact, ...props }) => {
    const { max, min } = props;
    const [value, setValue] = useState(0)
    const mid = Number(((max - min) / 2).toFixed(5))
    const preColorCls = value >= mid ? '' : 'icon-wrapper-active'
    const nextColorCls = value >= mid ? 'icon-wrapper-active' : ''
    const textStyle = {
      fontSize: '13px',
      color: '#404040', 
      fontWeight: 'bolder',
      marginLeft: '0px',
    }
    const handleSliderChange1 = (value) => {
        setValue(value);
        sendDataToBackend('setlandscape_compact', value);
      }
    return (
      <>
      <span style={textStyle}>紧凑度</span>
      <div className="icon-wrapper">
        <FrownOutlined className={preColorCls} />
        <Slider {...props} onChange={handleSliderChange1} value={value} />
        <SmileOutlined className={nextColorCls} />
      </div>
      </>
    )
  }
  const mapStateToProps1 = (state) => ({
    value: state.trajReducer.setlandscape_compact,
  });
  
  const mapDispatchToProps1 = (dispatch) => ({
    setlandscape_compact: (value) => dispatch({ type: 'setlandscape_compact', data: value }),
  });
  export const ConnectedIconSlider1 = connect(mapStateToProps1, mapDispatchToProps1)(IconSlider1);
  
  const IconSlider2 = ({ setlandscape_loose, ...props }) => {
    const { max, min } = props;
    const [value, setValue] = useState(0)
    const mid = Number(((max - min) / 2).toFixed(5))
    const preColorCls = value >= mid ? '' : 'icon-wrapper-active'
    const nextColorCls = value >= mid ? 'icon-wrapper-active' : ''
    const textStyle = {
      fontSize: '13px',
      color: '#404040', 
      fontWeight: 'bolder',
      marginLeft: '0px',
    }
    const handleSliderChange2 = (value) => {
        setValue(value);
        sendDataToBackend('setlandscape_loose', value);
      }
    return (
      <>
      <span style={textStyle}>松散度</span>
      <div className="icon-wrapper">
        <FrownOutlined className={preColorCls} />
        <Slider {...props} onChange={handleSliderChange2} value={value} />
        <SmileOutlined className={nextColorCls} />
      </div>
      </>
    )
  }
  const mapStateToProps2 = (state) => ({
    value: state.trajReducer.landscape_loose,
  });
  
  const mapDispatchToProps2 = (dispatch) => ({
    setlandscape_loose: (value) => dispatch({ type: 'setlandscape_loose', data: value }),
  });
  
  export const ConnectedIconSlider2 = connect(mapStateToProps2, mapDispatchToProps2)(IconSlider2);
  //---连接要求——景观---
  
  //---连接要求——核心---
  const IconSlider3 = ({ setdemand_compact, ...props }) => {
    const { max, min } = props;
    const [value, setValue] = useState(0)
    const mid = Number(((max - min) / 2).toFixed(5))
    const preColorCls = value >= mid ? '' : 'icon-wrapper-active'
    const nextColorCls = value >= mid ? 'icon-wrapper-active' : ''
    const textStyle = {
      fontSize: '13px',
      color: '#404040', 
      fontWeight: 'bolder',
      marginLeft: '0px',
    }
    const handleSliderChange3 = (value) => {
        setValue(value);
        sendDataToBackend('setdemand_compact', value);
      }
    return (
      <>
      <span style={textStyle}>紧凑度</span>
      <div className="icon-wrapper">
        <FrownOutlined className={preColorCls} />
        <Slider {...props} onChange={handleSliderChange3} value={value} />
        <SmileOutlined className={nextColorCls} />
      </div>
      </>
    )
  }
  const mapStateToProps3 = (state) => ({
    value: state.trajReducer.demand_compact,
  });
  
  const mapDispatchToProps3 = (dispatch) => ({
    setdemand_compact: (value) => dispatch({ type: 'setdemand_compact', data: value }),
  });
  export const ConnectedIconSlider3 = connect(mapStateToProps3, mapDispatchToProps3)(IconSlider3);
  
  const IconSlider4 = ({ setdemand_loose, ...props }) => {
    const { max, min } = props;
    const [value, setValue] = useState(0)
    const mid = Number(((max - min) / 2).toFixed(5))
    const preColorCls = value >= mid ? '' : 'icon-wrapper-active'
    const nextColorCls = value >= mid ? 'icon-wrapper-active' : ''
    const textStyle = {
      fontSize: '13px',
      color: '#404040', 
      fontWeight: 'bolder',
      marginLeft: '0px',
    }
    const handleSliderChange4 = (value) => {
        setValue(value);
        sendDataToBackend('setdemand_loose', value);
      }
    return (
      <>
      <span style={textStyle}>松散度</span>
      <div className="icon-wrapper">
        <FrownOutlined className={preColorCls} />
        <Slider {...props} onChange={handleSliderChange4} value={value} />
        <SmileOutlined className={nextColorCls} />
      </div>
      </>
    )
  }
  const mapStateToProps4 = (state) => ({
    value: state.trajReducer.demand_loose,
  });
  
  const mapDispatchToProps4 = (dispatch) => ({
    setdemand_loose: (value) => dispatch({ type: 'setdemand_loose', data: value }),
  });
  export const ConnectedIconSlider4 = connect(mapStateToProps4, mapDispatchToProps4)(IconSlider4);
  //---连接要求——核心---