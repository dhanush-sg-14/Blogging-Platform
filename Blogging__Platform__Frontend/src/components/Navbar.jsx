import {
    Link,
    useNavigate,
} from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    const handleLogout = () => {
        localStorage.removeItem('token')

        alert('Logged Out')

        navigate('/login')
    }

    return (
        <nav className='bg-black text-white p-4'>
            <div className='max-w-6xl mx-auto flex justify-between items-center'>

                <Link
                    to='/'
                    className='text-2xl font-bold'
                >
                    MERN Blog
                </Link>

                <div className='flex gap-4 items-center'>

                    <Link to='/'>
                        Home
                    </Link>

                    {token && (
                        <Link to='/create'>
                            Create
                        </Link>
                    )}

                    {!token ? (
                        <>
                            <Link to='/login'>
                                Login
                            </Link>

                            <Link to='/register'>
                                Register
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className='bg-red-500 px-4 py-2 rounded-lg'
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