import { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/blog/post";
import dbConnect from "../../../utils/dbConnect";

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({});
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  let post = new Post(body);
  post = await post.save();
  res.status(201).json(post);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method == "GET") return await handleGet(req, res);
  if (req.method == "POST") return await handlePost(req, res);
  res.status(404).json({ message: "Unknown method" });
}
