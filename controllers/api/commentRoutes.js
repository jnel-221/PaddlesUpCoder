const router = require("express").Router();
const { Comment, Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  console.log(req.body);
  try {
    
    const response = await Comment.create({
      text: req.body.text,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });
  
    res.status(200).json({ msg: "Comment posted", response });
   
    res.render('viewonepost', {
      logged_in: req.session.logged_in, 
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;