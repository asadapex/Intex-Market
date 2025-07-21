import React from 'react'
import { useRoutes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Framed from './pages/products/Framed'

const App = () => {
  return useRoutes([{
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: "products",
        element: <Framed/>,
        children: [
          {
            path: "framed",
            element: <div>Framed</div>
          },
          {
            path: "inflatable",
            element: <div>Inflatable</div>
          }
        ]
      },
      {
        path: "orders",
        element: <div>Orders</div>,
        children: [
          {
            path: "orders",
            element: <div>Orders</div>
          },
          {
            path: "consultations",
            element: <div>Consultations</div>
          }
        ]
      },
      {
        path: "categories",
        element: <div>Categories</div>
      },
      {
        path: "settings",
        element: <div>Settings</div>
      }
    ]
  }])
}

export default React.memo(App)