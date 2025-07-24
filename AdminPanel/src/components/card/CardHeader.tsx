import React from 'react'

const CardHeader = () => {
  return (
    <>
    <div
      style={{
        background: '#fff',
        borderRadius: "30px",
        display: 'flex',
        alignItems: 'center',
        padding: '20px 42px',
        marginBottom: "22px",
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ width: 160, fontSize: 16, fontWeight: 500 }}>Image</div>

      <div style={{ width: 190, fontSize: 16, fontWeight: 500 }}>Price(Sum)</div>

      <div style={{ width: 120, fontSize: 16, fontWeight: 500 }}>Quantity</div>

      <div style={{ width: 210, fontSize: 16, fontWeight: 500 }}>Frame</div>

      <div style={{ width: 120, fontSize: 16, fontWeight: 500 }}>Size</div>

      <div style={{ width: 120, fontSize: 16, fontWeight: 500 }}>Depth (cm)</div>

      <div style={{ marginLeft: 'auto', fontSize: 16, fontWeight: 500 }}>Actions</div>
    </div>
    </>

  )
}

export default React.memo(CardHeader)