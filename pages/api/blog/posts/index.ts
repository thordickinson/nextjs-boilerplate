import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../utils/dbConnect";
import Posts from "../../../../models/blog/post";
import pagedResult from "../../../../utils/pagination";

async function listPosts(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect()
    const result = await pagedResult(req, Posts)
    res.json(result)
}

async function createPost(req: NextApiRequest, res: NextApiResponse) {
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") return await listPosts(req, res)
    if (req.method == "POST") return await createPost(req, res)
    res.status(404).end()
}
