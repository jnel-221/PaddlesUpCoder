const router = require("express").Router();
const { User, Post } = require("../../models");
// const withAuth = require("../../utils/auth");

router.post("/newpost", async (req, res) => {
  try {
    await Post.create({
      title: req.body.blogTitle,
      text: req.body.blogContent,
      user_id: req.session.user_id,
    });

    const postData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ["password"],
      },
      include: [{ model: Post }],
    });

    const posts = postData.get({ plain: true });

    console.log("@@Here's the plain data", posts);

    const user = posts.user_name;
    const dashboardPosts = posts.posts;

    console.log("@@Here's the user variable; ", user);
    res.render("dashboard", {
      user,
      dashboardPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
