import React, { Component } from "react";
import {
  Dropdown,
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
} from "semantic-ui-react";
import logo from "../images/logo.jpg";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAuthedUser } from "./../actions/authedUser";

class Login extends Component {
  state = { authedUser: "" };

  //////////////////////////////// HandleOptionArray Function //////////////
  handleOptionArray = () => {
    const { userList } = this.props;

    return userList.map((user) => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatar },
    }));
  };
  //////////////////////////////// handleChange Function ////////////////////////////////
  handleChange = (e, data) => {
    const authedUser = data.value;
    this.setState(() => ({
      authedUser,
    }));
  };
  //////////////////////////////// handleSubmit Function ////////////////////////////////
  handleSubmit = (e) => {
    e.preventDefault();
    // dispatch function from the store => after connect()
    const { dispatch } = this.props;
    const authedUser = this.state;
    // send authedUser from component state
    dispatch(setAuthedUser(authedUser));
  };

  render() {
    const loggedIn = this.state.authedUser;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 600 }}>
          <Header as="h1" color="teal" textAlign="center" block attached="top">
            <Image src={logo} style={{ borderRadius: "50%" }} /> Welcome to
            Would You Rather App!
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Header as="h3" color="teal" textAlign="center">
                Sign in
              </Header>
              <Dropdown
                style={{ marginBottom: "20px" }}
                placeholder="Select User"
                fluid
                selection
                options={this.handleOptionArray()}
                required
                onChange={this.handleChange}
                scrolling
                value={this.state.authedUser}
              />

              <Button
                color="teal"
                content="Login"
                fluid
                size="large"
                icon="sign in"
                style={{ marginTop: "20px" }}
                disabled={loggedIn === ""}
              />
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

// function send state from store as props to the component
function mapStateToProps({ users }) {
  const userList = Object.keys(users).map((userID) => ({
    id: userID,
    name: users[userID].name,
    avatar: users[userID].avatarURL,
  }));
  return {
    userList,
  };
}
Login.propTypes = {
  userList: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};
// connect Login component together store
export default connect(mapStateToProps)(Login);
