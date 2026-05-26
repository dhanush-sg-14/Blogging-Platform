import { useEffect, useState } from 'react'

import {
    useNavigate,
    useParams,
} from 'react-router-dom'

import { toast } from 'react-toastify'

import API from '../services/api'

function BlogDetails() {

    const [blog, setBlog] = useState(null)

    const [isOwner, setIsOwner] = useState(false)

    const [showImage, setShowImage] = useState(false)

    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        fetchBlog()
    }, [])

    const fetchBlog = async () => {

        try {

            const res = await API.get(`/blogs/${id}`)

            setBlog(res.data)

            const token = localStorage.getItem('token')

            if (token) {

                const payload = JSON.parse(
                    atob(token.split('.')[1])
                )

                if (
                    payload.id ===
                    res.data.author?._id
                ) {
                    setIsOwner(true)
                }
            }

        } catch (error) {

            console.log(error)

            toast.error('Failed to Load Blog')
        }
    }

    const handleDelete = async () => {

        try {

            const token = localStorage.getItem('token')

            await API.delete(`/blogs/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            toast.success(
                'Blog Deleted Successfully'
            )

            navigate('/')

        } catch (error) {

            console.log(error)

            toast.error('Delete Failed')
        }
    }

    if (!blog) {

        return (

            <div className='min-h-screen flex justify-center items-center bg-gray-100 dark:bg-zinc-950 transition duration-300'>

                <div className='w-16 h-16 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin'></div>

            </div>
        )
    }

    return (

        <div className='min-h-screen bg-gray-100 dark:bg-zinc-950 py-12 transition duration-300'>

            <div className='max-w-5xl mx-auto px-6'>

                {/* TITLE */}

                <div className='text-center mb-10'>

                    <h1 className='text-5xl md:text-6xl font-extrabold text-black dark:text-white leading-tight mb-5'>
                        {blog.title}
                    </h1>

                    <div className='flex justify-center gap-4 flex-wrap mb-6'>

                        <span className='bg-black dark:bg-zinc-700 text-white px-5 py-2 rounded-2xl text-sm font-semibold shadow-lg'>
                            {blog.category || 'General'}
                        </span>

                    </div>

                </div>

                {/* AUTHOR + DATES */}

                <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-6 border-b border-gray-300 dark:border-zinc-700 pb-8 mb-10'>

                    <div>

                        <p className='text-gray-500 dark:text-gray-400 text-sm mb-1'>
                            Written By
                        </p>

                        <h3 className='text-2xl font-bold text-black dark:text-white'>
                            {blog.author?.name}
                        </h3>

                    </div>

                    <div className='text-gray-600 dark:text-gray-400 text-sm space-y-2'>

                        <p>
                            📅 Created :
                            {' '}
                            {new Date(
                                blog.createdAt
                            ).toLocaleString()}
                        </p>

                        <p>
                            🔄 Last Updated :
                            {' '}
                            {new Date(
                                blog.updatedAt
                            ).toLocaleString()}
                        </p>

                    </div>

                    {isOwner && (

                        <div className='flex gap-4'>

                            <button
                                onClick={() =>
                                    navigate(`/edit/${blog._id}`)
                                }
                                className='bg-black dark:bg-zinc-700 hover:bg-gray-900 dark:hover:bg-zinc-600 transition duration-300 text-white px-6 py-3 rounded-2xl font-semibold'
                            >
                                Edit
                            </button>

                            <button
                                onClick={handleDelete}
                                className='bg-red-500 hover:bg-red-600 transition duration-300 text-white px-6 py-3 rounded-2xl font-semibold'
                            >
                                Delete
                            </button>

                        </div>
                    )}

                </div>

                {/* IMAGE */}

                {blog.image && (

                    <div className='mb-10'>

                        <img
                            src={`http://localhost:5000${blog.image}`}
                            alt={blog.title}
                            onClick={() => setShowImage(true)}
                            className='w-full max-h-[500px] object-cover rounded-3xl shadow-2xl cursor-pointer'
                        />

                        <p className='text-center text-gray-500 dark:text-gray-400 mt-3 text-sm'>
                            Click image to enlarge
                        </p>

                    </div>
                )}

                {/* CONTENT */}

                <div className='text-gray-800 dark:text-gray-200 text-[22px] leading-[52px] whitespace-pre-line font-medium transition duration-300'>

                    {blog.content}

                </div>

            </div>

            {/* FULL IMAGE VIEW */}

            {showImage && (

                <div
                    onClick={() => setShowImage(false)}
                    className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6'
                >

                    <button
                        onClick={() => setShowImage(false)}
                        className='absolute top-6 right-6 bg-white text-black px-5 py-2 rounded-xl font-bold hover:bg-gray-200'
                    >
                        ✕ Close
                    </button>

                    <img
                        src={`http://localhost:5000${blog.image}`}
                        alt={blog.title}
                        className='max-w-[95%] max-h-[95%] object-contain rounded-3xl shadow-2xl'
                    />

                </div>
            )}

        </div>
    )
}

export default BlogDetails