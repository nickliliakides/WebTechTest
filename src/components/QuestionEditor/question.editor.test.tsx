import React from 'react';
import ReactDOM from 'react-dom';
import QuestionEditor from './index';
import { Provider } from 'react-redux';
import { Dispatch, Store } from 'redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import { Question } from '../../types/Question';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import { mockQuestion } from '../Preview/misc';

const mockStore = configureStore([]);

interface IProps {
  dispatch: Dispatch;
  selectedQuestion: Question;
}

describe('Question editor component tests', () => {
  let store: Store;
  let mockDispatch: jest.Mock;
  let mockProps: IProps;
  let element: JSX.Element;

  beforeEach(() => {
    store = mockStore({
      quiz: {
        selectedQuestion: mockQuestion,
      },
    });
    mockDispatch = jest.fn();

    mockProps = {
      dispatch: mockDispatch,
      selectedQuestion: mockQuestion,
    };

    element = (
      <Provider store={store}>
        <QuestionEditor {...mockProps} />
      </Provider>
    );
  });

  it('Matches saved snapshot', () => {
    const tree = renderer.create(element).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(element, div);
  });

  it('Question header has text content "Question"', () => {
    const { getByTestId } = render(element);
    expect(getByTestId('header')).toHaveTextContent('Question');
  });

  it('Question field is empty when component is mounted', () => {
    const { getByTestId } = render(element);
    expect(getByTestId('question-field').querySelector('input')).toBeEmpty();
    setTimeout(() => {
      expect(
        getByTestId('question-field').querySelector('input')
      ).toBeDisabled();
    }, 400);
  });

  it('Checkbox is checked after component mounted', () => {
    const { getByTestId } = render(element);
    expect(getByTestId('checkbox').querySelector('input')).toBeChecked();
    setTimeout(() => {
      expect(getByTestId('checkbox').querySelector('input')).toBeDisabled();
    }, 400);
  });

  it('Answer delete icon is in the document', () => {
    const { getByTestId } = render(element);
    expect(getByTestId('delete-icon')).toBeInTheDocument();
  });

  it('Save button is visible and disabled after component mounted ', () => {
    const { getByTestId } = render(element);
    const button = getByTestId('save-button');
    expect(button).toBeVisible();
    setTimeout(() => {
      expect(button).toBeDisabled();
    }, 400);
  });

  it('Add answer button is visible and disabled after component mounted ', () => {
    const { getByTestId } = render(element);
    const button = getByTestId('add-button');
    expect(button).toBeVisible();
    setTimeout(() => {
      expect(button).toBeDisabled();
    }, 400);
  });

  it('Preview button is visible and disabled after component mounted ', () => {
    const { getByTestId } = render(element);
    const button = getByTestId('preview-button');
    expect(button).toBeVisible();
    setTimeout(() => {
      expect(button).toBeDisabled();
    }, 400);
  });
});
