"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express2 = require("express");
const router = express2.Router();
const axios = require("axios");
router.get("/", async (req, res) => {
    const { data: allUsers } = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    const userWithPosts = [];
    for (let ID of allUsers) {
        const user = await axios.get(`https://jsonplaceholder.typicode.com/users/${ID.id}`);
        const posts = await axios.get(`https://jsonplaceholder.typicode.com/users/${user.data.id}/posts`);
        userWithPosts.push(Object.assign(Object.assign({}, user.data), { posts: posts.data }));
    }
    res.send(userWithPosts);
});
module.exports = router;
