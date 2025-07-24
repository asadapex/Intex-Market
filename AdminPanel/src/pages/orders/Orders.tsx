import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import "./style.css"
import OrderHeader from '../../components/card/OrderHeader';
import ConsultHeader from '../../components/card/ConsultHeader';
import { useDebounce } from '../../shared/hooks/UseDebounce';
import {useParamsHook} from "../../shared/hooks/UseSearchParams"

const Orders = () => {

    const location = useLocation();
    const flagpath = location.pathname.split("/")[2]

    const {getParam, setParam, removeParam} = useParamsHook()
    const search = getParam("search") || ""

    const [qery, setquery] = useState<string>(search)

    const debounceValue = useDebounce(qery);

    useEffect(() => {
        if(debounceValue){
            setParam("search", debounceValue) 
        }else{
            removeParam("search")
        }
    }, [debounceValue]);
    
    return (
        <>
            <div className='container mx-auto'>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Input
                        value={qery}
                        onChange={(e) => setquery(e.target.value)}  
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
                </div>
                <div className='flex justify-center text-[35px] gap-12 text-[#A6A6A6] mt-10 mb-10'>
                    <NavLink className={({ isActive }) =>isActive || location.pathname === "/orders" ? "test active" : "test"} to="/orders/allorders"end>Orders</NavLink>
                    {/* <NavLink className="test" to="/products/framed" end>Framed</NavLink> */}
                    <NavLink className="test" to="/orders/consultations">Consultation</NavLink>
                </div>
                {flagpath !== "consultations" ? <OrderHeader /> : <ConsultHeader />}
                <Outlet />
            </div>
        </>
    );
};

export default React.memo(Orders);
