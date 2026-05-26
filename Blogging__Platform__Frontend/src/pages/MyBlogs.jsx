import {
    useEffect,
    useState,
} from 'react'

import {
    Link,
} from 'react-router-dom'

import { toast } from 'react-toastify'

import API from '../services/api'

function MyBlogs() {

    const [blogs, setBlogs] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMyBlogs()
    }, [])

    const fetchMyBlogs = async () => {

        try {

            const res = await API.get('/blogs')

            const token = localStorage.getItem('token')

            const payload = JSON.parse(
                atob(token.split('.')[1])
            )

            const userId = payload.id

            const filteredBlogs = res.data.filter(
                (blog) => blog.author?._id === userId
            )

            setBlogs(filteredBlogs)

            setLoading(false)

        } catch (error) {

            console.log(error)

            toast.error('Failed to Load Blogs')

            setLoading(false)
        }
    }

    const handleDelete = async (id) => {

        try {

            const token = localStorage.getItem('token')

            await API.delete(`/blogs/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            setBlogs(
                blogs.filter(
                    (blog) => blog._id !== id
                )
            )

            toast.success(
                'Blog Deleted Successfully'
            )

        } catch (error) {

            console.log(error)

            toast.error('Delete Failed')
        }
    }

    if (loading) {

        return (

            <div className='min-h-screen flex justify-center items-center bg-gray-100 dark:bg-zinc-950 transition duration-300'>

                <div className='w-16 h-16 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin'></div>

            </div>
        )
    }

    return (

        <div className='min-h-screen bg-gray-100 dark:bg-zinc-950 px-6 py-10 transition duration-300'>

            <div className='max-w-7xl mx-auto'>

                <h1 className='text-5xl font-bold mb-10 text-center text-black dark:text-white'>
                    My Blogs
                </h1>

                {blogs.length === 0 ? (

                    <div className='text-center text-2xl font-semibold text-gray-600 dark:text-gray-400'>
                        No Blogs Created Yet
                    </div>

                ) : (

                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>

                        {blogs.map((blog) => (

                            <div
                                key={blog._id}
                                className='bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-black dark:text-white shadow-2xl rounded-3xl p-6 transition duration-300 hover:scale-105'
                            >

                                <div className='mb-5'>

                                    <span className='bg-black dark:bg-zinc-700 text-white px-4 py-2 rounded-xl text-sm font-semibold'>
                                        📂 {blog.category || 'General'}
                                    </span>

                                </div>

                                <h2 className='text-3xl font-bold mb-4'>
                                    {blog.title}
                                </h2>

                                <p className='mb-6 leading-7 text-gray-700 dark:text-gray-300'>
                                    {blog.content.substring(0, 120)}...
                                </p>

                                <div className='border-t border-gray-300 dark:border-zinc-700 pt-4 mb-5 text-sm text-gray-600 dark:text-gray-400 space-y-1'>

                                    <p>
                                        📅 Posted:{' '}
                                        {new Date(
                                            blog.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                    <p>
                                        🔄 Updated:{' '}
                                        {new Date(
                                            blog.updatedAt
                                        ).toLocaleDateString()}
                                    </p>

                                </div>

                                <div className='flex gap-4'>

                                    <Link
                                        to={`/edit/${blog._id}`}
                                        className='bg-black dark:bg-zinc-700 hover:bg-gray-900 dark:hover:bg-zinc-600 transition duration-300 text-white px-5 py-2 rounded-xl font-semibold'
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() =>
                                            handleDelete(blog._id)
                                        }
                                        className='bg-red-500 hover:bg-red-600 transition duration-300 text-white px-5 py-2 rounded-xl font-semibold'
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    )
}

export default MyBlogs
