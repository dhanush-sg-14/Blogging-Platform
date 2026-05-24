const express = require('express')

const router = express.Router()

const multer = require('multer')

const path = require('path')

const {
    createBlog,
    getBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
} = require('../controllers/blogController')

const authMiddleware = require('../middleware/authMiddleware')


// Multer Storage Setup

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'uploads/')
    },

    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + path.extname(file.originalname)
        )
    },
})

const upload = multer({ storage })


// Routes

router.get('/', getBlogs)

router.get('/:id', getSingleBlog)

router.post(
    '/',
    authMiddleware,
    upload.single('image'),
    createBlog
)

router.put(
    '/:id',
    authMiddleware,
    upload.single('image'),
    updateBlog
)

router.delete('/:id', authMiddleware, deleteBlog)

module.exports = router