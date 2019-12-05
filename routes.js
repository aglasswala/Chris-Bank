const path = require('path')

module.exports = (router) => {
  router.get('/', (req, res) => res.status(200).send({ "yes": "oh yeah" }))
};
