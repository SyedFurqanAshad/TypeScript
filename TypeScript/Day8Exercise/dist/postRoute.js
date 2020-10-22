"use strict";
const express2 = require("express");
const router2 = express2.Router();
const axios2 = require("axios");
router2.get("/posts", async (req, res) => {
    const posts = await axios2.get("https://jsonplaceholder.typicode.com/posts");
    const comments = await axios2.get("https://jsonplaceholder.typicode.com/comments");
    const user = parseInt(req.query.user);
    const deleteUser = posts.data.filter(del => del.userId != user);
    const postWithComments = deleteUser.map(item => {
        const filterComments = comments.data.filter(m => m.postId === item.id);
        return Object.assign(Object.assign({}, item), { comments: filterComments });
    });
    const sortingByTitle = (a, b) => a.title.localeCompare(b.title);
    const sortingByBody = (a, b) => a.body.localeCompare(b.body);
    if ((req.query.sort == 1 || req.query.sort == -1) && req.query.title) {
        postWithComments.sort(sortingByTitle);
        req.query.sort == -1 ? postWithComments.reverse() : null;
    }
    if ((req.query.sort == 1 || req.query.sort == -1) && req.query.body) {
        postWithComments.sort(sortingByBody);
        req.query.sort == -1 ? postWithComments.reverse() : null;
    }
    res.send(postWithComments);
});
module.exports = router2;
