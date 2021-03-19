const withAuth = (req, res, next) => {
  // TODO: Add a comment describing the functionality of this if statement
  //if not logged in, you get re-directed to login link,
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
