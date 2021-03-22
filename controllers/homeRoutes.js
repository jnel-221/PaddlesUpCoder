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

    console.log(userPosts);
    res.render("homepage", {
      userPosts,
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
