import { createStore, combineReducers, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas/rootSaga';

import * as sportwebservice from './actions/questionwebservice';

import { Question } from '../types/Question';

export interface QuizState {
  questions: Question[];
  selectedQuestion: Question | {};
}

const initialQuizState: QuizState = {
  questions: [],
  selectedQuestion: {},
};

function questionReduxReducer(
  state = initialQuizState,
  action: { type: string; payload: any }
) {
  const { type, payload } = action;

  switch (type) {
    case sportwebservice.Types.GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: [...payload.results, ...state.questions],
      };
    case sportwebservice.Types.DELETE_QUESTION_REQUEST:
      return {
        ...state,
        questions: [
          ...state.questions.filter((question) => question.id !== payload),
        ],
      };
    case sportwebservice.Types.SET_SELECTED_QUESTION:
      return {
        ...state,
        selectedQuestion: payload,
      };
    case sportwebservice.Types.UPDATE_SELECTED_QUESTION:
      return {
        questions: [
          payload,
          ...state.questions.filter((question) => question.id !== payload.id),
        ],
        selectedQuestion: {},
      };
    default:
      return state;
  }
}

const overallReducer = combineReducers({
  quiz: questionReduxReducer,
});

// Sage Middleware is used for fetching external resources.
const sagaMiddleware = createSagaMiddleware();

const store = createStore(overallReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export { store };
