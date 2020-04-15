Feature: Creating new survey,question and answer

   
    Scenario Outline: Adding new Survey
        When I create a new survey with details:
            | survey_owner  |   testOwner   |
            | survey_name   |   testName    | 
        Then New Survey with response property <prop> should be <value>

        Examples:
            | prop         | value     |
            | survey_owner | testOwner |

    Scenario Outline: Adding new Question
        When I create a new question with details:
            | survey_id  |   0               |
            | question   |   testQuestion    | 
        Then New Question with response property <prop> should be <value>

        Examples:
            | prop         | value        |
            | survey_owner | testOwner    |

    Scenario Outline: Adding new Answer
        When I create a new answer with details:
            | survey_id     |   0           |
            | question_id   |   1           |
            | option_label  |   testLabel   |
            | option_type   |   testType    |
        Then New Answer with response property <prop> should be <value>

        Examples:
            | prop     | value        |
            | question | testQuestion |
        