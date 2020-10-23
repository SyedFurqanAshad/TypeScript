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

interface postWithCommentsType {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments: commentType[];
}

router2.get(
  "/posts",
  async (req: Request, res: Response): Promise<void> => {
    const posts: { data: postType[] } = await axios2.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const comments: { data: commentType[] } = await axios2.get(
      "https://jsonplaceholder.typicode.com/comments"
    );

    const user: number = Number(req.query.user);
    const deleteUser: postType[] = posts.data.filter(del => del.userId != user);

    const postWithComments: postWithCommentsType[] = deleteUser.map(item => {
      const filterComments: commentType[] = comments.data.filter(
        m => m.postId === item.id
      );

      return {
        ...item,
        comments: filterComments
      };
    });

    const sortingByTitle = (a: { title: string }, b: { title: string }) =>
      a.title.localeCompare(b.title);
    const sortingByBody = (a: { body: string }, b: { body: string }) =>
      a.body.localeCompare(b.body);

    if (
      (Number(req.query.sort) === 1 || Number(req.query.sort) === -1) &&
      req.query.title
    ) {
      postWithComments.sort(sortingByTitle);
      Number(req.query.sort) === -1 ? postWithComments.reverse() : null;
    }

    if (
      (Number(req.query.sort) === 1 || Number(req.query.sort) === -1) &&
      req.query.body
    ) {
      postWithComments.sort(sortingByBody);
      Number(req.query.sort) === -1 ? postWithComments.reverse() : null;
    }

    res.send(postWithComments);
  }
);

module.exports = router2;
