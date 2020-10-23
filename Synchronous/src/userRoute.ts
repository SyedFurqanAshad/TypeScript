const express2 = require("express");
const router = express2.Router();
const axios = require("axios");
import { Request, Response } from "express";

interface userType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface postsType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface userWithPostsType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  posts: postsType[];
}

router.get(
  "/",
  async (req: Request, res: Response): Promise<void> => {
    const { data: allUsers } = await axios.get(
      `https://jsonplaceholder.typicode.com/users`
    );

    const userWithPosts: userWithPostsType[] = [];

    for (let ID of allUsers) {
      const user: { data: userType } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${ID.id}`
      );
      const posts: { data: postsType[] } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${user.data.id}/posts`
      );
      userWithPosts.push({ ...user.data, posts: posts.data });
    }
    res.send(userWithPosts);
  }
);
module.exports = router;
