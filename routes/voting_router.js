'use strict';

var express = require('express');
var router = express.Router();
const {queryVoting, createVoting, queryHistory, updateVotingStatus, updateVoting} = require('../services/voting');

function asyncWrapper (callback) {
  return function (req, res, next) {
    callback(req, res, next)
      .catch(next)
  }
}

router.get('/get/:id', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await queryVoting(req, contract).catch(next);
    return res.json(result);
  }));

  router.get('/getHistory/:id', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await queryHistory(req, contract).catch(next);
    return res.json(result);
  }));

router.post('/set', asyncWrapper(async function (req, res) {
    const contract = req.contract;
    let result = await createVoting(req, contract);
    return res.json(result);  
  }));

router.put('/updateVotingStatus', asyncWrapper(async function (req, res) {
  const contract = req.contract;
    let result = await updateVotingStatus(req, contract);
    return res.json(result); 
  }));

  router.put('/updateVoting', asyncWrapper(async function (req, res) {
    const contract = req.contract;
      let result = await updateVoting(req, contract);
      return res.json(result); 
    }));

module.exports  = router;