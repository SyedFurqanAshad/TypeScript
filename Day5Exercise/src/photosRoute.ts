const express5 = require("express");
const router5 = express5.Router();
const axios5 = require("axios");

interface photoType {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

router5.get("/", (req: any, res: any) => {
  axios5
    .get("https://jsonplaceholder.typicode.com/photos")
    .then((response: { data: photoType[] }) => {
      try {
        res.send(response.data);
      } catch (ex) {
        console.log(ex);
      }
    });
});

module.exports = router5;
