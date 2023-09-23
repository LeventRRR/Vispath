import React, { useState } from 'react';
import { TreeSelect } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios'; 

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

     // 构造URL
    const url = `http://localhost:5000/data?setlandscape_type=${encodeURIComponent(newValue)}`;
    // 发送数据到后端
    try {
      const response = await axios.get(url);
      // 处理响应，例如：检查是否成功
      if(response.data.success) {
        console.log('Data sent successfully!');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  
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