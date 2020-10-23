"use strict";
const express = require("express");
const app = express();
const user = require("./userRoute");
const post = require("./postRoute");
app.use("/users", user);
app.use("/posts", post);
app.listen(3000, () => console.log("Listenin on Port 3000"));
