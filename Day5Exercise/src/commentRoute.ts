const express3 = require("express");
const router3 = express3.Router();
const axios3 = require("axios");
import { Request, Response } from "express";

interface commentType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
router3.get("/", (req: Request, res: Response) => {
  axios3
    .get("https://jsonplaceholder.typicode.com/comments")
    .then((response: { data: commentType[] }) => {
      try {
        res.send(response.data);
      } catch (ex) {
        console.log(ex);
      }
    });
});

module.exports = router3;
