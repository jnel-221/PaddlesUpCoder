const router = require("express").Router();
const { User, Post } = require("../../models");

//create new user from sign-up view
router.post("/signup", async (req, res) => {
  
  try {
    const userData = await User.create({user_name: req.body.user_name, password: req.body.password});

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//login existing users from login page
router.post("/login", async (req, res) => {

  try {
    //find user in db
    const userData = await User.findOne({
      where: { user_name: req.body.userName },
      include: {model: Post}
    });
   
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

    //saving user_id and logged_in as true to sessions
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {

    res.status(400).json(err);
  }
});

//ends session
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
