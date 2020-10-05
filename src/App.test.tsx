import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';
import renderer from 'react-test-renderer';
import { Store } from 'redux';
const mockStore = configureStore([]);

describe('App component tests', () => {
  let store: Store;
  let element: JSX.Element;

  beforeEach(() => {
    store = mockStore({});

    element = (
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it('Snapshot Testing', () => {
    const tree = renderer.create(element).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Expect to render App component', () => {
    const div = document.createElement('div');
    ReactDOM.render(element, div);
  });
});
