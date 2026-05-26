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
                formData.category || 'General'
            )

            if (image) {

                data.append(
                    'image',
                    image
                )
            }

            await API.post(
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

        <div className='min-h-screen flex justify-center items-center bg-gray-100 dark:bg-zinc-950 px-4 py-10 transition duration-300'>

            <div className='w-full max-w-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-2xl rounded-3xl p-8 transition duration-300'>

                <h1 className='text-4xl font-bold mb-8 text-center text-black dark:text-white'>
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
                        className='w-full bg-gray-100 dark:bg-zinc-800 text-black dark:text-white border border-gray-300 dark:border-zinc-700 p-4 rounded-xl focus:outline-none'
                    />

                    <select
                        name='category'
                        onChange={handleChange}
                        className='w-full bg-gray-100 dark:bg-zinc-800 text-black dark:text-white border border-gray-300 dark:border-zinc-700 p-4 rounded-xl focus:outline-none'
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

                        <option value='General'>
                            General
                        </option>

                    </select>

                    <textarea
                        name='content'
                        placeholder='Write your blog content here...'
                        onChange={handleChange}
                        rows='8'
                        className='w-full bg-gray-100 dark:bg-zinc-800 text-black dark:text-white border border-gray-300 dark:border-zinc-700 p-4 rounded-xl resize-none focus:outline-none'
                    />

                    <div>

                        <label className='block text-lg font-semibold mb-3 text-black dark:text-white'>
                            Upload Blog Image
                        </label>

                        <label className='flex items-center justify-between bg-gray-100 dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-lg border border-gray-300 dark:border-zinc-700 cursor-pointer'>

                            <div className='bg-black dark:bg-zinc-700 text-white px-6 py-4 font-semibold'>
                                Choose File
                            </div>

                            <div className='flex-1 px-5 py-4 text-gray-700 dark:text-gray-300 truncate'>

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

                        <div className='bg-gray-100 dark:bg-zinc-800 rounded-3xl p-4 shadow-2xl transition duration-300'>

                            <img
                                src={preview}
                                alt='Preview'
                                className='w-full h-[350px] object-contain rounded-2xl'
                            />

                        </div>
                    )}

                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-black dark:bg-zinc-700 hover:bg-gray-900 dark:hover:bg-zinc-600 text-white px-6 py-4 rounded-xl w-full font-semibold text-lg transition duration-300'
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