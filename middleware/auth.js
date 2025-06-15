// middlewares/auth.js
const JWT = require("jsonwebtoken");
const JWT_SECRET = "myverysecretkey";

function isLoggedIn(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/user/signin");
  }

  try {
    const decoded = JWT.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user to request
    next(); // Proceed to the next middleware or route
  } catch (err) {
    console.log(err);
    return res.redirect("/user/signin");
  }
}

module.exports = isLoggedIn;
