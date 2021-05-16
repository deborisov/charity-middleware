  const express = require('express');
  let connectToContract = require('./connect');
  let config = require('./config.json');
  let gateway;
  let network;
  var beneficiary = require('./routes/beneficiary_router');
  var foundation = require('./routes/foundation_router');
  var application = require('./routes/application_router');
  var transaction = require('./routes/transaction_router')
  
  const app = express();
  app.use(express.json());      
  app.use(express.urlencoded());  

  connectToContract(config).then(function(connection){
    gateway = connection.gateway;
    network = connection.network;
    console.log('- connection to fabric network ready')

    app.get('/', function (req, res) {
      res.json({msg:'hello fabric api'});
    })

    app.use('/foundation', async function(req, res, next) {
      req.contract = await network.getContract(config.foundationCC);
      next();
    }, foundation);

    app.use('/beneficiary', async function(req, res, next) {
      req.contract = await network.getContract(config.beneficiaryCC);
      next();
    }, beneficiary);

    app.use('/application', async function(req, res, next) {
      req.contract = await network.getContract(config.applicationCC);
      next();
    }, application);

    app.use('/transaction', async function(req, res, next) {
      req.contract = await network.getContract(config.transactionCC);
      next();
    }, transaction);

    app.use((error, req, res, next) => {
      return res.status(500).json({ error: error.toString(), body: null});
    });

    app.listen(3000, function(){	
      console.log('- api server started listening on port 3000!');
    });	
  })


process.on('SIGINT', async function  () {
  console.log("Caught interrupt signal -  start disconnect from the gateway");
    await gateway.disconnect();
    process.exit();
});