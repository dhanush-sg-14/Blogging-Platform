const express = require('express')

const router = express.Router()

const {
    createBlog,
    getBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
} = require('../controllers/blogController')

const authMiddleware = require('../middleware/authMiddleware')

router.get('/', getBlogs)

router.get('/:id', getSingleBlog)

router.post('/', authMiddleware, createBlog)

router.put('/:id', authMiddleware, updateBlog)

router.delete('/:id', authMiddleware, deleteBlog)

module.exports = router