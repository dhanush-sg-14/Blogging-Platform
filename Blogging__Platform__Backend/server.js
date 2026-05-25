// const express = require('express')

// const mongoose = require('mongoose')

// const cors = require('cors')

// const dotenv = require('dotenv')

// const path = require('path')

// const authMiddleware = require('./middleware/authMiddleware')

// const authRoutes = require('./routes/authRoutes')

// const blogRoutes = require('./routes/blogRoutes')

// dotenv.config()

// const app = express()


// // Middleware

// app.use(cors())

// app.use(express.json())


// // Static Folder for Images

// app.use(
//     '/uploads',
//     express.static(
//         path.join(__dirname, 'uploads')
//     )
// )


// // Routes

// app.use('/api/auth', authRoutes)

// app.use('/api/blogs', blogRoutes)


// // Protected Route

// app.get('/api/protected', authMiddleware, (req, res) => {

//     res.json({
//         message: 'Protected route accessed',
//         user: req.user,
//     })
// })


// // MongoDB Connection

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err))


// // Default Route

// app.get('/', (req, res) => {

//     res.send('Blog API Running')
// })


// // Server

// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => {

//     console.log(`Server running on port ${PORT}`)
// })

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

const authMiddleware = require('./middleware/authMiddleware')
const authRoutes = require('./routes/authRoutes')
const blogRoutes = require('./routes/blogRoutes')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// STATIC FOLDER
app.use(
    '/uploads',
    express.static(path.join(__dirname, 'uploads'))
)

app.use('/api/auth', authRoutes)
app.use('/api/blogs', blogRoutes)

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({
        message: 'Protected route accessed',
        user: req.user,
    })
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Blog API Running')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})