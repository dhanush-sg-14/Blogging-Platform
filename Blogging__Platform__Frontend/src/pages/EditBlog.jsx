import { useEffect, useState } from 'react'

import {
    useNavigate,
    useParams,
} from 'react-router-dom'

import { toast } from 'react-toastify'

import API from '../services/api'

function EditBlog() {

    const [formData, setFormData] = useState({
        title: '',
        content: '',
    })

    const [loading, setLoading] = useState(false)

    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        fetchBlog()
    }, [])

    const fetchBlog = async () => {

        try {

            const res = await API.get(`/blogs/${id}`)

            setFormData({
                title: res.data.title,
                content: res.data.content,
            })

        } catch (error) {

            console.log(error)

            toast.error('Failed to Load Blog')
        }
    }

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        setLoading(true)

        try {

            const token = localStorage.getItem('token')

            await API.put(
                `/blogs/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            toast.success('Blog Updated Successfully')

            setLoading(false)

            navigate(`/blog/${id}`)

        } catch (error) {

            console.log(error)

            toast.error('Update Failed')

            setLoading(false)
        }
    }

    return (

        <div className='min-h-screen flex justify-center items-center bg-gray-100 px-4'>

            <div className='w-full max-w-2xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-2xl rounded-3xl p-8 text-white'>

                <h1 className='text-4xl font-bold mb-8 text-center'>
                    Edit Blog
                </h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type='text'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        placeholder='Enter Blog Title'
                        className='w-full bg-white text-black border border-gray-300 p-4 rounded-xl mb-5 focus:outline-none focus:ring-4 focus:ring-blue-200'
                    />

                    <textarea
                        name='content'
                        value={formData.content}
                        onChange={handleChange}
                        placeholder='Enter Blog Content'
                        rows='10'
                        className='w-full bg-white text-black border border-gray-300 p-4 rounded-xl mb-6 focus:outline-none focus:ring-4 focus:ring-blue-200 resize-none'
                    />

                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-black hover:bg-gray-900 transition duration-300 text-white px-6 py-3 rounded-xl w-full font-semibold'
                    >
                        {loading ? 'Updating Blog...' : 'Update Blog'}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default EditBlog