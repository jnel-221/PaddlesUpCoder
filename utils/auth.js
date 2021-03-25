const withAuth = (req, res, next) => {
  console.log("am i logged in at withAuth function?", req.session.logged_in);
  //if not logged in, you get re-directed to homepage,
  if (!req.session.logged_in) {
    res.redirect("/homepage");
  } else {
    next();
  }
};

module.exports = withAuth;
