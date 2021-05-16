'use strict';

async function createApplication(req, contract) {
  let id = req.body.id.toString();
  let description = req.body.description.toString();
  let initiator_id = req.body.initiator_id.toString();
  let application_status = req.body.application_status.toString();
  let additional_info = req.body.additional_info.toString();
  let creation_time = req.body.creation_time.toString();
  let approval_time = req.body.approval_time.toString();
  let crm_manager_id = req.body.crm_manager_id.toString();
  let foundation_id = req.body.foundation_id.toString();
  let fund_manager_id = req.body.fund_manager_id.toString();
  let voting_result = req.body.voting_result.toString();
  let voting_end_time = req.body.voting_end_time.toString();
  let gathering_end_expected = req.body.gathering_end_expected.toString();
  let gathering_start_real = req.body.gathering_start_real.toString();
  let gathering_end_real = req.body.gathering_end_real.toString();
  let expect_to_gather = req.body.expect_to_gather.toString();
  let last_update_time = req.body.last_update_time.toString();
  try {
    await contract.submitTransaction('createApplication', id, description, initiator_id, application_status,
    additional_info, creation_time, approval_time, crm_manager_id, foundation_id, fund_manager_id, voting_result,
    voting_end_time, gathering_end_expected, gathering_start_real, gathering_end_real, expect_to_gather, last_update_time);
    return {error: null, body: 'Transaction has been successfully submitted. Application created.'};
  }
  catch(error){
    let r = {error:'Failed to submit transaction: '+ error, body: null};
    return r;
  }
}

async function queryApplication(req, contract) {
  let queryId = req.params.id;
  try {
    let result = await contract.evaluateTransaction('queryApplication',queryId);
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

async function updateApplication(req, contract) {
    let id = req.body.id.toString();
    let description = req.body.description.toString();
    let initiator_id = req.body.initiator_id.toString();
    let application_status = req.body.application_status.toString();
    let additional_info = req.body.additional_info.toString();
    let approval_time = req.body.approval_time.toString();
    let foundation_id = req.body.foundation_id.toString();
    let fund_manager_id = req.body.fund_manager_id.toString();
    let voting_result = req.body.voting_result.toString();
    let voting_end_time = req.body.voting_end_time.toString();
    let gathering_end_expected = req.body.gathering_end_expected.toString();
    let gathering_start_real = req.body.gathering_start_real.toString();
    let gathering_end_real = req.body.gathering_end_real.toString();
    let expect_to_gather = req.body.expect_to_gather.toString();
    let last_update_time = req.body.last_update_time.toString();
    try {
      await contract.submitTransaction('updateApplication', id, description, initiator_id, application_status,
      additional_info, approval_time, foundation_id, fund_manager_id, voting_result,
      voting_end_time, gathering_end_expected, gathering_start_real, gathering_end_real, expect_to_gather, last_update_time);
      return {error: null, body: 'Transaction has been successfully submitted. Application updated.'};
    }
    catch(error){
      let r = {error:'Failed to submit transaction: '+ error, body: null};
      return r;
    }
  }

module.exports = {queryApplication, createApplication, queryHistory, updateApplication}