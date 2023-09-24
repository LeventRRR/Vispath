import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { Slider } from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';


/*
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
*/
//---连接要求——景观---
const IconSlider1 = ({ setlandscape_compact, setLandscapeCompact,...props }) => {
    const { max, min } = props;
    const [value, setValue] = useState(setlandscape_compact)
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
        setLandscapeCompact(value)
      }
        useEffect(() => {
          console.log("景观紧凑度:", setlandscape_compact);
        }, [setlandscape_compact]);
      
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
    setlandscape_compact: state.mapdata.setlandscape_compact,
  });
  
  const mapDispatchToProps1 = (dispatch) => ({
    setLandscapeCompact: (value) => dispatch({ type: 'setlandscape_compact', data: value }),
  });
  export const ConnectedIconSlider1 = connect(mapStateToProps1, mapDispatchToProps1)(IconSlider1);
  
  const IconSlider2 = ({ setlandscape_loose,setLandscapeLoose, ...props }) => {
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
        setLandscapeLoose(value)
      }
      useEffect(() => {
        console.log("景观松散度:", setlandscape_loose);
      }, [setlandscape_loose]);
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
    setlandscape_loose: state.mapdata.setlandscape_loose,
  });
  
  const mapDispatchToProps2 = (dispatch) => ({
    setLandscapeLoose: (value) => dispatch({ type: 'setlandscape_loose', data: value }),
  });
  
  export const ConnectedIconSlider2 = connect(mapStateToProps2, mapDispatchToProps2)(IconSlider2);
  //---连接要求——景观---
  
  //---连接要求——核心---
  const IconSlider3 = ({ setdemand_compact,setDemandCompact, ...props }) => {
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
        setDemandCompact(value)
      }
      useEffect(() => {
        console.log("需求紧凑度:", setdemand_compact);
      }, [setdemand_compact]);
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
    setdemand_compact: state.mapdata.setdemand_compact,
  });
  
  const mapDispatchToProps3 = (dispatch) => ({
    setDemandCompact: (value) => dispatch({ type: 'setdemand_compact', data: value }),
  });
  export const ConnectedIconSlider3 = connect(mapStateToProps3, mapDispatchToProps3)(IconSlider3);
  
  const IconSlider4 = ({ setdemand_loose,setDemandLoose, ...props }) => {
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
        setDemandLoose(value)
      }
      useEffect(() => {
        console.log("需求松散度:", setdemand_loose);
      }, [setdemand_loose]);
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
    setdemand_loose: state.mapdata.setdemand_loose,
  });
  
  const mapDispatchToProps4 = (dispatch) => ({
    setDemandLoose: (value) => dispatch({ type: 'setdemand_loose', data: value }),
  });
  export const ConnectedIconSlider4 = connect(mapStateToProps4, mapDispatchToProps4)(IconSlider4);
  //---连接要求——核心---