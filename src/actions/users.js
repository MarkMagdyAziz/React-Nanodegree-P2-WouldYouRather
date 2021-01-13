import { addAnswerToQuestion } from "./questions";
import { saveQuestionAnswer } from "./../utils/api";
import {
  RECEIVE_USERS,
  ADD_ANSWER_TO_USER,
  ADD_NEW_QUESTION_TO_USER,
} from "./actionTypes";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}
function addAnswerToUser(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    authedUser,
    qid,
    answer,
  };
}
export function handleSaveQuestionAnswer(authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(addAnswerToUser(authedUser, qid, answer));
    dispatch(addAnswerToQuestion(authedUser, qid, answer));
    return saveQuestionAnswer(authedUser, qid, answer).catch((e) => {
      console.warn("Error in handleSaveQuestionAnswer:", e);
      alert("The was an error handleSaveQuestionAnswer. Try again.");
    });
  };
}
export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_NEW_QUESTION_TO_USER,
    id,
    author,
  };
}
