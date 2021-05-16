'use strict';

var express = require('express');
var router = express.Router();
const {queryFoundation, createFoundation, queryHistory} = require('../services/foundation');

function asyncWrapper (callback) {
  return function (req, res, next) {
    callback(req, res, next)
      .catch(next)
  }
}

router.get('/get/:id', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await queryFoundation(req, contract).catch(next);
    return res.json(result);
  }));

  router.get('/getHistory/:id', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await queryHistory(req, contract).catch(next);
    return res.json(result);
  }));

router.post('/set', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await createFoundation(req, contract).catch(next);
    return res.json(result);
  }));

module.exports = router;