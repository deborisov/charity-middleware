'use strict';

async function createTransaction(req, contract) {
  let id = req.body.id.toString();
  let application_id = req.body.application_id.toString();
  let donor_id = req.body.donor_id.toString();
  let value = req.body.value.toString();
  let time = req.body.time.toString();
  try {
    await contract.submitTransaction('createTransaction', id, application_id, donor_id, value,
    time);
    return {error: null, body: 'Transaction has been successfully submitted. Transaction created.'};
  }
  catch(error){
    let r = {error:'Failed to submit transaction: '+ error, body: null};
    return r;
  }
}

async function queryTransaction(req, contract) {
  let queryId = req.params.id;
  try {
    let result = await contract.evaluateTransaction('queryTransaction',queryId);
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

async function queryTransactionsByApplicationId(req, contract){
    let queryId = req.params.id;
    try {
      let result = await contract.evaluateTransaction('queryTransactionsByApplicationId',queryId);
      return {error: null, body: result.toString()};
    } catch(err){
      return {error:'Failed to evaluate transaction: '+ err, body: null};
    }
}

async function queryTransactionsByDonorId(req, contract){
    let queryId = req.params.id;
    try {
      let result = await contract.evaluateTransaction('queryTransactionsByDonorId',queryId);
      return {error: null, body: result.toString()};
    } catch(err){
      return {error:'Failed to evaluate transaction: '+ err, body: null};
    }
}


module.exports = {queryTransaction, createTransaction, queryHistory, queryTransactionsByApplicationId, queryTransactionsByDonorId}