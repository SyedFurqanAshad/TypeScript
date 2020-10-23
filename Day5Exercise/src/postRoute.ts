const express2 = require("express");
const router2 = express2.Router();
const axios2 = require("axios");
import { Request, Response } from "express";

interface postType {
  userId: number;
  id: number;
  title: string;
  body: string;
}
router2.get("/", (req: Request, res: Response) => {
  axios2
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((response: { data: postType[] }) => {
      try {
        res.send(response.data);
      } catch (ex) {
        console.log(ex);
      }
    });
});

module.exports = router2;
