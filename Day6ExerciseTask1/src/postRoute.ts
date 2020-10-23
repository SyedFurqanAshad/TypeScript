const express2 = require("express");
const router2 = express2.Router();
const axios2 = require("axios");
import { Request, Response } from "express";

interface postType {
  userId: number;
  id: number;
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
interface postWithCommentsType2 {
  id: number;
  title: string;
  body: string;
  comments: commentType[];
}

router2.get("/", async (req: Request, res: Response) => {
  const posts: { data: postType[] } = await axios2.get(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const comments: { data: commentType[] } = await axios2.get(
    "https://jsonplaceholder.typicode.com/comments"
  );

  const postWithComments: postWithCommentsType2[] = posts.data.map(item => {
    const filterComments: commentType[] = comments.data.filter(
      m => m.postId === item.id
    );

    return {
      id: item.id,
      title: item.title,
      body: item.body,
      comments: filterComments
    };
  });
  res.send(postWithComments);
});

module.exports = router2;
