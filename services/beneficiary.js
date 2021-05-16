'use strict';

async function createBeneficiary(req, contract) {
  let id = req.body.id.toString();
  let crm_manager_id = req.body.crm_manager_id.toString();
  let additional_info = req.body.additional_info.toString();
  let last_update_time = req.body.last_update_time.toString();
  try {
    await contract.submitTransaction('createBeneficiary', id, crm_manager_id, additional_info, last_update_time);
    return {error: null, body: 'Transaction has been successfully submitted. Beneficiary created.'};
  }
  catch(error){
    let r = {error:'Failed to submit transaction: '+ error, body: null};
    return r;
  }
}

async function queryBeneficiary(req, contract) {
  let queryId = req.params.id;
  try {
    let result = await contract.evaluateTransaction('queryBeneficiary',queryId);
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

module.exports = {queryBeneficiary, createBeneficiary, queryHistory}