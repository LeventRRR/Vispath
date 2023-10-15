import React, { useState,useEffect } from 'react';
import { TreeSelect } from 'antd';
import { connect } from 'react-redux';

// 组件功能：选择景观类型

const treeData = [
      {
        value: 'ziran',
        title: '自然景观',
        
      },
      {
        value: 'renwen',
        title: '人文景观',
      },
    ]
  
const Jg = ({ setlandscape_type, setLandscapeType }) => {
  const [value, setValue] = useState(setlandscape_type);

  const onChange = async(newValue) => {
    setValue(newValue);
    setLandscapeType(newValue);  // dispatching the action
    };
    useEffect(() => {
      console.log("景观类型:", setlandscape_type);
    }, [setlandscape_type]);

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
  setlandscape_type: state.mapdata.setlandscape_type
});

const mapDispatchToProps = (dispatch) => ({
  setLandscapeType: (value) => dispatch({ type: 'setlandscape_type', data: value })
});

export default connect(mapStateToProps, mapDispatchToProps)(Jg);