"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express1 = require("express");
const router = express1.Router();
const axios = require("axios");
router.get("/users", async (req, res) => {
    const users = await axios.get("https://jsonplaceholder.typicode.com/users");
    const specificUser = users.data.filter(item => {
        return item.address.zipcode === req.query.zip;
    });
    const posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const comments = await axios.get("https://jsonplaceholder.typicode.com/comments");
    let array = [];
    if (!req.query.zip)
        array = users.data;
    else
        array = specificUser;
    const userWithPost = array.map(item => {
        const filterPosts = posts.data.filter(m => m.userId === item.id);
        const filterPostWithComments = filterPosts.map(post => {
            return Object.assign(Object.assign({}, post), { comments: [...comments.data.filter(com => com.postId === post.id)] });
        });
        return {
            id: item.id,
            name: item.name,
            username: item.username,
            address: item.address,
            posts: filterPostWithComments
        };
    });
    res.send(userWithPost);
});
module.exports = router;
