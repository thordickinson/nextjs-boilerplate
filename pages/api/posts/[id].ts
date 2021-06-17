import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from '../../../utils/dbConnect'
import Posts from '../../../models/post'


async function getPost(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect()
    const post = await Posts.findById(req.query.id)
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
