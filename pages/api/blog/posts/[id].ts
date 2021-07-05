import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from '../../../../utils/dbConnect'
import Posts from '../../../../models/blog/post'


async function getPost(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect()
    const { id } = req.query
    if(id.length != 24) return res.status(404).end()
    const post = await Posts.findById(id)
    if (!post) res.status(404).end()
    res.json(post)
}

async function updatePost(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect()
    await Posts.updateOne({ _id: req.query.id }, { $set: req.body })
    res.status(200).end()
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") return await getPost(req, res)
    if (req.method == "GET") return await updatePost(req, res)
    res.status(404).end()
}
