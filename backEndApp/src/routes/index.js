var router = require("express").Router();

const detectInvalidUrl = (req, res, next) => {
  try {
    console.log(`\n`)
    console.log(`Received "${req.method}" with url ${req.originalUrl} `)
    console.log(`Params:`, req.params)
    // trying to decodeURI
    decodeURIComponent(req.path)
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
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  // delay sometu
  setTimeout(async () => {
    next();
  }, 1000);
};

router.use("/api/v1", [detectInvalidUrl, middleware]);
router.use("/api/v1", require("./route.user"));

module.exports = router;
