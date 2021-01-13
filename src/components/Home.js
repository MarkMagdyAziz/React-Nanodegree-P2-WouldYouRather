import React from "react";
import { Divider, Tab } from "semantic-ui-react";
import PropTypes from "prop-types";
import Card from "./Card";
import { connect } from "react-redux";

const Home = (props) => {
  const { unansweredQuestions, answeredQuestions } = props;
  const panes = [
    {
      menuItem: "UnAnswered Questions",
      render: () => (
        <Tab.Pane attached={true}>
          <div className="center container question">
            {answeredQuestions.map((question) => (
              <Card
                key={question.id}
                questionId={question.id}
                unanswered={true}
              />
            ))}
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Answered Questions",
      render: () => (
        <Tab.Pane attached={true}>
          <div className="center container question">
            {unansweredQuestions.map((question) => (
              <Card
                key={question.id}
                questionId={question.id}
                unanswered={false}
              />
            ))}
          </div>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div>
      <Divider hidden />
      <Tab
        menu={{
          color: "teal",
          attached: true,
          tabular: true,
          fluid: true,
          widths: 4,
        }}
        panes={panes}
      />
    </div>
  );
};
function mapStateToProps({ authedUser, questions, users }) {
  //answeredIds
  // array of all answers questions
  const questionsAnsIds = Object.keys(users[authedUser.authedUser].answers);
  // filter answered questions,  then sort
  const answeredQuestions = Object.values(questions)
    .filter((question) => !questionsAnsIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  // filter unanswered questions, then sort
  const unansweredQuestions = Object.values(questions)
    .filter((question) => questionsAnsIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    answeredQuestions,
    unansweredQuestions,
  };
}
Home.propTypes = {
  answeredQuestions: PropTypes.array.isRequired,
  unansweredQuestions: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(Home);
