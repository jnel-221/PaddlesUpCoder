const router = require("express").Router();
const { User, Post } = require("../../models");
const withAuth = require("../../utils/auth");

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

//retrieve a single blog post
router.post("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.body.id);

    const post = postData.get({ plain: true });

    res.render("updatepost", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//update a blog post
router.put("/:id", async (req, res) => {
  
  try {

    const updateData = await Post.update({
      title: req.body.title,
      text: req.body.text,
    },
    {where: {id: req.body.id}});
    
    res.status(200).json(updateData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete a blog post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.render("dashboard", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
