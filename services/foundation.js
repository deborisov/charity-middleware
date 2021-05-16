'use strict';

async function createFoundation(req, contract) {
  let id = req.body.id.toString();
  let foundation_name = req.body.foundation_name.toString();
  let description = req.body.description.toString();
  let is_active = req.body.is_active.toString();
  let registration_time = req.body.registration_time.toString();
  let last_update_time = req.body.last_update_time.toString();
  try {
    await contract.submitTransaction('createFoundation', id, foundation_name, description, is_active,
    registration_time, last_update_time);
    return {error: null, body: 'Transaction has been successfully submitted. Foundation created.'};
  }
  catch(error){
    let r = {error:'Failed to submit transaction: '+ error, body: null};
    return r;
  }
}

async function queryFoundation(req, contract) {
  let queryId = req.params.id;
  try {
    let result = await contract.evaluateTransaction('queryFoundation',queryId);
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

module.exports = {queryFoundation, createFoundation, queryHistory}