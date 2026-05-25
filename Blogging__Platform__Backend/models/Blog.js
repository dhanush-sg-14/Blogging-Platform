// models/Blog.js

const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            default: '',
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        category: {
            type: String,
            default: 'General',
        },

        likes: {
            type: Number,
            default: 0,
        },

        readingTime: {
            type: String,
            default: '1 min read',
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model(
    'Blog',
    blogSchema
)