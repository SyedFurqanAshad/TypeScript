"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express2 = require("express");
const router2 = express2.Router();
const axios2 = require("axios");
router2.get("/posts", async (req, res) => {
    const posts = await axios2.get("https://jsonplaceholder.typicode.com/posts");
    const comments = await axios2.get("https://jsonplaceholder.typicode.com/comments");
    const user = Number(req.query.user);
    const deleteUser = posts.data.filter(del => del.userId != user);
    const postWithComments = deleteUser.map(item => {
        const filterComments = comments.data.filter(m => m.postId === item.id);
        return Object.assign(Object.assign({}, item), { comments: filterComments });
    });
    const sortingByTitle = (a, b) => a.title.localeCompare(b.title);
    const sortingByBody = (a, b) => a.body.localeCompare(b.body);
    if ((Number(req.query.sort) === 1 || Number(req.query.sort) === -1) &&
        req.query.title) {
        postWithComments.sort(sortingByTitle);
        Number(req.query.sort) === -1 ? postWithComments.reverse() : null;
    }
    if ((Number(req.query.sort) === 1 || Number(req.query.sort) === -1) &&
        req.query.body) {
        postWithComments.sort(sortingByBody);
        Number(req.query.sort) === -1 ? postWithComments.reverse() : null;
    }
    res.send(postWithComments);
});
module.exports = router2;
