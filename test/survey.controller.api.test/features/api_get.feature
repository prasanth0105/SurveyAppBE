Feature: Get survey details from server
  

  Scenario Outline: Listing all Surveys
    When I make a GET request to "/surveys"
    Then For <index> response property <prop> should be <value>

    Examples:
    | prop          | value        |index |
    | survey_name   | TEST         |0     |
    | survey_owner  | me           |0     | 
    | survey_name   | TESTtt       |1     |
    | survey_owner  | meeet        |1     |
    | survey_name   | name         |2     |
    | survey_owner  | owner        |2     |
  
  Scenario Outline: Lisiting single survey
    Given I know a survey with survey IDs <survey_id>
    When I make a GET request to "/survey" with that survey ID.
    Then The response property <prop> should be <value>

    Examples:
      | survey_id                | prop         | value |
      | 5e7ef0a1a0d6f849704b3612 | survey_owner | me    |
      | 5e808f0cb0313d36788abddb | survey_owner | meeet |
      | 5e81a0a3f854cf3bdc26d2db | survey_owner | owner |
      | 5e7ef0a1a0d6f849704b3612 | survey_name  | TEST  |
      | 5e808f0cb0313d36788abddb | survey_name  | TESTtt|
      | 5e81a0a3f854cf3bdc26d2db | survey_name  | name  |
  
  

  


  


