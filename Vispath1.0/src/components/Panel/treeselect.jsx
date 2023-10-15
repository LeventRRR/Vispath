import React, { useState,useEffect } from 'react';
import { TreeSelect } from 'antd';
import { connect } from 'react-redux';


// 组件功能：选择出行类型和时间

const typeData = [
      { title: '徒步', value: '0-1', key: '0-1' },
      { title: '登山', value: '0-2', key: '0-2' },
      { title: '骑行', value: '0-3', key: '0-3' },
    ]

const timeData = [
      { title: '今天', value: '1-1', key: '1-1' },
      { title: '明天', value: '1-2', key: '1-2' },
      { title: '后天', value: '1-3', key: '1-3' },
    ]

const Tree = ({ settrip_type, settrip_time, setTripType, setTripTime }) => {
  const [typeValue, setTypeValue] = useState(settrip_type);
  const [timeValue, setTimeValue] = useState(settrip_time);
  useEffect(() => {
    setTypeValue(settrip_type);
    setTimeValue(settrip_time);
  }, [settrip_type, settrip_time]);
  const onTypeChange = (newValue) => {
    setTripType(newValue);
    setTypeValue(newValue);
  };

  const onTimeChange = (newValue) => {
    setTripTime(newValue);
    setTimeValue(newValue);
  };
  console.log("出行方式:", settrip_type);
  console.log("出行时间:", settrip_time);


  return (
    <div>
      <TreeSelect
        treeData={typeData}
        value={typeValue}
        onChange={onTypeChange}
        placeholder="请选择出行类型"
        style={{ width: '100%', marginTop:80}}
      />
      <TreeSelect
        treeData={timeData}
        value={timeValue}
        onChange={onTimeChange}
        placeholder="请选择出行时间"
        style={{ width: '100%', marginTop:80}}
      />
    </div>
  );
};
const mapStateToProps = (state) => ({
  settrip_type: state.mapdata.settrip_type,
  settrip_time: state.mapdata.settrip_time
});

const mapDispatchToProps = (dispatch) => ({
  setTripType: (value) => dispatch({ type: 'settrip_type', data: value }),
  setTripTime: (value) => dispatch({ type: 'settrip_time', data: value })
});

export default connect(mapStateToProps, mapDispatchToProps)(Tree);