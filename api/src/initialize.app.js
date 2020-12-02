function initialize({
  app,
  bodyParser,
  imagesModel,
  imagesRouter
}) {
  app.use(bodyParser.json());
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Accept, Content-Type');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    } else {
      return next();
    }
  });

  imagesModel.initializeRDS()
  .then(function(ans) {
    imagesRouter.routesConfig();
  })
  .catch(function(err) {
    console.log('Error while creating Images table', err);
  });

  return app;
}

module.exports = initialize