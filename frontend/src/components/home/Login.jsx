import React, { useState } from 'react'
import { login } from '../../api/services/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('userName', userName)
        formData.append('password', password)
        login(formData, navigate)
        setUserName('')
        setPassword('')
    }

    return (
        <div className="min-h-[80vh] flex flex-col">
            <p className="bg-yellow-300 p-2">Login Page</p>
            <div className="flex flex-1 items-center justify-center">
                <form onSubmit={handleSubmit} className="space-y-5 mb-12 w-full max-w-lg px-4">
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                            <label htmlFor="userName" className="w-24">User Name</label>
                            <input
                                id="userName"
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="flex-1 border border-black p-2"
                            />
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="password" className="w-24">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="flex-1 border border-black p-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-400 px-5 py-2 text-start ml-24"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
