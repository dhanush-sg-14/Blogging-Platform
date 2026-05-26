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
        category: '',
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

            const res = await API.get(`/ blogs / ${id} `)

            setFormData({
                title: res.data.title,
                content: res.data.content,
                category: res.data.category || '',
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

            const updatedData = new FormData()

            updatedData.append(
                'title',
                formData.title
            )

            updatedData.append(
                'content',
                formData.content
            )

            updatedData.append(
                'category',
                formData.category || 'General'
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

            toast.success(
                'Blog Updated Successfully'
            )

            setLoading(false)

            navigate(`/blog/${id}`)

        } catch (error) {

            console.log(error)

            toast.error('Update Failed')

            setLoading(false)
        }
    }

    return (

        <div className='min-h-screen flex justify-center items-center bg-gray-100 dark:bg-zinc-950 px-4 py-10 transition duration-300'>

            <div className='w-full max-w-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-2xl rounded-3xl p-8 transition duration-300'>

                <h1 className='text-4xl font-bold mb-8 text-center text-black dark:text-white'>
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
                        className='w-full bg-gray-100 dark:bg-zinc-800 text-black dark:text-white border border-gray-300 dark:border-zinc-700 p-4 rounded-xl focus:outline-none'
                    />

                    <select
                        name='category'
                        value={formData.category}
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
                        value={formData.content}
                        onChange={handleChange}
                        placeholder='Enter Blog Content'
                        rows='10'
                        className='w-full bg-gray-100 dark:bg-zinc-800 text-black dark:text-white border border-gray-300 dark:border-zinc-700 p-4 rounded-xl resize-none focus:outline-none'
                    />

                    <div>

                        <label className='block mb-4 text-lg font-semibold text-black dark:text-white'>
                            Change Blog Image
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

                        <div className='bg-gray-100 dark:bg-zinc-800 rounded-3xl p-4 shadow-2xl'>

                            <img
                                src={preview}
                                alt='Preview'
                                className='w-full h-[350px] object-contain rounded-2xl'
                            />

                            <p className='text-center text-gray-500 dark:text-gray-400 mt-3'>
                                Image Preview
                            </p>

                        </div>
                    )}

                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-black dark:bg-zinc-700 hover:bg-gray-900 dark:hover:bg-zinc-600 transition duration-300 text-white px-6 py-4 rounded-xl w-full font-semibold text-lg'
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