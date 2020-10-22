var express = require("express");
var app = express();
var user = require("./userRoute");
var post = require("./postRoute");

app.use("/", user);
app.use("/", post);

app.listen(3000, () => console.log("Listenin on Port 3000"));
