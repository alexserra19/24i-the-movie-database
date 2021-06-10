import { all } from 'redux-saga/effects'
import mediaSaga from './mediaSaga';


export default function* rootSaga() {
    yield all([
        ...mediaSaga,
    ])
}