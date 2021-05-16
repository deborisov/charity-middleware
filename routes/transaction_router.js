'use strict';

var express = require('express');
var router = express.Router();
const {queryTransaction, createTransaction, queryHistory, queryTransactionsByApplicationId, queryTransactionsByDonorId} = require('../services/transaction');

function asyncWrapper (callback) {
  return function (req, res, next) {
    callback(req, res, next)
      .catch(next)
  }
}

router.get('/get/:id', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await queryTransaction(req, contract).catch(next);
    return res.json(result);
  }));

  router.get('/getHistory/:id', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await queryHistory(req, contract).catch(next);
    return res.json(result);
  }));

router.post('/set', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await createTransaction(req, contract).catch(next);
    return res.json(result);
  }));

  router.get('/getTransactionsByApplicationId/:id', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await queryTransactionsByApplicationId(req, contract).catch(next);
    return res.json(result);
  }));

  router.get('/getTransactionsByDonorId/:id', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await queryTransactionsByDonorId(req, contract).catch(next);
    return res.json(result);
  }));

module.exports = router;