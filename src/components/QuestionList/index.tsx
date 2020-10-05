import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  deleteQuestionRequest,
  getQuestionsRequest,
  setSelectedQuestion,
} from '../../redux/actions/questionwebservice';
import Fade from 'react-reveal/Fade';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Question } from '../../types/Question';
import { Dispatch } from 'redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    top_container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      display: 'flex',
      opacity: '.85',
      justifyContent: 'space-evenly',
    },
    questionDetails: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexGrow: 1,
    },
    buttons: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    button: {
      width: 100,
    },
    edit_btn: {
      backgroundColor: 'green',
      '&:hover': {
        backgroundColor: 'green',
        opacity: 0.8,
      },
    },
    delete_btn: {
      backgroundColor: 'red',
      marginTop: 10,
      '&:hover': {
        backgroundColor: 'red',
        opacity: 0.8,
      },
    },
    loader: {
      position: 'absolute',
      top: '50%',
      left: '75%',
      transform: 'translate(-50%, -50%)',
    },
  })
);

interface IProps {
  dispatch: Dispatch;
  questions?: Question[] | null;
}

const QuestionListView: React.FC<IProps> = ({
  dispatch,
  questions,
}): JSX.Element => {
  const classes = useStyles();

  useEffect(() => {
    dispatch(getQuestionsRequest());
  }, [dispatch]);

  const getMoreQuestions = (): void => {
    dispatch(getQuestionsRequest());
  };

  const deleteQuestion = (index: number): void => {
    dispatch(deleteQuestionRequest(index));
  };

  const editQuestion = (question: Question): void => {
    dispatch(setSelectedQuestion(question));
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  return questions && questions.length === 0 ? (
    <CircularProgress className={classes.loader} thickness={6} size={80} />
  ) : (
    <Grid item={true} md={5}>
      <div className={classes.top_container}>
        <h1>Questions</h1>
        <Button
          style={{ marginLeft: 12 }}
          variant='contained'
          color='primary'
          onClick={() => getMoreQuestions()}
        >
          Fetch More Questions
        </Button>
      </div>
      <Grid container spacing={3}>
        {questions &&
          questions.map((question: Question, index: number) => (
            <Grid item xs={12} key={index}>
              <Fade right duration={600} delay={70 * index}>
                <Paper className={classes.paper}>
                  <Box className={classes.questionDetails}>
                    <Box>{question.question}</Box>
                    <Box style={{ display: 'inline', fontWeight: 700 }}>
                      Category: {question.category}
                    </Box>
                    <Box style={{ fontWeight: 700 }} className='difficulty'>
                      Difficulty: {question.difficulty}
                    </Box>
                  </Box>
                  <Box className={classes.buttons}>
                    <Button
                      data-testid='edit-button'
                      className={`${classes.edit_btn} ${classes.button}`}
                      variant='contained'
                      color='primary'
                      onClick={() => editQuestion(question)}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      className={`${classes.delete_btn} ${classes.button}`}
                      variant='contained'
                      color='primary'
                      onClick={() => deleteQuestion(question.id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete{' '}
                    </Button>
                  </Box>
                </Paper>
              </Fade>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: { quiz: { questions: Question[] } }) => {
  return { questions: state.quiz.questions };
};

export default connect(mapStateToProps)(QuestionListView);
