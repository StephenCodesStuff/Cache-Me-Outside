const withAuth = (req, res, next) => {
    
    if (!req.session.logged_in) {
      res.redirect('/');
      alert("Please log in to continue");
    } else {
      next();
    }
  };
  
  module.exports = withAuth;