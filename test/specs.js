const supertest = require('supertest');
const api = supertest('localhost:3000');

describe("Voting tests", function() {    
  it("put a voting", async function() {
    let payload = {
      id: 1,
      voting_name: 2,
      description: 1,
      initiator_id: 1,
      voting_status: 1,
      creation_time: 1,
      start_date: "comment",
      expiry_date: 1,
      comments_enabled: 1
    };
    let result = await api.post('/voting/set').send(payload)
    console.log(result.body)
  })

  it("query a voting", async function() {
    let key = '1';
    let result = await api.get('/voting/get/'+key)
    console.log(result.body)
  })

  it("get history", async function() {
    let key = '1';
    let result = await api.get('/voting/getHistory/'+key)
    console.log(result.body)
  })

})

describe("Vote tests", function() {
  it("checks if api is running", async function() {
    //this.skip();
    let result = await api.get('/')
    console.log(result.body)
  }) 
  
  it("put a choice", async function() {
    let payload = {
      id: 2,
      voting_id: 1,
      user_id: 2,
      choice: 1,
      comment: "comment"
    };
    let result = await api.post('/vote/set').send(payload)
    console.log(result.body)
  })

  it("query a choice", async function() {
    let key = '1';
    let result = await api.get('/vote/get/'+key)
    console.log(result.body)
  })

  it("get history", async function() {
    let key = '1';
    let result = await api.get('/vote/getHistory/'+key)
    console.log(result.body)
  })

  it("queryVoteByUserId", async function() {
    let key = '1';
    let result = await api.get('/vote/getVotesByUserId/'+key)
    console.log(result.body)
  })

  it("queryVoteByVotingId", async function() {
    let key = '1';
    let result = await api.get('/vote/getVotesByVotingId/'+key)
    console.log(result.body)
  })

  it("queryVoteByVotingUserPair", async function() {
    let voting = '1';
    let user = '1';
    let result = await api.get('/vote/getVotesByVotingUserPair/?voting_id='+voting+'&user_id='+user)
    console.log(result.body)
  })
})