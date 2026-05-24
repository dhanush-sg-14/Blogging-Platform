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
                blogs.filter((blog) => blog._id !== id)
            )

            toast.success('Blog Deleted Successfully')

        } catch (error) {

            console.log(error)

            toast.error('Delete Failed')
        }
    }

    if (loading) {
        return (
            <div className='min-h-screen flex justify-center items-center text-3xl font-bold'>
                Loading...
            </div>
        )
    }

    return (

        <div className='min-h-screen bg-gray-100 px-6 py-10'>

            <div className='max-w-7xl mx-auto'>

                <h1 className='text-5xl font-bold mb-10 text-center text-black'>
                    My Blogs
                </h1>

                {blogs.length === 0 ? (

                    <div className='text-center text-2xl font-semibold text-gray-600'>
                        No Blogs Created Yet
                    </div>

                ) : (

                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>

                        {blogs.map((blog) => (

                            <div
                                key={blog._id}
                                className='bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-2xl rounded-3xl p-6 hover:scale-105 transition duration-300'
                            >

                                <h2 className='text-3xl font-bold mb-4'>
                                    {blog.title}
                                </h2>

                                <p className='mb-6 leading-7'>
                                    {blog.content.substring(0, 120)}...
                                </p>

                                <div className='flex gap-4'>

                                    <Link
                                        to={`/edit/${blog._id}`}
                                        className='bg-black hover:bg-gray-900 transition duration-300 text-white px-5 py-2 rounded-xl font-semibold'
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