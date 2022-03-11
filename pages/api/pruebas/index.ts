import {NextApiRequest, NextApiResponse} from 'next'
import dbConnect from '../../../utils/dbConnect'
import Post from '../../../models/blog/post'


async function handleGet(req:NextApiRequest, res:NextApiResponse){
  res.status(200).json('esta es la respuesta de un get');
}

async function handlePost(req:NextApiRequest, res:NextApiResponse){
  //const {body} = req;
  req = {
    "title":"post test",
    "summary":"un post de pruebas",
    "content":"este es el contenido"
  }
  
  let post = new Post(req);
  post = await post.save();
  res.status(201).json(post);
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
  ) {
    await dbConnect();
    if(req.method == "GET") return await handleGet(req, res);
    if(req.method == "POST") return await handlePost(req, res);
    res.status(404).json({ message: "Unknown method" });
  }