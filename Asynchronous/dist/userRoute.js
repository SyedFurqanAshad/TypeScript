"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express2 = require("express");
const router2 = express2.Router();
const axios2 = require("axios");
router2.get("/usersWithPosts/async", async (req, res) => {
    const users = await axios2.get("https://jsonplaceholder.typicode.com/users");
    const userWithPosts = users.data.map(async (user) => {
        const posts = await axios2.get(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
        return Object.assign(Object.assign({}, user), { posts: posts.data });
    });
    res.send(await Promise.all(userWithPosts));
});
module.exports = router2;
