'use strict';
async function createVote(req, contract) {
  let id = req.body.id.toString();
  let voting_id = req.body.voting_id.toString();
  let user_id = req.body.user_id.toString();
  let choice = req.body.choice.toString();
  let comment = req.body.comment.toString();
  try {
    await contract.submitTransaction('createVoteChoice', id, voting_id, user_id, choice, comment);
    let r = 'Transaction has been successfully submitted. Choice created.';
    return {error: null, body: r};
  }
  catch(error){
    let r = {error:'Failed to submit transaction: ' + error, body: null};
    return r;
  }
}

async function queryVote(req, contract) {
  let queryId = req.params.id;
  try {
    let result = await contract.evaluateTransaction('queryVoteChoice',queryId);
    return {error: null, body: result.toString()};
  } catch(err){
    return {error:'Failed to evaluate transaction: '+ err, body: null};
  }
}

async function queryHistory(req, contract){
  let queryId = req.params.id;
  try {
    let result = await contract.evaluateTransaction('getHistory',queryId);
    return {error: null, body: result.toString()};
  } catch(err){
    return {error:'Failed to evaluate transaction: '+ err, body: null};
  }
}

async function queryVoteByUserId(req, contract){
  let queryId = req.params.id;
  try {
    let result = await contract.evaluateTransaction('queryVoteByUserId',queryId);
    return {error: null, body: result.toString()};
  } catch(err){
    return {error:'Failed to evaluate transaction: '+ err, body: null};
  }
}

async function queryVoteByVotingId(req, contract){
  let queryId = req.params.id;
  try {
    let result = await contract.evaluateTransaction('queryVoteByVotingId',queryId);
    return {error: null, body: result.toString()};
  } catch(err){
    return {error:'Failed to evaluate transaction: '+ err, body: null};
  }
}

async function queryVoteByVotingUserPair(req, contract){
  let user_id = req.query.user_id;
  let voting_id = req.query.voting_id;
  try {
    let result = await contract.evaluateTransaction('queryVoteByVotingUserPair', user_id, voting_id);
    return {error: null, body: result.toString()};
  } catch(err){
    return {error:'Failed to evaluate transaction: '+ err, body: null};
  }
}

  module.exports = {queryVote, createVote, queryHistory, queryVoteByVotingId, queryVoteByUserId, queryVoteByVotingUserPair}