const router = require("express").Router();
const { User, Post } = require("../../models");
// const withAuth = require("../../utils/auth");

router.post("/newpost", async (req, res) => {
  try {
    const newBlogPost = await Post.create(req.body);

    console.log("@@you made it to new blog post@@", newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;

