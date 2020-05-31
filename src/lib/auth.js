module.exports = {
  isLoggedin(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/signin');
  },
  isNotLogedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect('profile');
  }
};