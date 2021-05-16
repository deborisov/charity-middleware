'use strict';

async function createVoting(req, contract) {
  let id = req.body.id.toString();
  let voting_name = req.body.voting_name.toString();
  let description = req.body.description.toString();
  let initiator_id = req.body.initiator_id.toString();
  let creation_time = req.body.creation_time.toString();
  let start_date = req.body.start_date.toString();
  let expiry_date = req.body.expiry_date.toString();
  let comments_enabled = req.body.comments_enabled.toString();
  try {
    await contract.submitTransaction('createVoteEntity', id, voting_name, description, initiator_id,
     creation_time, start_date, expiry_date, comments_enabled);
    return {error: null, body: 'Transaction has been successfully submitted. Voting created.'};
  }
  catch(error){
    let r = {error:'Failed to submit transaction: '+ error, body: null};
    return r;
  }
}

async function queryVoting(req, contract) {
  let queryId = req.params.id;
  try {
    let result = await contract.evaluateTransaction('queryVoteEntity',queryId);
    return {error: null, body: result.toString()};
  } catch(err){
    let r = {error:'Failed to evaluate transaction: '+ err, body: null};
    return r; 
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

async function updateVotingStatus(req, contract){
  console.log("in update");
  let id = req.body.id;
  let voting_status = req.body.voting_status;
  let approval_time = req.body.approval_time;
  try {
    let result = await contract.submitTransaction('changeStatus',id, voting_status, approval_time);
    return {error: null, body: result.toString()};
  } catch(err){
    return {error:'Failed to evaluate transaction: '+ err, body: null};
  }
}

async function updateVoting(req, contract){
  let id = req.body.id.toString();
  let voting_name = req.body.voting_name.toString();
  let description = req.body.description.toString();
  let start_date = req.body.start_date.toString();
  let expiry_date = req.body.expiry_date.toString();
  let comments_enabled = req.body.comments_enabled.toString();
  try {
    let result = await contract.submitTransaction('updateVoteEntity',id, voting_name, description,
    start_date, expiry_date, comments_enabled);
    return {error: null, body: result.toString()};
  } catch(err){
    return {error:'Failed to evaluate transaction: '+ err, body: null};
  }
}

module.exports = {queryVoting, createVoting, queryHistory, updateVotingStatus, updateVoting}