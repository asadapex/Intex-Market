import React from 'react'
import { useRoutes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Products from './pages/products/Products'
import Orders from './pages/orders/Orders'
import ProductWrapper from './components/productWrapper/ProductWrapper'
import OrderWrapper from './components/productWrapper/OrderWrapper'
import ConsultWrapper from './components/productWrapper/ConsultWrapper'
import AdminLogin from './pages/Login'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Category from './pages/Category'
const App = () => {
  return useRoutes([
    {
      path: '/login',
      element: <AdminLogin />
    },
    {
    path: "/",
    element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
    children: [
      {
        path: "products",
        element: <Products/>,
        children: [
          {
            element: <ProductWrapper type="framed"/>,  
            index: true
          },
          {
            path: "framed",
            element: <ProductWrapper type="framed"/>,
          },
          {
            path: "inflatable",
            element: <ProductWrapper type="inflatable"/>,
          }
        ]
      },
      {
        path: "orders",
        element: <Orders/>,
        children: [
          {
            element: <OrderWrapper/>,
            index: true
          },
          {
            path: "allorders",
            element: <OrderWrapper/>,
          },
          {
            path: "consultations",
            element: <ConsultWrapper/>,
          }
        ]
      },
      {
        path: "categories",
        element: <Category/>
      },
      {
        path: "settings",
        element: <div>Settings</div>
      }
    ]
  }])
}

export default React.memo(App)
