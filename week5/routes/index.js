var router = require("express").Router();

const middleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
  console.log("I'm middleware!");
  //next();
};

router.use("/api", [middleware]);
router.use("/api", require("./api/user"));

module.exports = router;
