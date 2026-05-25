// FULL UPDATED CreateBlog.jsx

import { useState } from 'react'

import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'

import API from '../services/api'

function CreateBlog() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
    })

    const [image, setImage] = useState(null)

    const [preview, setPreview] = useState('')

    const [loading, setLoading] = useState(false)

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

            setPreview(
                URL.createObjectURL(file)
            )
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        setLoading(true)

        try {

            const token = localStorage.getItem('token')

            const data = new FormData()

            data.append(
                'title',
                formData.title
            )

            data.append(
                'content',
                formData.content
            )

            data.append(
                'category',
                formData.category
            )

            if (image) {

                data.append(
                    'image',
                    image
                )
            }

            const res = await API.post(
                '/blogs',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type':
                            'multipart/form-data',
                    },
                }
            )

            console.log(res.data)

            toast.success(
                'Blog Created Successfully'
            )

            setLoading(false)

            navigate('/myblogs')

        } catch (error) {

            console.log(error)

            toast.error(
                'Blog Creation Failed'
            )

            setLoading(false)
        }
    }

    return (

        <div className='min-h-screen flex justify-center items-center bg-gray-100 px-4 py-10'>

            <div className='w-full max-w-2xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-2xl rounded-3xl p-8 text-white'>

                <h1 className='text-4xl font-bold mb-8 text-center'>
                    Create Blog
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className='space-y-6'
                >

                    <input
                        type='text'
                        name='title'
                        placeholder='Enter Blog Title'
                        onChange={handleChange}
                        className='w-full bg-white text-black border border-gray-300 p-4 rounded-xl'
                    />

                    <select
                        name='category'
                        onChange={handleChange}
                        className='w-full bg-white text-black border border-gray-300 p-4 rounded-xl'
                    >

                        <option value=''>
                            Select Category
                        </option>

                        <option value='Technology'>
                            Technology
                        </option>

                        <option value='Programming'>
                            Programming
                        </option>

                        <option value='Education'>
                            Education
                        </option>

                        <option value='Entertainment'>
                            Entertainment
                        </option>

                        <option value='Sports'>
                            Sports
                        </option>

                    </select>

                    <textarea
                        name='content'
                        placeholder='Write your blog content here...'
                        onChange={handleChange}
                        rows='8'
                        className='w-full bg-white text-black border border-gray-300 p-4 rounded-xl resize-none'
                    />

                    <div>

                        <label className='block text-lg font-semibold mb-3'>
                            Upload Blog Image
                        </label>

                        <label className='flex items-center justify-between bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-300 cursor-pointer'>

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

                        </div>
                    )}

                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-xl w-full font-semibold text-lg'
                    >

                        {loading
                            ? 'Creating Blog...'
                            : 'Create Blog'}

                    </button>

                </form>

            </div>

        </div>
    )
}

export default CreateBlog