import {
  RECEIVE_USERS,
  ADD_ANSWER_TO_USER,
  ADD_NEW_QUESTION_TO_USER,
} from "./../actions/actionTypes";

export default function users(state = {}, action) {
  const { authedUser, qid, answer, users, type, id, author } = action;
  switch (type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...users,
      };
    case ADD_ANSWER_TO_USER:
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        },
      };
    case ADD_NEW_QUESTION_TO_USER:
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id),
        },
      };

    default:
      return state;
  }
}
