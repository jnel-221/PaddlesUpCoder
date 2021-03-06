const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

//get homepage
router.get("/", async (req, res) => {
  try {
    const userPostData = await Post.findAll({
      include: [{ model: User, attributes: { exclude: ["password"] } }],
    });

    const userPosts = userPostData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      userPosts,
    
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },

      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    const posts = user.posts;

    res.render("dashboard", {
      user,
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get newpost view
router.get("/newpost", withAuth, async (req, res) => {
  if (req.session.logged_in) {
    res.render("newpost", {
      logged_in: req.session.logged_in,
    });
  } else {
    res.render("login");
  }
});

//get a single post and render updatepost view
router.get("/updatepost/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    const post = postData.get({ plain: true });
    res.render("updatepost", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//get a single post and render viewonepost view
router.get("/viewonepost/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: { exclude: ["password"] } },
        {
          model: Comment,
          include: [{ model: User, attributes: { exclude: ["password"] } }],
        },
      ],
    });

    const post = postData.get({ plain: true });

    const comments = post.comments;

    res.render("viewonepost", {
      post,
      comments,
      user_name: req.session.user_name,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get login view if not logged in
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

//get signup view if not logged-in
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signup");
});

module.exports = router;
