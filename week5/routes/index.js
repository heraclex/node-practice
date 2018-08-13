var router = require("express").Router();

const decodeURI = (req, res, next) => {
  console.log("trying to decode params...");
  try {
    decodeURIComponent(req.path);
    next();
  }
  catch (err) {
    console.log(err, req.url);
    res.status(400);
    res.send('Invalid Query');
  }
}

const middleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
};

router.use("/api", [decodeURI, middleware]);
router.use("/api", require("./api/user"));

module.exports = router;
