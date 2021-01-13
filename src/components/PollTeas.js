import React, { Component } from "react";
import { connect } from "react-redux";
import { Divider } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { Header, Button, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";

class PollTeas extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    unanswered: PropTypes.bool.isRequired,
  };
  state = {
    viewPoll: false,
  };
  handleClick = () => {
    this.setState((prevState) => ({
      viewPoll: !prevState.viewPoll,
    }));
  };
  render() {
    const { question, unanswered, author } = this.props;
    const btnContent = unanswered === true ? "View Poll" : "Results";

    if (this.state.viewPoll === true) {
      return <Redirect push to={`/questions/${question.id}`} />;
    }
    return (
      <div>
        <Header as="h5" textAlign="left">
          {author} asks:
        </Header>
        <Grid>
          <Grid.Column textAlign="center">
            <Header.Subheader> Would you rather</Header.Subheader>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column textAlign="center">
            <h4>
              <b>.. {question.optionOne.text} ..</b>
            </h4>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <div className="ui two buttons fluid">
          <Button
            animated
            color="teal"
            size="tiny"
            fluid
            basic
            onClick={this.handleClick}
            content={btnContent}
          />
        </div>
      </div>
    );
  }
}
PollTeas.propTypes = {
  question: PropTypes.object.isRequired,
  unanswered: PropTypes.bool.isRequired,
};
export default connect()(PollTeas);
