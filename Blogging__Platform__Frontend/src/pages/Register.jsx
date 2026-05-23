import { useState } from 'react'
import API from '../services/api'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
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
            const res = await API.post(
                '/auth/register',
                formData
            )

            console.log(res.data)

            alert('Registration Successful')
        } catch (error) {
            console.log(error)

            alert('Registration Failed')
        }
    }

    return (
        <div>
            <h1>Register Page</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='name'
                    placeholder='Enter Name'
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type='email'
                    name='email'
                    placeholder='Enter Email'
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type='password'
                    name='password'
                    placeholder='Enter Password'
                    onChange={handleChange}
                />

                <br />
                <br />

                <button type='submit'>
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register