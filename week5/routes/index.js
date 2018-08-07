var router = require("express").Router();

const middleware = (req, res, next) => {
  console.log("I'm middleware!");
  next();
};

router.use("/api", [middleware]);
router.use("/api", require("./api/user"));

module.exports = router;
