import React, { useState } from 'react';
import { Layout, Menu ,FloatButton } from 'antd';
import Tree from './treeselect.jsx';
import Jg from './jingguan.jsx';
import Demand from './demand.jsx';
import BSlider from './slider.jsx';
import Label from './labelslider.jsx';
import { ConnectedIconSlider1, ConnectedIconSlider2, ConnectedIconSlider3, ConnectedIconSlider4 } from './iconslider.jsx';
import './index.css';

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [dashboardVisible, setDashboardVisible] = useState(true);

    const items = [
        {
            key: '1-1',
            title: '出行方式',
            content: <Tree />
        },
        {
            key: '1-2',
            title: '连接要求',
            content: (
                <>
                    <Jg />
                    <ConnectedIconSlider1 min={0} max={5} />
                    <ConnectedIconSlider2 min={0} max={5} />
                    <Demand />
                    <ConnectedIconSlider3 min={0} max={5} />
                    <ConnectedIconSlider4 min={0} max={5} />
                </>
            )
        },
        {
            key: '1-3',
            title: '筛选条件',
            content: <BSlider />
        },
        {
            key: '1-4',
            title: '评价权重',
            content: <Label />
        }
    ];

    return (
        <>
        <FloatButton className='dashboardvisible'
                onClick={() => setDashboardVisible(!dashboardVisible)}
            >
                {dashboardVisible ? '隐藏' : '显示'} Dashboard
            </FloatButton>

        {dashboardVisible && (
        <Layout 
        //style={{ minHeight: '100vh' }} 
        className="custom-layout">
            <Header style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <span style={{ color: 'white' }}>Visual GIS Dashboard</span>
                </Header>
            <Layout>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="demo-logo-vertical" />
                <Menu mode="inline" defaultSelectedKeys={['1']} onClick={({ key }) => setSelectedContent(items.find(item => item.key === key).content)}>
                    {items.map(item => (
                        <Menu.Item key={item.key}>
                            {item.title}
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
                <Content style={{ margin: '0 16px', padding: 24, minHeight: 100 }}>
                    {selectedContent}
                </Content>
            </Layout>
                <Footer style={{ textAlign: 'center' }}>
                     Visual GIS App by HCR
                </Footer>
        </Layout>
        )}
        </>
    );
};

export default App;
