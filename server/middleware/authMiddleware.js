const asyncHandler = require("express-async-handler");
const userModel = require("../modals/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decode.id).select("-password");
      next();
    } catch (err) {
      res.status(401).json({ error: "not authorized , token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ error: "not authorized ,no token" });
  }
});

module.exports = { protect };
