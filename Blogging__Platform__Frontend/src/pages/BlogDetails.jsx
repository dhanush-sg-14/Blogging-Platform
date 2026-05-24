import { useEffect, useState } from 'react'

import {
    useNavigate,
    useParams,
} from 'react-router-dom'

import { toast } from 'react-toastify'

import API from '../services/api'

function BlogDetails() {

    const [blog, setBlog] = useState(null)

    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        fetchBlog()
    }, [])

    const fetchBlog = async () => {

        try {

            const res = await API.get(`/blogs/${id}`)

            setBlog(res.data)

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

            toast.success('Blog Deleted Successfully')

            navigate('/')

        } catch (error) {

            console.log(error)

            toast.error('Delete Failed')
        }
    }

    if (!blog) {

        return (
            <div className='min-h-screen flex justify-center items-center text-3xl font-bold bg-gray-100'>
                Loading...
            </div>
        )
    }

    return (

        <div className='min-h-screen bg-gray-100 pb-20'>

            {/* HERO IMAGE */}

            {blog.image && (

                <div className='w-full h-[350px] md:h-[500px] overflow-hidden'>

                    <img
                        src={`http://localhost:5000/${blog.image}`}
                        alt={blog.title}
                        className='w-full h-full object-cover'
                    />

                </div>
            )}

            {/* BLOG CONTENT */}

            <div className='max-w-5xl mx-auto px-6 md:px-10 py-12'>

                <h1 className='text-4xl md:text-6xl font-extrabold text-black leading-tight mb-8'>
                    {blog.title}
                </h1>

                <div className='flex justify-between items-center flex-wrap gap-5 border-b border-gray-300 pb-6 mb-10'>

                    <div>

                        <p className='text-gray-500 text-sm mb-1'>
                            Written By
                        </p>

                        <h3 className='text-2xl font-bold text-gray-800'>
                            {blog.author?.name}
                        </h3>

                    </div>

                    <div className='flex gap-4'>

                        <button
                            onClick={() =>
                                navigate(`/edit/${blog._id}`)
                            }
                            className='bg-black hover:bg-gray-900 transition duration-300 text-white px-6 py-3 rounded-2xl font-semibold'
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
                </div>

                <div className='text-gray-800 text-xl leading-[45px] whitespace-pre-line font-medium'>

                    {blog.content}

                </div>

            </div>
        </div>
    )
}

export default BlogDetails