import React from 'react'

const CategoryHeader = () => {
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
            marginTop: "40px"
        }}
        >
            <div style={{width:"40%",  fontSize: 16, fontWeight: 500 }}>Name</div>

            <div style={{width:"40%",  fontSize: 16, fontWeight: 500 }}>Name in Uzbek</div>

            <div style={{marginLeft: 'auto',  fontSize: 16, fontWeight: 500 }}>Actions</div>
        </div>
    </>

  )
}

export default React.memo(CategoryHeader)
