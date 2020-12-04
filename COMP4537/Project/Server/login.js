// const express = require("express");
// const router = express.Router();
// const db = require("../db/connect.js");
// let jwt = require('jsonwebtoken');

// //Get email from user table
// router.post("/login", (req, res) => {
//   db.select("email")
//     .from("users")
//     .where({ userId: req.params.user })
//     .then(data => {
//       if(data.length != 0){
//           res.json({exist: true, userInfo: data[0]});
//       } else {
//           res.json({exist: false});
//       }
//     })
// });
