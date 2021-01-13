import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Login from "./Login";
import Nav from "./Nav";
import Home from "./Home";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import Card from "./Card";
import Error404 from "./Error404";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

class App extends Component {
  componentDidMount() {
    /*
     Fire middleware to initialize data
     invoke our handleInitialData when our application loads.
     dispatch() come from the store, after connected() it to my component
     any where will UI listen to store and logger middleware */
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Fragment>
        <LoadingBar />
        <Router>
          <div className="container">
            {this.props.logged === true ? (
              <Route
                render={() => (
                  <div>
                    <Login />
                  </div>
                )}
              />
            ) : (
              <Fragment>
                <Nav />
                <Container textAlign="center">
                  <Route path="/" exact component={Home} />
                  <Route path="/new" component={NewQuestion} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route path="/questions/:questionId" component={Card} />
                  <Route path="/questions/erorr" component={Error404} />
                </Container>
              </Fragment>
            )}
          </div>
        </Router>
      </Fragment>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    logged: authedUser === null ? true : false,
  };
}
// connect App compnent to the store , to get access to dispatch
// connect() function upgrades a component to a container => read state from the store and dispatch actions
export default connect(mapStateToProps)(App);
