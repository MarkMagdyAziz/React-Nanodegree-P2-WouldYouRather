import {
  RECEIVE_QUESTIONS,
  ADD_ANSWER_TO_QUESTION,
  ADD_NEW_QUESTION,
} from "./../actions/actionTypes";

export default function users(state = {}, action) {
  const { type, authedUser, qid, answer, questions, question } = action;
  switch (type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...questions,
      };
    case ADD_ANSWER_TO_QUESTION:
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat(authedUser),
          },
        },
      };
    case ADD_NEW_QUESTION:
      return {
        ...state,
        [question.id]: question,
      };
    default:
      return state;
  }
}
