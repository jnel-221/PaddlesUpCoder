const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

// TODO: after building models and pseudo-coding app, complete get-route for app.
//prevents us from accessing the homepage if not logged in, by means of our middle-ware traffic cop!
router.get("/", withAuth, async (req, res) => {
  try {
    // const userData = await User.findAll({
    //   attributes: { exclude: ["password"] },
    //   order: [["name", "ASC"]],
    // });

    // const users = userData.map((project) => project.get({ plain: true }));

    res.render("homepage", {
      users,
      //passes in logged_in status
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  //if session exists, goes to homepage, otherwise it renders login handlebar.
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
