import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../service/UseAuth'

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { login } = useAuth()
  const { mutate, isError } = login()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({ username, password }, {
      onSuccess: (res) => {
        localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('admin', username)
        navigate('/products')
      }
    })
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-[400px] flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-center">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-3 rounded-md"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded-md"
          required
        />

        {isError && <p className="text-red-500 text-sm">{"Invalid username or password"}</p>}

        <button type="submit" className="bg-black text-white p-3 rounded-md cursor-pointer">
          Login
        </button>
      </form>
    </div>
  )
}

export default React.memo(AdminLogin)
