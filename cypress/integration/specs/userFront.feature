@feature_user
Feature: User
  @new_user
  Scenario Outline: Create a new user
    Given that i am in the creation user page
    When create a new user with '<user>' and '<password>' and '<name>'
    Then the '<user>' should be visible on the list

    Examples:
      | user    | password     | name          |
      | Joaquin | bananinha123 | Joaquin Silva |

  @delete_user
  Scenario Outline: Delete a user
    Given that i am in the creation user page
    When i click on delete link at '<user>' row
    Then the '<user>' should not be visible on the list

    Examples:
      | user    | password     | name          |
      | Joaquin | bananinha123 | Joaquin Silva |
