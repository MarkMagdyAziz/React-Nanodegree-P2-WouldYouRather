import React from "react";
import { Card as SemanticCard, Image, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PollContent from "./PollContent";
import { Redirect } from "react-router-dom";

export const pollTypes = {
  POLL_TEASER: "POLL_TEASER",
  POLL_QUESTION: "POLL_QUESTION",
  POLL_RESULT: "POLL_RESULT",
};

const Card = (props) => {
  const { author, question, pollType, unanswered = "" } = props;
  if (author === undefined || null) return <Redirect to="/questions/erorr" />;
  return (
    <div className="center">
      <SemanticCard centered color="teal" fluid>
        <SemanticCard.Content textAlign="center">
          <Image
            alt={`Avatar of ${author.name}`}
            circular
            floated="right"
            size="tiny"
            src={author.avatarURL}
          />
          <PollContent
            pollType={pollType}
            question={question}
            unanswered={unanswered}
            author={author.name}
          />
        </SemanticCard.Content>
      </SemanticCard>
      <Divider hidden />
    </div>
  );
};

function mapStateToProps(
  { authedUser, users, questions },
  { match, questionId }
) {
  // question, pollType;
  let question, pollType, author;
  if (questionId !== undefined) {
    question = questions[questionId];
    author = users[question.author];
    pollType = pollTypes.POLL_TEASER;
  } else {
    const { questionId } = match.params;
    question = questions[questionId];

    const user = users[authedUser.authedUser];

    if (question === undefined || null) {
      return <Redirect to="/questions/erorr" />;
    } else {
      author = users[(question, author)];
      pollType = pollTypes.POLL_QUESTION;
      if (Object.keys(user.answers).includes(question.id) === true) {
        pollType = pollTypes.POLL_RESULT;
      }
    }
  }
  author = users[question.author];
  return {
    author,
    pollType,
    question,
  };
}

Card.propTypes = {
  questionId: PropTypes.string,
  unanswered: PropTypes.bool,
  question: PropTypes.object,
  author: PropTypes.object,
  pollType: PropTypes.string,
};
export default connect(mapStateToProps)(Card);
