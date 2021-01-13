import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "../styles/Nav.css";
import { connect } from "react-redux";
import { Menu, Button } from "semantic-ui-react";
import { setAuthedUser } from "../actions/authedUser";
import PropTypes from "prop-types";

class Nav extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogout = (e) => {
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(setAuthedUser(null));
    history.push("/");
  };
  render() {
    const { authedUser, users } = this.props;
    const avatar = authedUser ? users[authedUser].avatarURL : null;
    const { activeItem } = this.state;
    return (
      <Menu secondary color="teal">
        <Menu.Item
          as={NavLink}
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
          to="/"
          exact
        />
        <Menu.Item
          as={NavLink}
          to="/new"
          name="New Question"
          active={activeItem === "new"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink}
          to="/leaderboard"
          name="Leader Board"
          active={activeItem === "leaderboard"}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item icon>
            <span style={{ marginRight: "6px", fontSize: "16px" }}>
              Hello, {users[authedUser].name}
            </span>
            <img
              icon="labeled"
              className="ui avatar image "
              src={avatar}
              alt={`Avatar of ${users[authedUser].name}`}
            />
          </Menu.Item>
          <Menu.Item>
            <Button
              basic
              color="teal"
              onClick={this.handleLogout}
              content="Sign out"
              icon="sign out"
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    users,
    authedUser: authedUser.authedUser,
  };
}
Nav.propTypes = {
  users: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  authedUser: PropTypes.string.isRequired,
};
export default withRouter(connect(mapStateToProps)(Nav));
