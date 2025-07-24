import React from 'react'
import editimg from "../../assets/images/edit.svg"
import deleteicon from '../../assets/images/delete.svg'
import type { Category } from '../../pages/Category'

const CategoryCard = ({category, onEdit, onDelete}: {category: Category, onEdit: (category: Category) => void, onDelete: (id: string) => void}) => {
return (
<div>
<div
key={category.id}
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
<div style={{ width: "40%", fontSize: 16, fontWeight: 500 }}>{category.name_ru}</div>
<div style={{ width: "40%", fontSize: 16, fontWeight: 500 }}>{category.name_uz}</div>
<div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
<span
onClick={() => onEdit(category)}
style={{
fontSize: 18,
cursor: 'pointer',
 }}
>
<img src={editimg} alt="edit" />
</span>
<span
onClick={() => onDelete(category.id)}
style={{
fontSize: 18,
cursor: 'pointer',
 }}
>
<img src={deleteicon} alt="delete" />
</span>
</div>
</div>
</div>
 )
}
export default React.memo(CategoryCard)