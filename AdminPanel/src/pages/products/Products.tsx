import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import CardHeader from '../../components/card/CardHeader';
import AddProduct from '../../components/popup/AddProduct';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import "./style.css"
const Products = () => {

    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className='container mx-auto'>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Input
                        placeholder="Search"
                        variant="borderless"
                        style={{
                            width: 300,
                            height: 48,
                            borderRadius: 999,
                            paddingLeft: 20,
                            fontSize: 16,
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        suffix={
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 1, height: 24, backgroundColor: '#ddd' }} />
                                <SearchOutlined style={{ color: '#00979D', fontSize: 18, cursor: 'pointer' }} />
                            </div>
                        }
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        style={{
                            backgroundColor: '#00979D',
                            borderColor: '#00979D',
                            height: 48,
                            padding: '0 24px',
                            borderRadius: 999,
                            fontSize: 16,
                            fontWeight: 500,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        }}
                        onClick={openPopup}
                    >
                        Add Product
                    </Button>
                    <AddProduct isOpen={isOpen} onClose={closePopup} children={undefined}></AddProduct>
                </div>
                <div className='flex justify-center text-[35px] gap-12 text-[#A6A6A6] mt-10 mb-10'>
                    <NavLink className={({ isActive }) =>isActive || location.pathname === "/products" ? "test active" : "test"} to="/products/framed"end>Framed</NavLink>
                    {/* <NavLink className="test" to="/products/framed" end>Framed</NavLink> */}
                    <NavLink className="test" to="/products/inflatable">Inflatable</NavLink>
                </div>
                <CardHeader />
                <Outlet />
            </div>
        </>
    );
};

export default React.memo(Products);
