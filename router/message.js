const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/message", (req, res, next) => {
  return fs.readFile("message.txt", { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(
      `<body><p>${data}</p><br><form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/message" method="POST" ><input id="message" type="text" name="message"><input type="hidden" name="username" id="username"><button type="submit">SEND</button></form></body>`
    );
  });
});

router.post("/message", (req, res, next) => {
  console.log(req.body);
  let message = req.body.username + ':"' + req.body.message + '" ';
  fs.appendFile("message.txt", message, "utf-8", (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/message");
  });
});

module.exports = router;
