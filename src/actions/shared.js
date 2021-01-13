import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading";

export function handleInitialData() {
  // this will use Redux Thunk pattern to make an async request

  return (dispatch) => {
    dispatch(showLoading());
    // getInitialData will pass an object that has a user's property and questions property
    return getInitialData().then(({ users, questions }) => {
      // add users and questions to the state of our Redux store
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      // if i send AUTHED_ID will render Home Page
      // if send NULL value will render Login Page
      dispatch(setAuthedUser(null));
      dispatch(hideLoading());
    });
  };
}
