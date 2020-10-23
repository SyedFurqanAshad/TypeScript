"use strict";
const express3 = require("express");
const router3 = express3.Router();
const axios3 = require("axios");
router3.get("/", (req, res) => {
    axios3
        .get("https://jsonplaceholder.typicode.com/comments")
        .then((response) => {
        try {
            res.send(response.data);
        }
        catch (ex) {
            console.log(ex);
        }
    });
});
module.exports = router3;
