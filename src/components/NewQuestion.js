import React, { Component } from "react";
import { Button, Form, Card, Divider } from "semantic-ui-react";
import { handleAddNewQuestion } from "../actions/questions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class NewQuestion extends Component {
  state = { optionOneText: "", optionTwoText: "", toHome: false };

  //handleChange function optionOneText
  handleChangeOne = (e) => {
    const optionOneText = e.target.value;
    this.setState(() => ({
      optionOneText,
    }));
  };

  //handleChange function optionTwoText
  handleChangeTwo = (e) => {
    const optionTwoText = e.target.value;
    this.setState(() => ({
      optionTwoText,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, authedUser } = this.props;
    //console.log(optionOneText, optionTwoText, authedUser);
    dispatch(handleAddNewQuestion(optionOneText, optionTwoText, authedUser));
    console.log(optionOneText, optionTwoText, authedUser);
    this.setState(() => ({
      optionOneText: "",
      optionTwoText: "",
      toHome: true,
    }));
  };
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;
    const disabled =
      this.state.optionOneText === "" || this.state.optionTwoText === ""
        ? true
        : false;
    if (toHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Complete the question: </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Card.Description as="h2">Would You Rather ...</Card.Description>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <input
                required
                placeholder="Enter Optin One Text Here"
                value={optionOneText}
                onChange={this.handleChangeOne}
              />
            </Form.Field>
            <Divider clearing horizontal content="Or" />
            <Form.Field>
              <input
                required
                placeholder="Enter Optin Two Text Here"
                value={optionTwoText}
                onChange={this.handleChangeTwo}
              />
            </Form.Field>
            <Button type="submit" fluid color="teal" disabled={disabled}>
              Submit
            </Button>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser: authedUser.authedUser,
  };
}
export default connect(mapStateToProps)(NewQuestion);
