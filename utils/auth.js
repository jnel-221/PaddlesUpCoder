const withAuth = (req, res, next) => {
  //if not logged in, you get re-directed to login link,
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
