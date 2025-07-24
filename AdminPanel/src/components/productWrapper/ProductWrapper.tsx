import React, { useState } from 'react'
import ProductCard from '../card/ProductCard'
import { useProduct } from '../../service/UseProduct'
import toast from 'react-hot-toast'
import { useCategory } from '../../service/UseCategory';
import AddProduct from '../popup/AddProduct'; 

export interface Product {
  id?: string
  image: string
  price: number
  discountedPrice: number
  count?: number
  frame_uz?: string
  frame_ru?: string
  size?: string
  depth?: number
  categoryId?: string
  status?: string
  tools_ru?: string[]
  tools_uz?: string[]
}

interface Category {
  id: string;
  name_uz: string;
  name_ru: string;
}

interface ProductWrapperProps {
  type: 'framed' | 'inflatable'
}

const ProductWrapper: React.FC<ProductWrapperProps> = ({ type }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { getProducts, deleteProduct } = useProduct()
  const { data } = getProducts()
  const { mutate } = deleteProduct()
  const products: Product[] = data?.data || []

  const { getCategory } = useCategory()
  const { data: categoryData } = getCategory()
  const categories: Category[] = categoryData?.data || []

  const categoryName = type === 'framed' ? 'Ramka' : 'Puflanadigan'
  const selectedCategory = categories.find(cat => cat.name_uz === categoryName)
  const filteredProducts = selectedCategory
    ? products.filter(product => product.categoryId === selectedCategory.id)
    : []

  const handleDelete = (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    mutate(id, {
      onSuccess: () => toast.success("Product deleted successfully"),
      onError: () => toast.error("Failed to delete product"),
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <>
      <div>
        {filteredProducts.map((product: Product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            oldPrice={product.price}
            newPrice={product.discountedPrice}
            quantity={product.count || 0}
            frame={product.frame_uz || ''}
            size={product.size || ''}
            depth={product.depth || 0}
            onEdit={() => handleEdit(product)}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>

      <AddProduct
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        editProduct={editingProduct}
      />
    </>
  )
}

export default React.memo(ProductWrapper)