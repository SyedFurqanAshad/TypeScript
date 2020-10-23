const express2 = require("express");
const router2 = express2.Router();
const axios2 = require("axios");
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

router2.get(
  "/usersWithPosts/async",
  async (req: Request, res: Response): Promise<void> => {
    const users: { data: userType[] } = await axios2.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const userWithPosts: Promise<userWithPostsType>[] = users.data.map(
      async (user: userType) => {
        const posts: { data: postsType[] } = await axios2.get(
          `https://jsonplaceholder.typicode.com/users/${user.id}/posts`
        );
        return {
          ...user,
          posts: posts.data
        };
      }
    );
    res.send(await Promise.all(userWithPosts));
  }
);

module.exports = router2;
