const express1 = require("express");
const router = express1.Router();
const axios = require("axios");

import { Request, Response } from "express";

interface postType {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface commentType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
interface postWithCommentsType {
  id: number;
  userId: number;
  title: string;
  body: string;
  comments: commentType[];
}

router.get(
  "/postWithComments/async",
  async (req: Request, res: Response): Promise<void> => {
    const posts: { data: postType[] } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const postWithComments: Promise<postWithCommentsType>[] = posts.data.map(
      async (post: postType) => {
        const comments: { data: commentType[] } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
        );
        return {
          ...post,
          comments: comments.data
        };
      }
    );
    res.send(await Promise.all(postWithComments));
  }
);

module.exports = router;
