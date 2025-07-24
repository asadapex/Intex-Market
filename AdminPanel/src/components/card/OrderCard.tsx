import React from 'react'
import deleteicon from '../../assets/images/delete.svg'
import tick from '../../assets/images/tick.svg'
import greentick from '../../assets/images/greentick.svg'

type OrderCardProps = {
  name: string
  phone: string
  image: string
  size: string
  price: string
  address: string
  time: string
  date: string
  onDelete: () => void
  onToggleCheck: () => void
  check: boolean
}

const OrderCard: React.FC<OrderCardProps> = ({
  name,
  phone,
  image,
  size,
  price,
  address,
  time,
  date,
  onDelete,
  onToggleCheck,
  check
}) => {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 42px',
        marginBottom: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ width: 130, fontSize: 16 }}>{name}</div>
      <div style={{ width: 160, fontSize: 16 }}>{phone}</div>
      <div style={{ width: 160 }}>
        <img
          src={image}
          alt="product"
          style={{
            width: 60,
            height: 40,
            objectFit: 'contain',
          }}
        />
      </div>
      <div style={{ width: 120, fontSize: 16 }}>{size}</div>
      <div style={{ width: 130, fontSize: 16 }}>{price}</div>
      <div style={{ width: 180, fontSize: 13, lineHeight: '1.2' }}>
        {address}
      </div>
      <div style={{ width: 130, fontSize: 16, whiteSpace: 'nowrap' }}>
        {time} {date}
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          onClick={onToggleCheck}
          style={{
            fontSize: 18,
            cursor: 'pointer'
          }}
        >
          <img
            src={check ? greentick : tick}
            alt="tick"
          />

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

export default React.memo(OrderCard)
