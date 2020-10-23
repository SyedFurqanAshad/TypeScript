"use strict";
const express2 = require("express");
const router2 = express2.Router();
const axios2 = require("axios");
router2.get("/", (req, res) => {
    axios2
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
        try {
            res.send(response.data);
        }
        catch (ex) {
            console.log(ex);
        }
    });
});
module.exports = router2;
