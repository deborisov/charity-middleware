'use strict';

var express = require('express');
var router = express.Router();
const {queryVote, createVote, queryHistory, queryVoteByUserId, queryVoteByVotingId, queryVoteByVotingUserPair} = require('../services/vote');

function asyncWrapper (callback) {
  return function (req, res, next) {
    callback(req, res, next)
      .catch(next)
  }
}

router.get('/get/:id', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await queryVote(req, contract).catch(next);
    return res.json(result);
  }));

  router.get('/getHistory/:id', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await queryHistory(req, contract).catch(next);
    return res.json(result);
  }));

  router.get('/getVotesByUserId/:id', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await queryVoteByUserId(req, contract).catch(next);
    return res.json(result);
  }));

  router.get('/getVotesByVotingId/:id', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await queryVoteByVotingId(req, contract).catch(next);
    return res.json(result);
  }));

  router.get('/getVotesByVotingUserPair/', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await queryVoteByVotingUserPair(req, contract).catch(next);
    return res.json(result);
  }));

router.post('/set', asyncWrapper(async function (req, res, next) {
    const contract = req.contract;
    let result = await createVote(req, contract).catch(next);
    return res.json(result);
  }));

module.exports = router;