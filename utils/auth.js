const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      req.flash('error', 'Please log in to continue');
      return res.redirect('/');
    } else {
      return next();
    }
  };
  module.exports = withAuth;