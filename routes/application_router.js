'use strict';

var express = require('express');
var router = express.Router();
const {queryApplication, createApplication, queryHistory, updateApplication} = require('../services/application');

function asyncWrapper (callback) {
  return function (req, res, next) {
    callback(req, res, next)
      .catch(next)
  }
}

router.get('/get/:id', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await queryApplication(req, contract).catch(next);
    return res.json(result);
  }));

  router.get('/getHistory/:id', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await queryHistory(req, contract).catch(next);
    return res.json(result);
  }));

router.post('/set', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await createApplication(req, contract).catch(next);
    return res.json(result);
  }));

  router.put('/update', asyncWrapper(async function (req, res) {
    const contract = req.contract;
      let result = await updateApplication(req, contract);
      return res.json(result); 
    }));

module.exports = router;