"use strict";
const express5 = require("express");
const router5 = express5.Router();
const axios5 = require("axios");
router5.get("/", (req, res) => {
    axios5
        .get("https://jsonplaceholder.typicode.com/photos")
        .then((response) => {
        try {
            res.send(response.data);
        }
        catch (ex) {
            console.log(ex);
        }
    });
});
module.exports = router5;
