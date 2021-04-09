const router = require("express").Router();
const User = require("../models");

router.post("/register", (req, res) => {
  const user = new User({
    id: req.body.id,
    fname: req.body.firstName,
    lname: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  res.send(res.user);
});

module.exports = router;
