const express1 = require("express");
const router1 = express1.Router();
const axios1 = require("axios");

router1.get(
  "/postWithComments/sync",
  async (req: any, res: any): Promise<void> => {
    const { data: allPosts } = await axios1.get(
      `https://jsonplaceholder.typicode.com/posts`
    );
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

    const postWithComments: postWithCommentsType[] = [];

    for (let ID of allPosts) {
      const post: { data: postType } = await axios1.get(
        `https://jsonplaceholder.typicode.com/posts/${ID.id}`
      );
      const comments: { data: commentType[] } = await axios1.get(
        `https://jsonplaceholder.typicode.com/posts/${post.data.id}/comments`
      );
      postWithComments.push({ ...post.data, comments: comments.data });
    }
    res.send(postWithComments);
  }
);

module.exports = router1;
