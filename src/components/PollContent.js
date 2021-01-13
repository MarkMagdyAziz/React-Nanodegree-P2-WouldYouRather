import React from "react";
import PropTypes from "prop-types";
import PollQuestion from "./PollQuestion";
import PollResult from "./PollResult";
import PollTeas from "./PollTeas";
import { pollTypes } from "./Card";
// container for three children components belongs to Card
//is being set based on the parameters received or the what the data dictates.
//If we don’t receive a questionId display the PollTeaser as default
const PollContent = (props) => {
  const { pollType, question, unanswered, author } = props;
  switch (pollType) {
    case pollTypes.POLL_TEASER:
      return (
        <PollTeas question={question} unanswered={unanswered} author={author} />
      );
    case pollTypes.POLL_QUESTION:
      return <PollQuestion question={question} author={author} />;
    case pollTypes.POLL_RESULT:
      return <PollResult question={question} author={author} />;
    default:
      return null;
  }
};
PollContent.propTypes = {
  pollType: PropTypes.string.isRequired,
  question: PropTypes.object.isRequired,
  unanswered: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
export default PollContent;
