const router = require("express").Router();
const { User } = require("../models");

router.post("/register", async (req, res) => {
  const user = new User({
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
