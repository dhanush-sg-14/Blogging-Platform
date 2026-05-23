import { useState } from 'react'
import API from '../services/api'

function Login() {
    const [formData, setFormData] = useState({
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
                '/auth/login',
                formData
            )

            // Save token
            localStorage.setItem(
                'token',
                res.data.token
            )

            alert('Login Successful')

            console.log(res.data)
        } catch (error) {
            console.log(error)

            alert('Login Failed')
        }
    }

    return (
        <div>
            <h1>Login Page</h1>

            <form onSubmit={handleSubmit}>
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
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login