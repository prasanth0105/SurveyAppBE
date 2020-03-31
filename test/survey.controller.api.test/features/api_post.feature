Feature: POST to server

   
Scenario: Making a simple POST request
    When I make a post request to "/posts"
    Then The response property "id" should be 2