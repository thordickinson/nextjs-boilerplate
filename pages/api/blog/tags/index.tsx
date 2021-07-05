import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../utils/dbConnect";
import Tag from '../../../../models/blog/tags';
import pagedResult from "../../../../utils/pagination";


async function handleGet(rq: NextApiRequest, rs: NextApiResponse) {
    await dbConnect()
    const result = await pagedResult(rq, Tag)
    rs.json(result)
}

async function handlePost(rq: NextApiRequest, rs: NextApiResponse) {
}

async function handleDelete(rq: NextApiRequest, rs: NextApiResponse) {
}

export default async function handler(rq: NextApiRequest, rs: NextApiResponse) {
    const { method } = rq
    if (method == 'GET') return await handleGet(rq, rs)
    if (method == 'POST') return await handlePost(rq, rs)
    if (method == 'DELETE') return await handleDelete(rq, rs)
}
