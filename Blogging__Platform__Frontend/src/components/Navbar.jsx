import {
    Link,
    useNavigate,
} from 'react-router-dom'

import { toast } from 'react-toastify'

function Navbar() {
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    const handleLogout = () => {
        localStorage.removeItem('token')

        toast.info('Logged Out Successfully')

        navigate('/login')
    }

    return (
        <nav className='bg-black text-white py-5 shadow-xl w-full'>

            <div className='w-full px-12 flex justify-between items-center'>

                <Link
                    to='/'
                    className='text-3xl font-bold tracking-wide hover:text-blue-400 transition duration-300'
                >
                    MERN Blog
                </Link>

                <div className='flex gap-8 items-center text-lg font-medium'>

                    <Link
                        to='/'
                        className='hover:text-blue-400 transition duration-300'
                    >
                        Home
                    </Link>

                    {token && (
                        <>
                            <Link
                                to='/create'
                                className='hover:text-blue-400 transition duration-300'
                            >
                                Create
                            </Link>

                            <Link
                                to='/myblogs'
                                className='hover:text-blue-400 transition duration-300'
                            >
                                My Blogs
                            </Link>
                        </>
                    )}

                    {!token ? (
                        <>
                            <Link
                                to='/login'
                                className='hover:text-blue-400 transition duration-300'
                            >
                                Login
                            </Link>

                            <Link
                                to='/register'
                                className='hover:text-blue-400 transition duration-300'
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className='bg-red-500 hover:bg-red-600 transition duration-300 px-5 py-2 rounded-xl font-semibold'
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar