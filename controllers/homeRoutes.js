const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

//access homepage only prior to logging in / signing up
router.get("/", async (req, res) => {
  try {
    const userPostData = await Post.findAll({
      include: [{ model: User }],
    });

    const userPosts = userPostData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      userPosts,
      //passes in logged_in status
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userPostData = await Post.findAll({
      include: [{ model: User }],
    });
    console.log("@@made it to userPostData##", userPostData);
    const userPosts = userPostData.map((post) => post.get({ plain: true }));

    console.log(
      "@@you've made it to userPosts in dashboard get route@@",
      userPosts
    );
    res.render("dashboard", {
      userPosts,
      //passes in logged_in status
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  //if session exists, goes to dashboard, otherwise it renders homepage.
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  //if session exists, goes to dashboard, otherwise it renders homepage.
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signup");
});

module.exports = router;
