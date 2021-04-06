const router = require("express").Router();
const { User, Post } = require("../../models");
// const withAuth = require("../../utils/auth");

//create new blog post
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

    const user = posts.user_name;
    const dashboardPosts = posts.posts;

    res.render("dashboard", {
      user,
      dashboardPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//update a blog-post
router.post("/:id", async (req, res) => {
  console.log("@@made it to update in blogRoutes", req.body)
  try {
    const post = await Post.findByPk(req.body.id)
    console.log("@@made it to blogRoutes update route", post)

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
