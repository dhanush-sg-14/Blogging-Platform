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

            toast.success('Blog Deleted Successfully')

            navigate('/')

        } catch (error) {

            console.log(error)

            toast.error('Delete Failed')
        }
    }

    const createdDate = new Date(
        blog?.createdAt
    ).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    const updatedDate = new Date(
        blog?.updatedAt
    ).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    const isEdited =
        blog?.createdAt !== blog?.updatedAt

    if (!blog) {

        return (
            <div className='min-h-screen flex justify-center items-center text-3xl font-bold bg-gray-100'>
                Loading...
            </div>
        )
    }

    return (

        <div className='min-h-screen bg-gray-100 py-12'>

            <div className='max-w-7xl mx-auto px-6'>

                <div className='grid lg:grid-cols-2 gap-14 items-start'>

                    {/* LEFT CONTENT */}

                    <div>

                        <div className='mb-8'>

                            <h1 className='text-5xl md:text-6xl font-extrabold text-black leading-tight mb-5'>
                                {blog.title}
                            </h1>

                            <div className='flex items-center gap-4 flex-wrap'>

                                <span className='bg-black text-white px-5 py-2 rounded-2xl text-sm font-semibold shadow-lg'>
                                    {blog.category}
                                </span>

                                <span className='bg-blue-100 text-blue-700 px-5 py-2 rounded-2xl text-sm font-semibold'>
                                    ⏱️ {blog.readingTime}
                                </span>

                            </div>

                        </div>

                        {/* AUTHOR + DATE */}

                        <div className='bg-white shadow-lg rounded-3xl p-6 mb-10 border border-gray-200'>

                            <div className='flex justify-between items-center flex-wrap gap-5 border-b border-gray-300 pb-6 mb-10'>

                                <div>

                                    <p className='text-gray-500 text-sm mb-1'>
                                        Written By
                                    </p>

                                    <h3 className='text-2xl font-bold text-gray-800'>
                                        {blog.author?.name}
                                    </h3>

                                    {/* DATE SECTION */}

                                    <p className='text-gray-500 mt-3 text-sm'>

                                        Created :
                                        {' '}
                                        {new Date(
                                            blog.createdAt
                                        ).toLocaleString()}

                                    </p>

                                    <p className='text-gray-500 text-sm mt-1'>

                                        Last Updated :
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
                                )}

                            </div>

                        </div>

                        {/* BLOG CONTENT */}

                        <div className='bg-white rounded-3xl shadow-xl p-8 text-gray-800 text-xl leading-[45px] whitespace-pre-line font-medium border border-gray-200'>

                            {blog.content}

                        </div>

                    </div>

                    {/* RIGHT IMAGE */}

                    {blog.image && (

                        <>

                            <div>

                                <div className='bg-white rounded-3xl shadow-2xl p-4 border border-gray-200'>

                                    <img
                                        src={`http://localhost:5000${blog.image}`}
                                        alt={blog.title}
                                        onClick={() => setShowImage(true)}
                                        className='w-full max-h-[350px] object-contain rounded-2xl cursor-pointer hover:scale-105 transition duration-300'
                                    />

                                    <p className='text-center text-gray-500 mt-3 text-sm'>
                                        Click image to enlarge
                                    </p>

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

                        </>
                    )}

                </div>

            </div>

        </div>
    )
}

export default BlogDetails