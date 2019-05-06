import { all, call, put, takeEvery } from "redux-saga/effects";
import { LOGIN_USER, AUTH_FAILURE, AUTH_SUCCESS, SIGNUP_USER } from "./actionTypes";
import { loginUser, signupUser } from '../services/auth'

export function* authenticateUser({ type, payload }) {
  let authCall = loginUser;
  if (type === SIGNUP_USER) authCall = signupUser;

  try {
    let { data } = yield call(authCall, payload)
    yield put({ type: AUTH_SUCCESS, payload: data });
  } catch(err) {
    let { data } = err.response
    yield put({ type: AUTH_FAILURE, payload: data});
  }
}

export function* watchAuthenticationSaga() {
  yield takeEvery([LOGIN_USER, SIGNUP_USER], authenticateUser);
}

export default function* rootSaga() {
  yield all([
    watchAuthenticationSaga()
  ])
}
