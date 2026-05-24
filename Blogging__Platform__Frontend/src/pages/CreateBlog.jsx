import { useState } from 'react'

import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'

import API from '../services/api'

function CreateBlog() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        content: '',
    })

    const [image, setImage] = useState(null)

    const [loading, setLoading] = useState(false)

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

            const data = new FormData()

            data.append('title', formData.title)
            data.append('content', formData.content)

            if (image) {
                data.append('image', image)
            }

            const res = await API.post(
                '/blogs',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            console.log(res.data)

            toast.success('Blog Created Successfully')

            setLoading(false)

            navigate('/myblogs')

        } catch (error) {

            console.log(error)

            toast.error('Blog Creation Failed')

            setLoading(false)
        }
    }

    return (

        <div className='min-h-screen flex justify-center items-center bg-gray-100 px-4 py-10'>

            <div className='w-full max-w-2xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-2xl rounded-3xl p-8 text-white'>

                <h1 className='text-4xl font-bold mb-8 text-center'>
                    Create Blog
                </h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type='text'
                        name='title'
                        placeholder='Enter Blog Title'
                        onChange={handleChange}
                        className='w-full bg-white text-black border border-gray-300 p-4 rounded-xl mb-5 focus:outline-none focus:ring-4 focus:ring-blue-200'
                    />

                    <textarea
                        name='content'
                        placeholder='Write your blog content here...'
                        onChange={handleChange}
                        rows='8'
                        className='w-full bg-white text-black border border-gray-300 p-4 rounded-xl mb-5 focus:outline-none focus:ring-4 focus:ring-blue-200 resize-none'
                    />

                    <div className='mb-6'>

                        <label className='block text-lg font-semibold mb-3'>
                            Upload Blog Image
                        </label>

                        <label className='flex flex-col items-center justify-center w-full h-40 bg-white border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-100 transition duration-300 shadow-lg'>

                            <div className='flex flex-col items-center justify-center'>

                                <p className='text-xl font-bold text-gray-700'>
                                    Click to Upload Image
                                </p>

                                <p className='text-sm text-gray-500 mt-2'>
                                    PNG, JPG, JPEG
                                </p>

                                {image && (
                                    <p className='text-sm text-blue-600 mt-4 font-semibold px-4 text-center'>
                                        {image.name}
                                    </p>
                                )}

                            </div>

                            <input
                                type='file'
                                accept='image/*'
                                onChange={(e) =>
                                    setImage(e.target.files[0])
                                }
                                className='hidden'
                            />

                        </label>

                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-black hover:bg-gray-900 transition duration-300 text-white px-6 py-3 rounded-xl w-full font-semibold text-lg'
                    >
                        {loading ? 'Creating Blog...' : 'Create Blog'}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default CreateBlog