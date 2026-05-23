import { useEffect, useState } from 'react'

import {
    useNavigate,
    useParams,
} from 'react-router-dom'
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

            alert('Blog Deleted')

            navigate('/')
        } catch (error) {
            console.log(error)

            alert('Delete Failed')
        }
    }

    if (!blog) {
        return <h2>Loading...</h2>
    }

    return (
        <div className='max-w-4xl mx-auto p-6'>

            <div className='bg-white shadow-xl rounded-2xl p-8'>

                <h1 className='text-5xl font-bold mb-6 text-blue-600'>
                    {blog.title}
                </h1>

                <div className='mb-6 text-gray-500'>
                    Author: {blog.author?.name}
                </div>

                <div className='flex gap-4 mb-6'>

                    <button
                        onClick={() =>
                            navigate(`/edit/${blog._id}`)
                        }
                        className='bg-blue-500 text-white px-4 py-2 rounded-lg'
                    >
                        Edit
                    </button>

                    <button
                        onClick={handleDelete}
                        className='bg-red-500 text-white px-4 py-2 rounded-lg'
                    >
                        Delete
                    </button>
                </div>

                <p className='text-lg leading-8 text-gray-700 whitespace-pre-line'>
                    {blog.content}
                </p>
            </div>
        </div>
    )
}

export default BlogDetails