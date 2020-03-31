const { Given, When, Then, setDefaultTimeout } = require("cucumber");
const assert = require("assert");
const fetch = require("node-fetch");

let API = "http://localhost:8080";

When("I make a GET request to {stringInDoubleQuotes}", function (endPoint) {
    return fetch(API + endPoint)
        .then((res) => res.json())
        .then(function (body) {
            this.body = body;
        });
});
Then(/^For ([^"]*) response property ([^"]*) should be ([^"]*)$/, function (
    index,
    prop,
    val
) {
    assert.equal(body[index][prop], val);
});

Given("I know a survey with survey IDs { string }", function (id) {
    this.id = id;
});
When(
    "I make a GET request to {stringInDoubleQuotes} with that survey ID.",
    function (endPoint) {
        return fetch(API + endPoint + "/" + this.id)
            .then((res) => res.json())
            .then(function (body) {
                this.body = body;
            });
    }
);
Then(/^The response property ([^"]*) should be ([^"]*)$/, function (prop, val) {
    assert.equal(body[0][prop], val);
});
