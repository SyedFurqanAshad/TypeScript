"use strict";
const express2 = require("express");
const router2 = express2.Router();
const axios2 = require("axios");
router2.get("/posts", async (req, res) => {
    const posts = await axios2.get("https://jsonplaceholder.typicode.com/posts");
    const comments = await axios2.get("https://jsonplaceholder.typicode.com/comments");
    let specificPost = posts.data.filter(item => {
        return item.title === req.query.title;
    });
    let postArray = [];
    Array.isArray(specificPost) && specificPost.length
        ? (postArray = specificPost)
        : (postArray = posts.data);
    req.query.body &&
        (specificPost = postArray.filter(item => {
            return item.body == req.query.body;
        }));
    let array = [];
    if (!req.query.title && !req.query.body)
        array = posts.data;
    else
        array = specificPost;
    const postWithComments = array.map(item => {
        const filterComments = comments.data.filter(m => m.postId === item.id);
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
