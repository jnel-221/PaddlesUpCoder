const router = require("express").Router();
const { User } = require("../../models");

router.post("/login", async (req, res) => {
  try {
    //find user where username matches a username in DB
    const userData = await User.findOne({ where: { name: req.body.user_name } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    //check password from User model using model function/instance;
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

  
    //saving user_id and logged_in as true to sessions!
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    //session gets destroyed!
    //to destroy a cookie, set the seconds to 0; by the way;
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
