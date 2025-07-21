import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ProductOutlined,
  OrderedListOutlined,
  CaretRightOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
        <Layout style={{minHeight:"100vh"}}>
            <Sider style={{ background: 'white' }} trigger={null} collapsible collapsed={collapsed}>
            <div
                style={{
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'start',
                paddingLeft: collapsed ? 0 : 16,
                fontWeight: 700,
                fontSize: 12,
                color: '#009398',
                letterSpacing: 1,
                }}
            >
                INTEX-MARKET.UZ
            </div>

            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                {
                    key: '1',
                    icon: <ProductOutlined />,
                    label: <Link to={"/products"}>Products</Link>
                    
                },
                {
                    key: '2',
                    icon: <OrderedListOutlined />,
                    label: <Link to={"/orders"}>Orders</Link>
                },
                {
                    key: '3',
                    icon: <CaretRightOutlined />,
                    label: <Link to={"/categories"}>Categories</Link>
                },
                {
                    key: '4',
                    icon: <SettingOutlined/>,
                    label: <Link to={"/settings"}>Settings</Link>
                }
                ]}
            />
            </Sider>
        <Layout>
            <Header
            style={{
                padding: '0 24px',
                background: colorBgContainer,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 64,
            }}
            >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                fontSize: '16px',
                width: 40,
                height: 40,
                }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: '#A6A6A6' }}>
                <span style={{ fontSize: 14 }}>Просмотр веб-сайта</span>
                <div style={{ width: 1, height: 24, background: '#ddd' }} />
                <UserOutlined />
                <span style={{ fontSize: 14 }}>Joe Melton</span>
            </div>
            </Header>
            <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
            >
            <Outlet/>
            </Content>
        </Layout>
        </Layout>
    </>
  );
};

export default MainLayout;