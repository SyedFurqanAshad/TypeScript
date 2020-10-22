const express1 = require("express");
const router = express1.Router();
const axios = require("axios");

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

interface userWithPostsType {
  id: number;
  name: string;
  username: string;
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
  posts: postType[];
}
interface postWithCommentsType {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments: commentType[];
}

router.get(
  "/users",
  async (req: any, res: any): Promise<void> => {
    const users: { data: userType[] } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const specificUser: userType[] = users.data.filter(item => {
      return item.address.zipcode === req.query.zip;
    });

    const posts: { data: postType[] } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const comments: { data: commentType[] } = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );

    let array: userType[] = [];
    if (!req.query.zip) array = users.data;
    else array = specificUser;

    const userWithPost: userWithPostsType[] = array.map(item => {
      const filterPosts: postType[] = posts.data.filter(
        m => m.userId === item.id
      );

      const filterPostWithComments: postWithCommentsType[] = filterPosts.map(
        post => {
          return {
            ...post,
            comments: [...comments.data.filter(com => com.postId === post.id)]
          };
        }
      );

      return {
        id: item.id,
        name: item.name,
        username: item.username,
        address: item.address,
        posts: filterPostWithComments
      };
    });
    res.send(userWithPost);
  }
);

module.exports = router;
