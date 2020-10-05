import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/appReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid } from '@material-ui/core';
import QuestionsList from './components/QuestionList';
import QuestionEditor from './components/QuestionEditor';

const App = () => {
  return (
    <Provider store={store}>
      <div style={{ padding: 25 }} className='App'>
        <ToastContainer
          position='bottom-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Grid container spacing={1}>
          <QuestionEditor />
          <QuestionsList />
        </Grid>
      </div>
    </Provider>
  );
};

export default App;
