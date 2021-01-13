import React, { Component, Fragment } from "react";
import {
  Form,
  Radio,
  Button,
  Header,
  Divider,
  Card,
  Grid,
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/users";
import { Redirect } from "react-router-dom";

class PollQuestion extends Component {
  state = { value: "" };

  handleChange = (e, { value }) => this.setState({ value });
  handleSubmit = (e, { v }) => {
    //todo handle submit
    e.preventDefault();
    if (this.state.value !== "") {
      const answer = this.state.value;
      const { authedUser, question, handleSaveQuestionAnswer } = this.props;
      handleSaveQuestionAnswer(authedUser, question.id, answer);
    }
  };
  render() {
    const { question, author } = this.props;
    const { value } = this.state;
    if (this.state.value === null || undefined) {
      return <Redirect to="/questions/erorr" />;
    }
    return (
      <Fragment>
        <div className="container center question">
          <Form onSubmit={this.handleSubmit}>
            <Card centered fluid>
              <Card.Content>
                <Grid>
                  <Grid.Column>
                    <Header as="h5" textAlign="left">
                      {author} asks:
                    </Header>
                  </Grid.Column>
                </Grid>

                <Form.Field>
                  <Header as="h3">Would you rather</Header>
                  <Divider hidden />
                </Form.Field>
                <Form.Field>
                  <Radio
                    toggle
                    color="teal"
                    label={question.optionOne.text}
                    name="radioGroup"
                    value="optionOne"
                    checked={this.state.value === "optionOne"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    toggle
                    color="teal"
                    label={question.optionTwo.text}
                    name="radioGroup"
                    value="optionTwo"
                    checked={this.state.value === "optionTwo"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Grid.Column textAlign="center">
                    <Button
                      fluid
                      color="teal"
                      size="large"
                      disabled={value === ""}
                      content="Submit"
                      text="center"
                    />
                  </Grid.Column>
                </Form.Field>
              </Card.Content>
            </Card>
          </Form>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser: authedUser.authedUser,
  };
}
PollQuestion.propTypes = {
  authedUser: PropTypes.string.isRequired,
  handleSaveQuestionAnswer: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { handleSaveQuestionAnswer })(
  PollQuestion
);
