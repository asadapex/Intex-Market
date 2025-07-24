import React from 'react'

const OrderHeader = () => {
  return (
    <>
    <div
      style={{
        background: '#fff',
        borderRadius: "30px",
        display: 'flex',
        alignItems: 'center',
        padding: '18px 42px',
        marginBottom: "22px",
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ width: 130, fontSize: 16, fontWeight: 500 }}>Client Name</div>

      <div style={{ width: 160, fontSize: 16, fontWeight: 500 }}>Phone Number</div>

      <div style={{ width: 160, fontSize: 16, fontWeight: 500 }}>Image</div>

      <div style={{ width: 120, fontSize: 16, fontWeight: 500 }}>Size/Depth</div>

      <div style={{ width: 130, fontSize: 16, fontWeight: 500 }}>Price</div>

      <div style={{ width: 180, fontSize: 16, fontWeight: 500 }}>Address</div>

      <div style={{ width: 130, fontSize: 16, fontWeight: 500 }}>Time</div>

      <div style={{ marginLeft: 'auto', fontSize: 16, fontWeight: 500 }}>Actions</div>
    </div>
    </>

  )
}

export default React.memo(OrderHeader)