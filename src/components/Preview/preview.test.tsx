import React from 'react';
import ReactDOM from 'react-dom';
import Preview from './index';
import renderer from 'react-test-renderer';
import { Question } from '../../types/Question';
import { mockQuestion } from './misc';

interface IProps {
  show: boolean;
  question: Question;
}

describe('Preview component tests', () => {
  let mockProps: IProps;
  let element: JSX.Element;

  beforeEach(() => {});

  mockProps = {
    show: true,
    question: mockQuestion,
  };

  element = <Preview {...mockProps} />;

  it('Snapshot Testing', () => {
    const tree = renderer.create(<Preview {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Expect to render preview component', () => {
    const div = document.createElement('div');
    ReactDOM.render(element, div);
  });
});
