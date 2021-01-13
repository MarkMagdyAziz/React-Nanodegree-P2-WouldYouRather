import { showLoading, hideLoading } from "react-redux-loading";
import {
  RECEIVE_QUESTIONS,
  ADD_ANSWER_TO_QUESTION,
  ADD_NEW_QUESTION,
} from "./actionTypes";
import { saveQuestion } from "../utils/api";
import { addQuestionToUser } from "./users";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
export function addAnswerToQuestion(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authedUser,
    qid,
    answer,
  };
}
function addNewQuestion(question) {
  return {
    type: ADD_NEW_QUESTION,
    question,
  };
}

export function handleAddNewQuestion(optionOneText, optionTwoText, author) {
  return function (dispatch) {
    //const author = getState().authedUser;
    dispatch(showLoading());
    return saveQuestion({ optionOneText, optionTwoText, author })
      .then((question) => {
        dispatch(addNewQuestion(question));
        dispatch(addQuestionToUser(question));
      })
      .then(() => dispatch(hideLoading()));
  };
}
