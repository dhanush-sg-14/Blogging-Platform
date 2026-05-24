const Blog = require('../models/Blog')

const createBlog = async (req, res) => {

    try {

        const { title, content } = req.body

        const blog = await Blog.create({
            title,
            content,
            image: req.file
                ? `/uploads/${req.file.filename}`
                : '',
            author: req.user.id,
        })

        res.status(201).json(blog)

    } catch (error) {

        res.status(500).json({
            message: error.message,
        })
    }
}

const getBlogs = async (req, res) => {

    try {

        const blogs = await Blog.find()
            .populate('author', 'name email')
            .sort({ createdAt: -1 })

        res.status(200).json(blogs)

    } catch (error) {

        res.status(500).json({
            message: error.message,
        })
    }
}

const getSingleBlog = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id)
            .populate('author', 'name email')

        if (!blog) {

            return res.status(404).json({
                message: 'Blog not found',
            })
        }

        res.status(200).json(blog)

    } catch (error) {

        res.status(500).json({
            message: error.message,
        })
    }
}

const updateBlog = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id)

        if (!blog) {

            return res.status(404).json({
                message: 'Blog not found',
            })
        }

        // Ownership Check

        if (blog.author.toString() !== req.user.id) {

            return res.status(401).json({
                message: 'Not authorized',
            })
        }

        blog.title = req.body.title || blog.title

        blog.content = req.body.content || blog.content

        if (req.file) {

            blog.image = `/uploads/${req.file.filename}`
        }

        const updatedBlog = await blog.save()

        res.status(200).json(updatedBlog)

    } catch (error) {

        res.status(500).json({
            message: error.message,
        })
    }
}

const deleteBlog = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id)

        if (!blog) {

            return res.status(404).json({
                message: 'Blog not found',
            })
        }

        // Ownership Check

        if (blog.author.toString() !== req.user.id) {

            return res.status(401).json({
                message: 'Not authorized',
            })
        }

        await blog.deleteOne()

        res.status(200).json({
            message: 'Blog deleted successfully',
        })

    } catch (error) {

        res.status(500).json({
            message: error.message,
        })
    }
}

module.exports = {
    createBlog,
    getBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
}