// routes/blogRoutes.js

const express = require('express')

const router = express.Router()

const multer = require('multer')

const path = require('path')

const {

    createBlog,

    getBlogs,

    getSingleBlog,

    updateBlog,

    likeBlog,

    deleteBlog,

} = require('../controllers/blogController')

const authMiddleware = require('../middleware/authMiddleware')

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'uploads/')
    },

    filename: (req, file, cb) => {

        cb(

            null,

            Date.now() +

            path.extname(
                file.originalname
            )
        )
    },
})

const fileFilter = (
    req,
    file,
    cb
) => {

    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp',
    ]

    if (
        allowedTypes.includes(
            file.mimetype
        )
    ) {

        cb(null, true)

    } else {

        cb(
            new Error(
                'Only images are allowed'
            ),
            false
        )
    }
}

const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024,
    },
})

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

router.put(
    '/like/:id',
    likeBlog
)

router.delete(
    '/:id',
    authMiddleware,
    deleteBlog
)

module.exports = router