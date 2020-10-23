const express2 = require("express");
const router2 = express2.Router();
const axios2 = require("axios");

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

router2.get("/posts", async (req: any, res: any) => {
  const posts: { data: postType[] } = await axios2.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const comments: { data: commentType[] } = await axios2.get(
    "https://jsonplaceholder.typicode.com/comments"
  );
  let specificPost: postType[] = posts.data.filter(item => {
    return item.title === req.query.title;
  });
  let postArray: postType[] = [];
  Array.isArray(specificPost) && specificPost.length
    ? (postArray = specificPost)
    : (postArray = posts.data);

  req.query.body &&
    (specificPost = postArray.filter(item => {
      return item.body == req.query.body;
    }));

  let array: postType[] = [];
  if (!req.query.title && !req.query.body) array = posts.data;
  else array = specificPost;

  const postWithComments: postWithCommentsType2[] = array.map(item => {
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
