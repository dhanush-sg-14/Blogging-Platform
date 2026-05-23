import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../services/api'

function Home() {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        try {
            const res = await API.get('/blogs')

            setBlogs(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='max-w-6xl mx-auto p-6'>

            <h1 className='text-4xl font-bold mb-8 text-center'>
                Latest Blogs
            </h1>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>

                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className='bg-white shadow-lg rounded-xl p-5 hover:scale-105 transition duration-300'
                    >
                        <Link to={`/blog/${blog._id}`}>
                            <h2 className='text-2xl font-bold mb-3 text-blue-600'>
                                {blog.title}
                            </h2>
                        </Link>

                        <p className='text-gray-700 mb-4'>
                            {blog.content.substring(0, 100)}...
                        </p>

                        <small className='text-gray-500'>
                            Author: {blog.author?.name}
                        </small>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home