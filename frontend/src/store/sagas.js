import { delay, all, fork, call, put, takeEvery } from "redux-saga/effects";
import { LOGIN_USER, SET_USER, REMOVE_USER } from "./actionTypes";
import { loginUser } from '../services/auth'

export function* loginUserSaga({ payload }) {
  try {
    let { data } = yield call(loginUser, payload)
    yield put({ type: SET_USER, payload: data });
  } catch(err) {
    yield put({ type: REMOVE_USER });
  }
}

export function* watchLoginUserSaga() {
  yield takeEvery(LOGIN_USER, loginUserSaga);
}

export default function* rootSaga() {
  yield all([
    watchLoginUserSaga()
  ])
}
