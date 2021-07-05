import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    title: { type: String, require: true },
    summary: { type: String, require: true },
    content: { type: String, require: true },
    image: { type: String },
    tags: [{ type: String }],
    createdAt: { type: Date, default: () => new Date(), immutable: true },
    author: { type: String, immutable: true }
})

export default mongoose.models.Post || mongoose.model('Post', PostSchema, 'blog_posts')
