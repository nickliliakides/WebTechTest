import React, { useEffect, useState } from 'react';
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
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      opacity: '.85',
      backgroundColor: '#e6e6e6',
      transition: 'transform .6s ease-out',
      '&:hover': {
        transform: 'scale(1.03, 1.05)',
      },
    },
    paper_inner: {
      margin: 8,
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'space-evenly',
      border: '2px groove #0e4b16',
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
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
      transition: 'all .3s ease',
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getQuestionsRequest());
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch, loading]);

  const getMoreQuestions = (): void => {
    dispatch(getQuestionsRequest());
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const deleteQuestion = (index: number): void => {
    dispatch(deleteQuestionRequest(index));
  };

  const editQuestion = (question: Question): void => {
    dispatch(setSelectedQuestion(question));
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  return questions && questions.length === 0 && loading ? (
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
              <Fade right duration={600} delay={50 * index}>
                <Paper className={classes.paper}>
                  <div className={classes.paper_inner}>
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
                  </div>
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
