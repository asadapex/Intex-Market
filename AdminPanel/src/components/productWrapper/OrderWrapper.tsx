import React from 'react'
import OrderCard from '../card/OrderCard'
import toast from 'react-hot-toast'
import { useOrder } from '../../service/UseOrder';
import type { OrderParams } from '../../service/UseOrder';
import { useParamsHook } from '../../shared/hooks/UseSearchParams';
interface Category {
  id: string;
  name_ru: string;
  name_uz: string;
}

interface Product {
  id: string;
  image: string;
  price: number;
  discountedPrice: number;
  frame_ru: string;
  frame_uz: string;
  size: string;
  depth: number;
  status: string;
  category: Category;
}

interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  productId: string;
  count: boolean;
  check: boolean;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

const OrderWrapper = () => {

  const {getParam} = useParamsHook()  

  const search = getParam("search") || ""

  const queryParams: OrderParams = {
  name: search,
  }

  const { getOrders, deleteOrder, updateOrder } = useOrder()
  const { data: orderData } = getOrders(queryParams)
  const { mutate: deleteOrderMutation } = deleteOrder()
  const { mutate: toggleCheck } = updateOrder()
  
  const orders: Order[] = orderData?.data || []

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
    return { time, date: formattedDate };
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price);
  }

  const handleToggleCheck = (order: Order) => {
  toggleCheck(
    { id: order.id, check: !order.check },
    {
      onSuccess: () => toast.success(`Order marked as ${!order.check ? 'completed' : 'not completed'}`),
      onError: () => toast.error('Failed to update order status'),
    }
  )
}


  const handleDelete = (orderId: string, customerName: string) => {
    if (window.confirm(`Are you sure you want to delete order for ${customerName}?`)) {
      deleteOrderMutation(orderId, {
        onSuccess: () => {
          toast.success('Order deleted successfully!');
        },
        onError: (error) => {
          toast.error('Failed to delete order');
          console.error('Delete error:', error);
        }
      });
    }
  }

  return (
    <div>
      {orders.map((order) => {
        const { time, date } = formatDateTime(order.createdAt);
        const displayPrice = order.product.discountedPrice > 0 
          ? formatPrice(order.product.discountedPrice)
          : formatPrice(order.product.price);

        return (
          <OrderCard
            key={order.id}
            name={order.name}
            phone={order.phone}
            image={`http://3.87.71.145/file/${order.product.image}`}
            size={order.product.size}
            price={displayPrice}
            address={order.address}
            time={time}
            date={date}
            check={order.check}
            onDelete={() => handleDelete(order.id, order.name)}
            onToggleCheck={() => handleToggleCheck(order)} 
          />
        );
      })}
    </div>
  )
}

export default React.memo(OrderWrapper)
