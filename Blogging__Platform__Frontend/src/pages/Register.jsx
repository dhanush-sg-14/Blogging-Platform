import { useState } from 'react'

import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'

import API from '../services/api'

function Register() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [loading, setLoading] = useState(false)

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
                '/auth/register',
                formData
            )

            console.log(res.data)

            toast.success('Registration Successful')

            setLoading(false)

            navigate('/login')

        } catch (error) {

            console.log(error)

            toast.error('Registration Failed')

            setLoading(false)
        }
    }

    return (

        <div className='max-w-md mx-auto mt-20 bg-gradient-to-br from-blue-600 to-blue-400 shadow-2xl rounded-3xl p-8 text-white'>

            <h1 className='text-4xl font-bold mb-8 text-center'>
                Register
            </h1>

            <form onSubmit={handleSubmit}>

                <input
                    type='text'
                    name='name'
                    placeholder='Enter Name'
                    onChange={handleChange}
                    className='w-full bg-white text-black border border-gray-300 p-4 rounded-xl mb-4 focus:outline-none focus:ring-4 focus:ring-blue-200'
                />

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
                    {loading ? 'Registering...' : 'Register'}
                </button>

            </form>
        </div>
    )
}

export default Register