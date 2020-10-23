"use strict";
const express4 = require("express");
const router4 = express4.Router();
const axios4 = require("axios");
router4.get("/posts/:id/comments", (req, res) => {
    axios4
        .get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}/comments`)
        .then((response) => {
        try {
            res.send(response.data);
        }
        catch (ex) {
            console.log(ex);
        }
    });
});
module.exports = router4;
