"use strict";
// declare function require(name: string): any;
const express = require("express");
const app = express();
const user = require("./userRoute");
const post = require("./postRoute");
app.use("/", user);
app.use("/", post);
app.listen(3000, () => console.log("Listening on Port 3000"));
