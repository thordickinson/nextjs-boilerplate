import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
    key: { type: String, required: true, unike: true },
    label: { type: String, required: true }
})
export default mongoose.models.tag || mongoose.model('tag', TagSchema, 'blog_tags')
