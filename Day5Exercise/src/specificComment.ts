const express4 = require("express");
const router4 = express4.Router();
const axios4 = require("axios");
import { Request, Response } from "express";

interface commentType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
router4.get("/posts/:id/comments", (req: Request, res: Response) => {
  axios4
    .get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}/comments`)
    .then((response: { data: commentType[] }) => {
      try {
        res.send(response.data);
      } catch (ex) {
        console.log(ex);
      }
    });
});

module.exports = router4;
