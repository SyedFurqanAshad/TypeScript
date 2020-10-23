"use strict";
const express1 = require("express");
const router = express1.Router();
const axios = require("axios");
router.get("/", (req, res) => {
    axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
        try {
            res.send(response.data);
        }
        catch (ex) {
            console.log(ex);
        }
    });
});
module.exports = router;
