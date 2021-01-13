import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Progress, Button, Header, Card, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";

const PollResult = (props) => {
  const handleClick = () => {
    props.history.push("/");
  };
  {
    const { author, question } = props;
    const optionOneArray = question.optionOne.votes,
      optionOneVotes = optionOneArray.length,
      optionTwoArray = question.optionTwo.votes,
      optionTwoVotes = optionTwoArray.length,
      totalVotes = optionOneVotes + optionTwoVotes;

    return (
      <Fragment>
        <Grid.Row>
          <Header textAlign="left" as="h3">
            Asked by {author}
          </Header>
        </Grid.Row>
        <br />
        <div className="container">
          <Header as="h2" textAlign="left">
            Results:
          </Header>
          <Card fluid>
            <Card.Content>
              <Card.Header>
                Would You Rather {question.optionOne.text}?
              </Card.Header>
              <Progress
                value={optionOneVotes}
                total={totalVotes}
                progress="ratio"
                inverted
                color="green"
              />
              <Card.Description>
                <strong>
                  {optionOneVotes} out of {totalVotes} votes
                </strong>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card fluid>
            <Card.Content>
              <Card.Header>
                Would You Rather {question.optionTwo.text}?
              </Card.Header>
              <Progress
                value={optionTwoVotes}
                total={totalVotes}
                progress="ratio"
                inverted
                color="red"
              />
              <Card.Description>
                <strong>
                  {optionTwoVotes} out of {totalVotes} votes
                </strong>
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
        <br />
        <Button
          content=" Return Homepage"
          floated="right"
          color="teal"
          compact
          onClick={handleClick}
          icon="home"
        />
      </Fragment>
    );
  }
};

PollResult.propTypes = {
  question: PropTypes.object.isRequired,
  author: PropTypes.string.isRequired,
};
export default withRouter(PollResult);
