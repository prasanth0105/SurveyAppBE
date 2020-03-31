/* eslint-disable quotes */
const { Given, When, Then, setDefaultTimeout } = require("cucumber");
const assert = require("assert");
const fetch = require("node-fetch");

let API = "http://localhost:3000";
let postData = {
    id: 2,
    title: "test-server",
    author: "typicode",
};

When("I make a post request to {stringInDoubleQuotes}", function (endPoint) {
    return fetch(API + endPoint, {
        method: "post",
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => res.json())
        .then(function (body) {
            this.body = body;
        });
});
Then(
    'The response property "{ stringInDoubleQuotes1 }" should be { int }',
    function (prop, val) {
        assert.equal(body[prop], val);
    }
);
