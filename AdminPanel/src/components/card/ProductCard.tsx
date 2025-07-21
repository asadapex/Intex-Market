import React from 'react';
import editimg from "../../assets/images/edit.svg"
import deleteimg from "../../assets/images/delete.svg"

interface ProductCardProps {
  image: string;
  oldPrice: string;
  newPrice: string;
  quantity: number;
  frame: string;
  size: string;
  depth: number;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  oldPrice,
  newPrice,
  quantity,
  frame,
  size,
  depth,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: "30px",
        display: 'flex',
        alignItems: 'center',
        padding: '10px 42px',
        marginBottom: "8px",
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        // border: '1px solid #ddd',
      }}
    >
      <div style={{ width: 160}}>
        <img
          src={image}
          alt="product"
          style={{
            width: 80,
            height: 40,
            objectFit: 'contain',
          }}
        />
      </div>

      <div style={{ width: 190 }}>
        <div style={{ fontSize: 14, color: 'red', textDecoration: 'line-through' }}>
          {oldPrice}
        </div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>{newPrice}</div>
      </div>

      <div style={{ width: 120, fontSize: 16 }}>{quantity}</div>

      <div style={{ width: 210, fontSize: 16 }}>{frame}</div>

      <div style={{ width: 120, fontSize: 16 }}>{size}</div>

      <div style={{ width: 120, fontSize: 16 }}>{depth}</div>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
        <img src={editimg} alt="edit"
          onClick={onEdit}
          style={{ fontSize: 18, color: '#39848d', cursor: 'pointer' }}
        />
        <img src={deleteimg} alt="delete"
          onClick={onDelete}
          style={{ fontSize: 18, color: '#FF0000', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
