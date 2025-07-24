import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Form } from 'antd';

interface AddCategoryProps {
isOpen: boolean;
onClose: () => void;
onAdd: (name: string, uzbek: string) => void;
editingCategory?: any;
onUpdate?: (id: string, name: string, uzbek: string) => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ isOpen, onClose, onAdd, editingCategory, onUpdate }) => {
const [name, setName] = useState('');
const [uzbek, setUzbek] = useState('');
const [form] = Form.useForm();

useEffect(() => {
if (editingCategory) {
const nameValue = editingCategory.name_ru || '';
const uzbekValue = editingCategory.name_uz || '';
setName(nameValue);
setUzbek(uzbekValue);
form.setFieldsValue({
name: nameValue,
uzbek: uzbekValue
});
} else {
setName('');
setUzbek('');
form.setFieldsValue({
name: '',
uzbek: ''
});
}
}, [editingCategory, isOpen, form]);

const handleSubmit = () => {
if (!name.trim() || !uzbek.trim()) return;

if (editingCategory && onUpdate) {
onUpdate(editingCategory.id, name, uzbek);
} else {
onAdd(name, uzbek);
}

form.resetFields();
setName('');
setUzbek('');
onClose();
};

const handleClose = () => {
form.resetFields();
setName('');
setUzbek('');
onClose();
};

return (
<Modal
open={isOpen}
onCancel={handleClose}
footer={null}
centered
closable={false}
width={600}
style={{
borderRadius: 20,
padding: 32,
textAlign: 'center',
}}
>
<h2
style={{
color: '#00979D',
fontSize: 24,
fontWeight: 600,
marginBottom: 24,
}}
>
{editingCategory ? 'Edit Category' : 'Add Category'}
</h2>
<Form form={form} onFinish={handleSubmit}>
<div className="flex justify-between mb-6 gap-4">
<div className="flex flex-col text-left w-1/2">
<label className="text-gray-600 mb-1">Name</label>
<Form.Item
name="name"
rules={[{ required: true, message: 'Name is required' }]}
>
<Input
prefix={<span className="text-gray-400">{'{T}'}</span>}
value={name}
onChange={(e) => setName(e.target.value)}
style={{ height: 40, borderRadius: 8 }}
/>
</Form.Item>
</div>
<div className="flex flex-col text-left w-1/2">
<label className="text-gray-600 mb-1">In Uzbek</label>
<Form.Item
name="uzbek"
rules={[{ required: true, message: 'Uzbek translation is required' }]}
>
<Input
prefix={<span className="text-gray-400">{'{T}'}</span>}
value={uzbek}
onChange={(e) => setUzbek(e.target.value)}
style={{ height: 40, borderRadius: 8 }}
/>
</Form.Item>
</div>
</div>
<Button
type="primary"
htmlType="submit"
style={{
backgroundColor: '#00979D',
borderColor: '#00979D',
borderRadius: 999,
height: 40,
padding: '0 32px',
fontWeight: 500,
}}
>
{editingCategory ? 'Update' : 'Add'}
</Button>
</Form>
</Modal>
);
};

export default React.memo(AddCategory);