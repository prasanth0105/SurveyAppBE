/* eslint-disable new-cap */
/* eslint-disable func-names */
const {When, Then} = require("cucumber");
const assert = require("assert");
const fetch = require("node-fetch");
const API = "http://localhost:8080/surveys";
let body;
let surId; let qId;

When("I create a new survey with details:", function (table) {
  const data = table.rowsHash();
  return fetch(API, {
    method: "post",
    body: JSON.stringify(data),
    headers: {"Content-Type": "application/json"}
  })
    .then((res) => res.json())
    .then(function (data) {
      body = data;
    });
});
Then(/^New Survey with response property ([^"]*) should be ([^"]*)$/, function (prop, val) {
  surId = body._id;
  assert.equal(body[prop], val);
});

When("I create a new question with details:", function (table) {
  const data = table.rowsHash();
  data.survey_id = surId;
  return fetch(API + "/" + surId, {
    method: "post",
    body: JSON.stringify(data),
    headers: {"Content-Type": "application/json"}
  })
    .then((res) => res.json())
    .then(function (data) {
      body = data;
    });
});
Then(/^New Question with response property ([^"]*) should be ([^"]*)$/, function (prop, val) {
  qId = body.question_set[0];
  assert.equal(body[prop], val);
});

When("I create a new answer with details:", function (table) {
  const data = table.rowsHash();
  data.survey_id = surId;
  data.question_id = qId;
  return fetch(API + "/" + surId + "/" + qId, {
    method: "post",
    body: JSON.stringify(data),
    headers: {"Content-Type": "application/json"}
  })
    .then((res) => res.json())
    .then(function (data) {
      body = data;
    });
});
Then(/^New Answer with response property ([^"]*) should be ([^"]*)$/, function (prop, val) {
  assert.equal(body[prop], val);
});
