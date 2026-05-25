import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'

import API from '../services/api'

function Login() {

    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(() => {

        // IF USER ALREADY LOGGED IN

        if (token) {
            navigate('/')
        }

        // CLEAR AUTO FILLED VALUES

        setFormData({
            email: '',
            password: '',
        })

    }, [])

    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = useState({
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
                '/auth/login',
                formData
            )

            localStorage.setItem(
                'token',
                res.data.token
            )

            localStorage.setItem(
                'user',
                JSON.stringify(res.data.user)
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

                <form
                    onSubmit={handleSubmit}
                    autoComplete='off'
                >

                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        placeholder='Enter Email'
                        onChange={handleChange}
                        autoComplete='new-email'
                        className='w-full bg-white text-black border border-gray-300 p-4 rounded-xl mb-4 focus:outline-none focus:ring-4 focus:ring-blue-200'
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
                            className='w-full bg-white text-black border border-gray-300 p-4 rounded-xl pr-14 focus:outline-none focus:ring-4 focus:ring-blue-200'
                        />

                        <button
                            type='button'
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            className='absolute right-4 top-1/2 -translate-y-1/2 text-black text-xl'
                        >
                            {showPassword ? (

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                    <line x1="2" y1="2" x2="22" y2="22" />
                                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                </svg>

                            ) : (

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>

                            )}
                        </button>

                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-black hover:bg-gray-900 transition duration-300 text-white px-6 py-3 rounded-xl w-full font-semibold'
                    >
                        {loading
                            ? 'Logging in...'
                            : 'Login'}
                    </button>

                </form>

            </div>
        </div>
    )
}

export default Login