import {
    Link,
    useNavigate,
} from 'react-router-dom'

import {
    useEffect,
    useState,
} from 'react'

import { toast } from 'react-toastify'

function Navbar() {

    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    const user = JSON.parse(
        localStorage.getItem('user')
    )

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    )

    useEffect(() => {

        const html = document.documentElement

        if (darkMode) {

            html.classList.add('dark')

            localStorage.setItem('theme', 'dark')

        } else {

            html.classList.remove('dark')

            localStorage.setItem('theme', 'light')
        }

    }, [darkMode])

    const handleLogout = () => {

        localStorage.removeItem('token')

        localStorage.removeItem('user')

        toast.info('Logged Out Successfully')

        navigate('/login')
    }

    return (

        <nav className='bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-lg sticky top-0 z-50 transition duration-300'>

            <div className='max-w-7xl mx-auto px-6 py-5 flex justify-between items-center'>

                {/* LOGO */}

                <Link
                    to='/'
                    className='text-3xl font-extrabold text-black dark:text-white tracking-wide hover:text-blue-500 transition duration-300'
                >
                    MERN Blog
                </Link>

                {/* NAV LINKS */}

                <div className='flex items-center gap-4 md:gap-6 flex-wrap'>

                    <Link
                        to='/'
                        className='text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 font-semibold transition duration-300'
                    >
                        Home
                    </Link>

                    {token && (
                        <>

                            <Link
                                to='/create'
                                className='text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 font-semibold transition duration-300'
                            >
                                Create
                            </Link>

                            <Link
                                to='/myblogs'
                                className='text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 font-semibold transition duration-300'
                            >
                                My Blogs
                            </Link>

                            <div className='bg-gray-100 dark:bg-zinc-800 text-black dark:text-white px-4 py-2 rounded-2xl text-sm font-semibold border border-gray-300 dark:border-zinc-700'>
                                👤 {user?.name}
                            </div>

                        </>
                    )}

                    {/* DARK MODE BUTTON */}

                    <button
                        onClick={() =>
                            setDarkMode(!darkMode)
                        }
                        className='bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-2xl text-sm font-bold hover:scale-105 transition duration-300 shadow-lg'
                    >
                        {darkMode
                            ? '☀️ Light'
                            : '🌙 Dark'}
                    </button>

                    {!token ? (
                        <>

                            <Link
                                to='/login'
                                className='text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 font-semibold transition duration-300'
                            >
                                Login
                            </Link>

                            <Link
                                to='/register'
                                className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-2xl font-semibold transition duration-300 shadow-lg'
                            >
                                Register
                            </Link>

                        </>
                    ) : (

                        <button
                            onClick={handleLogout}
                            className='bg-red-500 hover:bg-red-600 transition duration-300 text-white px-5 py-2 rounded-2xl font-semibold shadow-lg'
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