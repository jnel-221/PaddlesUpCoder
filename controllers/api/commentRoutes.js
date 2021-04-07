const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
  try {
    
    const response = await Comment.create({
      text: req.body.blogContent,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });
    
    
    res.status(200).json({ msg: "Comment posted", response });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;