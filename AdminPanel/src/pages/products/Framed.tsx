import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import ProductCard from '../../components/card/ProductCard';
import CardHeader from '../../components/card/CardHeader';
import AddProduct from '../../components/popup/AddProduct';
const Framed = () => {

  const [isOpen, setIsOpen] = useState(false);

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
                        bordered={false}
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
                    <button >Framed</button>
                    <button>Inflatable</button>
                </div>
                <CardHeader/>
                <ProductCard
                    image="https://static.intex-market.uz/pool.png"
                    oldPrice="1.800.000 сум"
                    newPrice="1.520.000 сум"
                    quantity={10}
                    frame="Металлический"
                    size="2,7"
                    depth={60}
                    onEdit={() => console.log('Edit clicked')}
                    onDelete={() => console.log('Delete clicked')}
                />
                <ProductCard
                    image="https://static.intex-market.uz/pool.png"
                    oldPrice="1.800.000 сум"
                    newPrice="1.520.000 сум"
                    quantity={10}
                    frame="Металлический"
                    size="2,7"
                    depth={60}
                    onEdit={() => console.log('Edit clicked')}
                    onDelete={() => console.log('Delete clicked')}
                />

            </div>
        </>
    );
};

export default React.memo(Framed);
