import { useState } from 'react'

import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'

import API from '../services/api'

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        setLoading(true)

        try {

            const res = await API.post(
                '/auth/login',
                formData
            )

            localStorage.setItem(
                'token',
                res.data.token
            )

            toast.success('Login Successful')

            setLoading(false)

            navigate('/')

        } catch (error) {

            console.log(error)

            toast.error('Invalid Credentials')

            setLoading(false)
        }
    }

    return (

        <div className='min-h-screen flex justify-center items-center bg-gray-100 px-4'>

            <div className='w-full max-w-md bg-gradient-to-br from-blue-600 to-blue-400 shadow-2xl rounded-3xl p-8 text-white'>

                <h1 className='text-4xl font-bold mb-8 text-center'>
                    Login
                </h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type='email'
                        name='email'
                        placeholder='Enter Email'
                        onChange={handleChange}
                        className='w-full bg-white text-black border border-gray-300 p-4 rounded-xl mb-4 focus:outline-none focus:ring-4 focus:ring-blue-200'
                    />

                    <input
                        type='password'
                        name='password'
                        placeholder='Enter Password'
                        onChange={handleChange}
                        className='w-full bg-white text-black border border-gray-300 p-4 rounded-xl mb-6 focus:outline-none focus:ring-4 focus:ring-blue-200'
                    />

                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-black hover:bg-gray-900 transition duration-300 text-white px-6 py-3 rounded-xl w-full font-semibold'
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Login