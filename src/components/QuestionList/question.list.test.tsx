import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store, Dispatch } from 'redux';
import configureStore from 'redux-mock-store';
import QuestionList from './index';
import renderer from 'react-test-renderer';
import { Question } from '../../types/Question';

const mockStore = configureStore([]);

interface IProps {
  dispatch: Dispatch;
  questions: Question[];
}

describe('Question list tests', () => {
  let store: Store;
  let mockDispatch: jest.Mock;
  let mockProps: IProps;
  let element: JSX.Element;

  const mockQuestions = [
    {
      id: 1,
      category: 'test',
      type: 'test',
      difficulty: 'test',
      question: 'test',
      correct_answer: 'test',
      incorrect_answers: ['test', 'test', 'test'],
    },
    {
      id: 2,
      category: 'test',
      type: 'test',
      difficulty: 'test',
      question: 'test',
      correct_answer: 'test',
      incorrect_answers: ['test', 'test', 'test'],
    },
  ];

  beforeEach(() => {
    store = mockStore({
      quiz: {
        questions: mockQuestions,
      },
    });

    mockDispatch = jest.fn();

    mockProps = {
      dispatch: mockDispatch,
      questions: mockQuestions,
    };

    element = (
      <Provider store={store}>
        <QuestionList {...mockProps} />
      </Provider>
    );
  });

  it('Snapshot Testing', () => {
    const tree = renderer.create(element).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Expect to render Question list component', () => {
    const div = document.createElement('div');
    ReactDOM.render(element, div);
  });
});
