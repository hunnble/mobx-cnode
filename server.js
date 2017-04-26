const request = require('request-promise');
const restify = require('restify');
const conf = require('./src/api/config');

const server = restify.createServer({ name : "v2ex-api" });

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.get('/hot', (req, res, next) => {
  request(conf.base + conf.hot)
    .then((data) => {
      res.send(JSON.parse(data));
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

server.get('/latest', (req, res, next) => {
  request(conf.base + conf.latest)
    .then((data) => {
      res.send(JSON.parse(data));
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

server.listen(conf.port, conf.path, function() {
  console.log('%s listening at %s ', server.name , server.url);
});

