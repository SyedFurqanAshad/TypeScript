"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express2 = require("express");
const router2 = express2.Router();
const axios2 = require("axios");
router2.get("/", async (req, res) => {
    const posts = await axios2.get("https://jsonplaceholder.typicode.com/posts");
    const comments = await axios2.get("https://jsonplaceholder.typicode.com/comments");
    const postWithComments = posts.data.map(item => {
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
