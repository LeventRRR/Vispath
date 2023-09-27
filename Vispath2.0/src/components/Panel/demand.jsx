import React, { useState,useEffect } from 'react';
import { TreeSelect } from 'antd';
import { connect } from 'react-redux';

// 组件功能：选择核心需求

const treeData = [
      {
        value: 'challenge',
        title: '挑战性',
        
      },
      {
        value: 'hot',
        title: '热度',
      },
      {
        value: 'fundamental',
        title: '服务设施',
      },
    ]
  
const Demand = ({ setdemand_type, setDemandType }) => {
  const [value, setValue] = useState(setdemand_type);
  
  useEffect(() => {
    setValue(setdemand_type);
  }, [setdemand_type]); //使用useEffect钩子来监听demand_type的变化，并同步更新组件的本地状态。

  const onChange = async(newValue) => {
    setValue(newValue);
    setDemandType(newValue);
  }
    useEffect(() => {
      console.log("需求:", setdemand_type);
    }, [setdemand_type]);
    

  return (
    <>
    <TreeSelect
      showSearch
      style={{
        width: '100%',
      }}
      value={value}
      dropdownStyle={{
        maxHeight: 400,
        overflow: 'auto',
      }}
      placeholder="Please select"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
      treeData={treeData}
    />
    </>
  );
}
const mapStateToProps = (state) => ({
  setdemand_type: state.mapdata.setdemand_type,
});

const mapDispatchToProps = (dispatch) => ({
  setDemandType: (type) => dispatch({ type: 'setdemand_type', data: type }),
});

const ConnectedDemand = connect(mapStateToProps, mapDispatchToProps)(Demand);
export default ConnectedDemand;
