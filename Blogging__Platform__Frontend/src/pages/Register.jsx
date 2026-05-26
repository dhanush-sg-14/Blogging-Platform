import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'

import API from '../services/api'

function Register() {

    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(() => {

        if (token) {
            navigate('/')
        }

        setFormData({
            name: '',
            email: '',
            password: '',
        })

    }, [])

    const [showPassword, setShowPassword] = useState(false)

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

            await API.post(
                '/auth/register',
                formData
            )

            toast.success(
                'Registration Successful'
            )

            setLoading(false)

            navigate('/login')

        } catch (error) {

            console.log(error)

            toast.error(
                'Registration Failed'
            )

            setLoading(false)
        }
    }

    return (

        <div className='min-h-screen flex justify-center items-center bg-gray-100 dark:bg-zinc-950 px-4 transition duration-300'>

            <div className='w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-2xl rounded-3xl p-8 transition duration-300'>

                <h1 className='text-4xl font-bold mb-8 text-center text-black dark:text-white'>
                    Register
                </h1>

                <form
                    onSubmit={handleSubmit}
                    autoComplete='off'
                >

                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        placeholder='Enter Name'
                        onChange={handleChange}
                        autoComplete='off'
                        className='w-full bg-gray-100 dark:bg-zinc-800 text-black dark:text-white border border-gray-300 dark:border-zinc-700 p-4 rounded-xl mb-4 focus:outline-none'
                    />

                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        placeholder='Enter Email'
                        onChange={handleChange}
                        autoComplete='new-email'
                        className='w-full bg-gray-100 dark:bg-zinc-800 text-black dark:text-white border border-gray-300 dark:border-zinc-700 p-4 rounded-xl mb-4 focus:outline-none'
                    />

                    <div className='relative mb-6'>

                        <input
                            type={
                                showPassword
                                    ? 'text'
                                    : 'password'
                            }
                            name='password'
                            value={formData.password}
                            placeholder='Enter Password'
                            onChange={handleChange}
                            autoComplete='new-password'
                            className='w-full bg-gray-100 dark:bg-zinc-800 text-black dark:text-white border border-gray-300 dark:border-zinc-700 p-4 rounded-xl pr-14 focus:outline-none'
                        />

                        <button
                            type='button'
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            className='absolute right-4 top-1/2 -translate-y-1/2 text-black dark:text-white text-xl'
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>

                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-black dark:bg-zinc-700 hover:bg-gray-900 dark:hover:bg-zinc-600 transition duration-300 text-white px-6 py-3 rounded-xl w-full font-semibold'
                    >
                        {loading
                            ? 'Registering...'
                            : 'Register'}
                    </button>

                </form>

            </div>

        </div>
    )
}

export default Register
