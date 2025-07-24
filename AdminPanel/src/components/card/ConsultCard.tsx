import React from 'react'
import deleteicon from '../../assets/images/delete.svg'
import tick from '../../assets/images/tick.svg'
import greentick from '../../assets/images/greentick.svg'
const ConsultCard = ({
  name,
  phone,
  time,
  date,
  isCompleted,
  onDelete,
  onToggleCompleted,
}: {
  name: string
  phone: string
  time: string
  date: string
  isCompleted: boolean
  onDelete: () => void
  onToggleCompleted: () => void
}) => {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        padding: '18px 42px',
        marginBottom: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{width:"30%", fontSize: 16, fontWeight: 500 }}>{name}</div>
      <div style={{width:"30%", fontSize: 16, fontWeight: 500 }}>{phone}</div>
      <div style={{width:"30%", fontSize: 16, fontWeight: 500 }}>
        {time} <span style={{ marginLeft: 6 }}>{date}</span>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          style={{
            fontSize: 18,
            cursor: 'pointer',
            color: isCompleted ? '#aaa' : '#ccc',
          }}
        >
          <img src={isCompleted ? greentick : tick} alt="tick" onClick={onToggleCompleted} />
        </span>
        <span
          onClick={onDelete}
          style={{
            fontSize: 18,
            cursor: 'pointer',
          }}
        >
          <img src={deleteicon} alt="delete" />
        </span>
      </div>
    </div>
  )
}

export default React.memo(ConsultCard)
