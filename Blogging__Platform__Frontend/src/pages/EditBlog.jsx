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

    const [image, setImage] = useState(null)

    const [preview, setPreview] = useState('')

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

            if (res.data.image) {

                setPreview(
                    `http://localhost:5000${res.data.image}`
                )
            }

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

    const handleImageChange = (e) => {

        const file = e.target.files[0]

        if (file) {

            setImage(file)

            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        setLoading(true)

        try {

            const token = localStorage.getItem('token')

            const updatedData = new FormData()

            updatedData.append(
                'title',
                formData.title
            )

            updatedData.append(
                'content',
                formData.content
            )

            if (image) {

                updatedData.append(
                    'image',
                    image
                )
            }

            await API.put(
                `/blogs/${id}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type':
                            'multipart/form-data',
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

        <div className='min-h-screen flex justify-center items-center bg-gray-100 px-4 py-10'>

            <div className='w-full max-w-3xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-2xl rounded-3xl p-8 text-white'>

                <h1 className='text-4xl font-bold mb-8 text-center'>
                    Edit Blog
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className='space-y-6'
                >

                    <input
                        type='text'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        placeholder='Enter Blog Title'
                        className='w-full bg-white text-black border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200'
                    />

                    <textarea
                        name='content'
                        value={formData.content}
                        onChange={handleChange}
                        placeholder='Enter Blog Content'
                        rows='10'
                        className='w-full bg-white text-black border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 resize-none'
                    />

                    <div>

                        <label className='block mb-4 text-lg font-semibold'>
                            Change Blog Image
                        </label>

                        <label className='flex items-center justify-between bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-300 cursor-pointer hover:scale-[1.01] transition duration-300'>

                            <div className='bg-black text-white px-6 py-4 font-semibold'>
                                Choose File
                            </div>

                            <div className='flex-1 px-5 py-4 text-gray-700 truncate'>

                                {image
                                    ? image.name
                                    : 'No file selected'}

                            </div>

                            <input
                                type='file'
                                accept='image/*'
                                onChange={handleImageChange}
                                className='hidden'
                            />

                        </label>

                    </div>

                    {preview && (

                        <div className='bg-white rounded-3xl p-4 shadow-2xl'>

                            <img
                                src={preview}
                                alt='Preview'
                                className='w-full h-[350px] object-contain rounded-2xl bg-gray-100'
                            />

                            <p className='text-center text-gray-500 mt-3'>
                                Image Preview
                            </p>

                        </div>
                    )}

                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-black hover:bg-gray-900 transition duration-300 text-white px-6 py-4 rounded-xl w-full font-semibold text-lg'
                    >
                        {loading
                            ? 'Updating Blog...'
                            : 'Update Blog'}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default EditBlog