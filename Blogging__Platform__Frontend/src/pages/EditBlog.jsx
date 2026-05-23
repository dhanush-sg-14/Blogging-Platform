import { useEffect, useState } from 'react'

import {
    useNavigate,
    useParams,
} from 'react-router-dom'

import API from '../services/api'

function EditBlog() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    })

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

            alert('Blog Updated')

            navigate(`/blog/${id}`)
        } catch (error) {
            console.log(error)

            alert('Update Failed')
        }
    }

    return (
        <div className='max-w-3xl mx-auto p-6'>

            <div className='bg-white shadow-xl rounded-2xl p-8'>

                <h1 className='text-4xl font-bold mb-6'>
                    Edit Blog
                </h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type='text'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        placeholder='Enter Title'
                        className='w-full border p-3 rounded-lg mb-4'
                    />

                    <textarea
                        name='content'
                        value={formData.content}
                        onChange={handleChange}
                        placeholder='Enter Content'
                        rows='10'
                        className='w-full border p-3 rounded-lg mb-4'
                    />

                    <button
                        type='submit'
                        className='bg-blue-600 text-white px-6 py-3 rounded-lg'
                    >
                        Update Blog
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditBlog