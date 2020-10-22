"use strict";
const express1 = require("express");
const router1 = express1.Router();
const axios1 = require("axios");
router1.get("/postWithComments/sync", async (req, res) => {
    const { data: allPosts } = await axios1.get(`https://jsonplaceholder.typicode.com/posts`);
    const postWithComments = [];
    for (let ID of allPosts) {
        const post = await axios1.get(`https://jsonplaceholder.typicode.com/posts/${ID.id}`);
        const comments = await axios1.get(`https://jsonplaceholder.typicode.com/posts/${post.data.id}/comments`);
        postWithComments.push(Object.assign(Object.assign({}, post.data), { comments: comments.data }));
    }
    res.send(postWithComments);
});
module.exports = router1;
