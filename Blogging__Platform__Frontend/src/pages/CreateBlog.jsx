import { useState } from 'react'
import API from '../services/api'

function CreateBlog() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    })

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

            const res = await API.post(
                '/blogs',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            console.log(res.data)

            alert('Blog Created Successfully')
        } catch (error) {
            console.log(error)

            alert('Failed To Create Blog')
        }
    }

    return (
        <div>
            <h1>Create Blog</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    placeholder='Enter Title'
                    onChange={handleChange}
                />

                <br />
                <br />

                <textarea
                    name='content'
                    placeholder='Enter Blog Content'
                    onChange={handleChange}
                />

                <br />
                <br />

                <button type='submit'>
                    Create Blog
                </button>
            </form>
        </div>
    )
}

export default CreateBlog