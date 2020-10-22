"use strict";
const express1 = require("express");
const router = express1.Router();
const axios = require("axios");
router.get("/postWithComments/async", async (req, res) => {
    const posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const postWithComments = posts.data.map(async (post) => {
        const comments = await axios.get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
        return Object.assign(Object.assign({}, post), { comments: comments.data });
    });
    res.send(await Promise.all(postWithComments));
});
module.exports = router;
