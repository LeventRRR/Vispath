import React, { useState } from 'react';
import { TreeSelect } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';

const { SHOW_CHILD } = TreeSelect;
const treeData = [
  {
    title: '出行类型',
    value: 'travel-type',
    //key: '1',
    children: [
      {
        title: '徒步',
        value: '0-1',
        key: '0-1',
      },
      {
        title: '登山',
        value: '0-2',
        key: '0-2',
      },
      {
        title: '骑行',
        value: '0-3',
        key: '0-3',
      },
    ],
  },
  {
    title: '出行时间',
    value: 'travel-time',
    //key: '2',
    children: [
      {
        title: '今天',
        value: '1-1',
        key: '1-1',
      },
      {
        title: '明天',
        value: '1-2',
        key: '1-2',
      },
      {
        title: '后天',
        value: '1-3',
        key: '1-3',
      },
    ],
  },
];
const Tree = ({ settrip_type, settrip_time, setTripType, setTripTime }) => {
  const [value, setValue] = useState([...settrip_type, ...settrip_time]);

  const onChange = async(newValue) => {
    console.log('onChange', newValue);
    // 根据选择的项来分发相应的actions
    const currentType = newValue.find(val => val.startsWith('0-'));
    const currentTiming = newValue.find(val => val.startsWith('1-'));

    const newType = newValue.find(val => val.startsWith('0-'));
    const newTiming = newValue.find(val => val.startsWith('1-'));

    if (currentType !== newType && newType) {
      setTripType([newType]);
  }
  
  if (currentTiming !== newTiming && newTiming) {
      setTripTime([newTiming]);
  }
  
    setValue(newValue);

    // 发送选择到后端服务器
    try {
      // 构造URL
    const url = `http://localhost:5000/data?settrip_type=${encodeURIComponent(newType)}&settrip_time=${encodeURIComponent(newTiming)}`;
      const response = await axios.get(url);

      // 处理响应，例如：检查是否成功
      if (response.data.success) {
        console.log('Data sent successfully!');
      } else {
        console.error('Server responded with an error:', response.data.message);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  const tProps = {
    treeData,
    value: value.filter((val) => val.includes('-')),
    onChange,
    treeCheckable: true,
    treeCheckStrictly: false,
    showCheckedStrategy: SHOW_CHILD,
    placeholder: 'Please select',
    style: {
      width: '100%',
    },
  };
  return <TreeSelect {...tProps} />;
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