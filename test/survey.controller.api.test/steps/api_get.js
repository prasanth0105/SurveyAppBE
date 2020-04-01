/* eslint-disable new-cap */
/* eslint-disable func-names */
const {Given, When, Then} = require("cucumber");
const assert = require("assert");
const fetch = require("node-fetch");

const API = "http://localhost:8080";
let body; let id;

When("I make a GET request to {stringInDoubleQuotes}", function (endPoint) {
  return fetch(API + endPoint)
    .then((res) => res.json())
    .then(function (data) {
      body = data;
    });
});
Then(/^For ([^"]*) response property ([^"]*) should be ([^"]*)$/, function (
  index,
  prop,
  val
) {
  assert.equal(body[index][prop], val);
});

Given("I know a survey with survey IDs { string }", function (sId) {
  id = sId;
});
When(
  "I make a GET request to {stringInDoubleQuotes} with that survey ID.",
  function (endPoint) {
    return fetch(API + endPoint + "/" + id)
      .then((res) => res.json())
      .then(function (data) {
        body = data;
      });
  }
);
Then(/^The response property ([^"]*) should be ([^"]*)$/, function (prop, val) {
  assert.equal(body[0][prop], val);
});
