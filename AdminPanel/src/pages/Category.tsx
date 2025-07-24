import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import CategoryHeader from '../components/card/CategoryHeader';
import CategoryCard from '../components/card/CategoryCard';
import AddCategory from '../components/popup/AddCategory';
import { useCategory } from '../service/UseCategory';

export interface Category {
id: string;
name_uz: string;
name_ru: string;
}

const Categories = () => {
const [isOpen, setIsOpen] = useState(false);
const [editingCategory, setEditingCategory] = useState<Category | null>(null);
const [_, setCategories] = useState<{ name: string; uzbek: string }[]>([]);

const { getCategory, createCategory, updateCategory, deleteCategory } = useCategory();
const { data } = getCategory();
const category: Category[] = data?.data || [];

const openPopup = () => setIsOpen(true);
const closePopup = () => {
setIsOpen(false);
setEditingCategory(null);
};

const handleAdd = (name: string, uzbek: string) => {
createCategory.mutate({
name_ru: name,
name_uz: uzbek
}, {
onSuccess: () => {
toast.success('Category created successfully!');
},
onError: () => {
toast.error('Failed to create category');
}
});
setCategories((prev) => [...prev, { name, uzbek }]);
};

const handleEdit = (category: Category) => {
setEditingCategory(category);
setIsOpen(true);
};

const handleUpdate = (id: string, name: string, uzbek: string) => {
updateCategory.mutate({
id,
name_ru: name,
name_uz: uzbek
}, {
onSuccess: () => {
toast.success('Category updated successfully!');
},
onError: () => {
toast.error('Failed to update category');
}
});
};

const handleDelete = (id: string) => {
if (window.confirm('Are you sure you want to delete this category?')) {
deleteCategory.mutate(id, {
onSuccess: () => {
toast.success('Category deleted successfully!');
},
onError: () => {
toast.error('Failed to delete category');
}
});
}
};

return (
<>
<div className='container mx-auto'>
<div style={{ placeSelf: 'flex-end' }}>
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
 Add Category
</Button>
</div>
<CategoryHeader />
<AddCategory
isOpen={isOpen}
onClose={closePopup}
onAdd={handleAdd}
editingCategory={editingCategory}
onUpdate={handleUpdate}
/>
{ category.map((category: Category) => (
<CategoryCard
key={category.id}
category={category}
onEdit={handleEdit}
onDelete={handleDelete}
/>
 ))}
</div>
</>
 );
};

export default React.memo(Categories);