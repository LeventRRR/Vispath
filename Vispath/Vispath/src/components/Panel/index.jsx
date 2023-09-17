import { Collapse } from 'antd';
import React from 'react';

import './index.css';
import  Tree  from './treeselect.jsx';
import Jg from './jingguan.jsx';
import Demand from './demand.jsx';
import BSlider from './slider.jsx';
import Label from './labelslider.jsx';

import { ConnectedIconSlider1, ConnectedIconSlider2, ConnectedIconSlider3, ConnectedIconSlider4 } from './iconslider';
// 滑动条设置
/*const IconSlider = (props) => {
  const { max, min } = props;
  const [value, setValue] = useState(0)
  const mid = Number(((max - min) / 2).toFixed(5))
  const preColorCls = value >= mid ? '' : 'icon-wrapper-active'
  const nextColorCls = value >= mid ? 'icon-wrapper-active' : ''
 
  return (
    <>
    <div className="icon-wrapper">
      <FrownOutlined className={preColorCls} />
      <Slider {...props} onChange={setValue} value={value} />
      <SmileOutlined className={nextColorCls} />
      
    </div>
    </>
  )
}
*/


// 下拉面板
/*const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
*/
const itemsNest1 = [
  {
    key: '1',
    label: '景观类型',
    children: <>
    <Jg/>
    <ConnectedIconSlider1 min={0} max={5} /> 
    <ConnectedIconSlider2 min={0} max={5} /> 
    </>,
  },
];
const itemsNest2 = [
  {
    key: '2',
    label: '核心需求',
    children: <>
    <Demand/>
    <ConnectedIconSlider3 min={0} max={5} /> 
    <ConnectedIconSlider4 min={0} max={5} /> 
    </>,
  },
];

const items = [
  {
    key: '1-1',
    label: '出行方式',
    children: <><Tree/></>,
  },
  {
    key: '1-2',
    label: '连接要求',
    children: (
        <>
        <Collapse defaultActiveKey="1" items={itemsNest1} />
        <Collapse defaultActiveKey="2" items={itemsNest2} />
        </>
    )
  },
  {
    key: '1-3',
    label: '筛选条件',
    children: <>
    <BSlider/>
    </>,
  },
  {
    key: '1-4',
    label: '评价权重',
    children: <><Label /> {/* Add IconSlider component here */}</>,
  },
];
const App = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
   <>

   <Collapse onChange={onChange} items={items} className="collapse-container" />
   
   </>
  )
};
export default App;