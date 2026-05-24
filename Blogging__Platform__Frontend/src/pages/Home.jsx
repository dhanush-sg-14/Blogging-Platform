import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import API from '../services/api'

function Home() {

    const [blogs, setBlogs] = useState([])

    const [search, setSearch] = useState('')

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {

        try {

            const res = await API.get('/blogs')

            setBlogs(res.data)

            setLoading(false)

        } catch (error) {

            console.log(error)

            setLoading(false)
        }
    }

    const filteredBlogs = blogs.filter((blog) =>
        blog.title
            .toLowerCase()
            .includes(search.toLowerCase())
    )

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
                    Latest Blogs
                </h1>

                <div className='mb-12 flex justify-center'>

                    <input
                        type='text'
                        placeholder='Search blogs...'
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className='w-full max-w-2xl bg-white border border-gray-300 p-4 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg'
                    />
                </div>

                {filteredBlogs.length === 0 ? (

                    <div className='text-center text-2xl font-semibold text-gray-600'>
                        No Blogs Found
                    </div>

                ) : (

                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>

                        {filteredBlogs.map((blog) => (

                            <Link
                                to={`/blog/${blog._id}`}
                                key={blog._id}
                            >

                                <div className='bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-2xl rounded-3xl p-6 hover:scale-105 transition duration-300 cursor-pointer h-full'>

                                    <h2 className='text-3xl font-bold mb-4'>
                                        {blog.title}
                                    </h2>

                                    <p className='leading-7 mb-6'>
                                        {blog.content.substring(0, 120)}...
                                    </p>

                                    <div className='flex justify-between items-center'>

                                        <small className='text-sm font-medium'>
                                            Author: {blog.author?.name}
                                        </small>

                                        <span className='bg-black px-4 py-2 rounded-xl text-sm font-semibold'>
                                            Read More
                                        </span>

                                    </div>
                                </div>

                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home