const router = require("express").Router();
const path = require("path");
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
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },

      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    const posts = user.posts;
    //grab only posts that logged-in user wrote to render on dashboard otherwise display empty page with button at bottom
    res.render("dashboard", {
      posts,
      //passes in logged_in status
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/newpost", withAuth, async (req, res) => {
  if (req.session.logged_in) {
    res.render("newpost");
  } else {
    res.render("login");
  }
});

router.get("/updatepost/:id", withAuth, async (req, res) => {
  console.log("@in homeRoutes now", req.params.id);
  try {
    const postData = await Post.findByPk(req.params.id);
  
    const post = postData.get({ plain: true });

    console.log("@@cleaned up data from single post", post);
    res.render("updatepost", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
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
