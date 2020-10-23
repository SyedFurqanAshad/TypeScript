const express1 = require("express");
const router = express1.Router();
const axios = require("axios");

interface userType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

router.get("/", (req: any, res: any) => {
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response: { data: userType[] }) => {
      try {
        res.send(response.data);
      } catch (ex) {
        console.log(ex);
      }
    });
});

module.exports = router;
