import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'

const LogoutButton: React.FC = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    if(confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('admin')
      navigate('/login')
    }
  }

  return (
    <button onClick={handleLogout} className='text-[20px] text-[#009398] cursor-pointer'>
      <LogoutOutlined />
    </button>
  )
}

export default LogoutButton
