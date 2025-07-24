import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  OrderedListOutlined,
  CaretRightOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import usericon from "../assets/images/user.svg"
import LogoutButton from '../components/auth/LogoutButton';

const { Header, Sider, Content } = Layout;

const adminName = localStorage.getItem('admin') || "Intex-Admin"

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  let {pathname} = useLocation()
  pathname = pathname.split("/")[1]
    if (pathname === "products") {
      pathname = "1"
    }
    if (pathname === "orders") {
      pathname = "2"
    }
    if (pathname === "categories") {
      pathname = "3"
    }
    if (pathname === "settings") {
      pathname = "4"
    }
  
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
                fontSize: 15,
                color: '#009398',
                letterSpacing: 1,
                }}
            >
                {collapsed ? <p className='text-white bg-[#009398] rounded px-2 py-1'>INTEX</p> : 'INTEX-MARKET.UZ'}
            </div>

            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={[pathname]}
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
                <span className='cursor-pointer' style={{ fontSize: 14 }}>Website preview</span>
                <div style={{ width: 1, height: 24, background: '#ddd' }} />
                <div className='flex items-center gap-1'>
                  <img src={usericon} alt="user" style={{ width: 16, height: 16 }} />
                  <span style={{ fontSize: 14 }}>{adminName}</span>
                </div>
                <LogoutButton/>
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
