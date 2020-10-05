import { Question, QuestionResponse } from '../../../types/Question';

export const Types = {
  GET_QUESTIONS_REQUEST: 'GET_QUESTIONS_REQUEST',
  GET_QUESTIONS_SUCCESS: 'GET_QUESTIONS_SUCCESS',
  GET_QUESTIONS_FAILURE: 'GET_QUESTIONS_FAILURE',
  DELETE_QUESTION_REQUEST: 'DELETE_QUESTION_REQUEST',
  EDIT_QUESTION_REQUEST: 'EDIT_QUESTION_REQUEST',
  SET_SELECTED_QUESTION: 'SET_SELECTED_QUESTION',
  UPDATE_SELECTED_QUESTION: 'UPDATE_SELECTED_QUESTION',
};

export const getQuestionsRequest = () => ({
  type: Types.GET_QUESTIONS_REQUEST,
  payload: {},
});

export const getQuestionsSuccess = (data: QuestionResponse) => ({
  type: Types.GET_QUESTIONS_SUCCESS,
  payload: data,
});

export const getQuestiondFailure = (data: QuestionResponse) => ({
  type: Types.GET_QUESTIONS_FAILURE,
  payload: data,
});

export const deleteQuestionRequest = (id: number) => ({
  type: Types.DELETE_QUESTION_REQUEST,
  payload: id,
});

export const setSelectedQuestion = (question: Question) => ({
  type: Types.SET_SELECTED_QUESTION,
  payload: question,
});

export const updateSelectedQuestion = (question: Question) => ({
  type: Types.UPDATE_SELECTED_QUESTION,
  payload: question,
});
