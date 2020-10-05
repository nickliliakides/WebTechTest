import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { updateSelectedQuestion } from '../../redux/actions/questionwebservice';
import { toast } from 'react-toastify';
import Fade from 'react-reveal/Fade';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { FormControlLabel, Grid, Paper } from '@material-ui/core';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Question } from '../../types/Question';
import Preview from '../Preview';
import { useStyles, initialState } from './misc';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color='default' {...props} />);

interface IProps {
  dispatch: Dispatch;
  selectedQuestion: Question;
}

const QuestionEditor: React.FC<IProps> = ({
  dispatch,
  selectedQuestion,
}): JSX.Element => {
  const classes = useStyles();
  const [state, setState] = useState(initialState);
  const [preview, setPreview] = useState(false);
  const refForm = useRef('form');

  useEffect(() => {
    if (selectedQuestion && selectedQuestion.id) {
      const { question, correct_answer, incorrect_answers } = selectedQuestion;
      const formdata = { ...state.formdata };
      formdata['question'] = question;
      formdata['answer1'] = correct_answer;
      formdata['answer2'] = incorrect_answers[0];
      formdata['answer3'] = incorrect_answers[1] ? incorrect_answers[1] : '';
      formdata['answer4'] = incorrect_answers[2] ? incorrect_answers[2] : '';
      formdata['answer5'] = incorrect_answers[3] ? incorrect_answers[3] : '';
      formdata['closed3'] = incorrect_answers[1] ? false : true;
      formdata['closed4'] = incorrect_answers[2] ? false : true;
      formdata['closed5'] = incorrect_answers[3] ? false : true;
      setState({
        ...state,
        formdata,
      });
    }
  }, [selectedQuestion]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    question,
    answer1,
    answer2,
    answer3,
    answer4,
    answer5,
    checked1,
    checked2,
    checked3,
    checked4,
    checked5,
    closed3,
    closed4,
    closed5,
  } = state.formdata;

  const handleCheckBoxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const formdata = { ...state.formdata };
    formdata[event.target.name] = event.target.checked;
    setState({ ...state, formdata });
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const formdata = { ...state.formdata };
    formdata[event.target.name] = event.target.value;
    setState({
      ...state,
      formdata,
    });
  };

  const handleDelete = (field: string, fieldState: string): void => {
    const formdata = { ...state.formdata };
    formdata[field] = '';
    formdata[fieldState] = true;
    setState({
      ...state,
      formdata,
    });
  };

  const handleNewInput = (): void => {
    const displayInput = (field: string): void => {
      const formdata = { ...state.formdata };
      formdata[field] = false;
      setState({ ...state, formdata });
    };

    if (closed3) {
      displayInput('closed3');
    }

    if (closed4) {
      displayInput('closed4');
    }

    if (closed5) {
      displayInput('closed5');
    }
  };

  const handleSubmit = (): void => {
    if (!selectedQuestion.id) {
      toast.error(
        'There is not selected question to edit. Please select one from the list on the right.'
      );
      return;
    }

    const correctQuestionsToCheck = [
      checked1,
      checked2,
      checked3,
      checked4,
      checked5,
    ];
    let correctLength = 0;
    correctQuestionsToCheck.forEach((q) => {
      if (q === true) correctLength++;
    });

    let fieldsAreValid = question !== '' && answer1 !== '' && answer2 !== '';

    if (!fieldsAreValid) return;

    if (fieldsAreValid && correctLength !== 1) {
      toast.error('There must be only 1 correct answer!');
      return;
    }

    const correct_answer = checked1
      ? answer1
      : checked2
      ? answer2
      : checked3
      ? answer3
      : checked4
      ? answer4
      : answer5;

    const incorrectAnswersToCheck = checked1
      ? [answer2, answer3, answer4, answer5]
      : checked2
      ? [answer1, answer3, answer4, answer5]
      : checked3
      ? [answer1, answer2, answer4, answer5]
      : checked4
      ? [answer1, answer2, answer3, answer5]
      : [answer1, answer2, answer3, answer4];

    const filterIncorrectAnswers = (): string[] => {
      const result: string[] = [];
      incorrectAnswersToCheck.forEach((ans) => {
        if (ans !== '') {
          result.push(ans);
        }
      });
      return result;
    };

    const dataToSubmit = {
      ...selectedQuestion,
      question,
      correct_answer,
      incorrect_answers: filterIncorrectAnswers(),
    };
    dispatch(updateSelectedQuestion(dataToSubmit));
    setState({ ...state, submitted: true });
    setTimeout(() => {
      setState(initialState);
    }, 800);
  };

  return (
    <Grid data-testid='editor' className='edit_container' item={true} md={7}>
      <div className='editor'>
        <h1 className={classes.main_heading}>Edit Question</h1>
        <ValidatorForm
          className={classes.root}
          ref={refForm}
          onSubmit={handleSubmit}
        >
          <Fade top duration={700} delay={500}>
            <Paper className={classes.paper}>
              <div className={classes.paper_inner}>
                <h2 data-testid='header' className={classes.headings}>
                  Question
                </h2>
                <TextValidator
                  id='question'
                  data-testid='question-field'
                  name='question'
                  label='Question'
                  value={question}
                  variant='outlined'
                  onChange={handleTextFieldChange}
                  validators={['required']}
                  errorMessages={['This field is required']}
                  disabled={!selectedQuestion.id ? true : false}
                />
                <div className={classes.flex}>
                  <h2 className={`${classes.headings} ${classes.left}`}>
                    Answers
                  </h2>
                  <h2 className={`${classes.headings} ${classes.right}`}>
                    Correct
                  </h2>
                </div>
                <div className={classes.flex}>
                  <TextValidator
                    className={classes.left}
                    name='answer1'
                    label='Answer'
                    value={answer1}
                    variant='outlined'
                    onChange={handleTextFieldChange}
                    validators={['required']}
                    errorMessages={['This field is required']}
                    disabled={!selectedQuestion.id ? true : false}
                  />
                  <FormControlLabel
                    className={classes.right}
                    control={
                      <GreenCheckbox
                        checked={checked1}
                        onChange={handleCheckBoxChange}
                        name='checked1'
                        data-testid='checkbox'
                      />
                    }
                    label=''
                    disabled={!selectedQuestion.id ? true : false}
                  />
                </div>
                <div className={classes.flex}>
                  <TextValidator
                    className={classes.left}
                    name='answer2'
                    label='Answer'
                    value={answer2}
                    variant='outlined'
                    onChange={handleTextFieldChange}
                    validators={['required']}
                    errorMessages={['This field is required']}
                    disabled={!selectedQuestion.id ? true : false}
                  />

                  <FormControlLabel
                    className={classes.right}
                    control={
                      <GreenCheckbox
                        checked={checked2}
                        onChange={handleCheckBoxChange}
                        name='checked2'
                      />
                    }
                    label=''
                    disabled={!selectedQuestion.id ? true : false}
                  />
                </div>
                {(answer3 !== '' || !closed3) && (
                  <div className={classes.flex}>
                    <TextValidator
                      className={classes.left}
                      name='answer3'
                      label='Answer'
                      value={answer3}
                      variant='outlined'
                      onChange={handleTextFieldChange}
                      validators={['required']}
                      errorMessages={['This field is required']}
                      disabled={answer3 === '' && closed3 ? true : false}
                    />
                    <DeleteForeverIcon
                      onClick={() => handleDelete('answer3', 'closed3')}
                      className={classes.delete_icon}
                      name={answer3}
                      data-testid='delete-icon'
                    />
                    <FormControlLabel
                      className={classes.right}
                      control={
                        <GreenCheckbox
                          checked={checked3}
                          onChange={handleCheckBoxChange}
                          name='checked3'
                        />
                      }
                      label=''
                      disabled={closed3}
                    />
                  </div>
                )}
                {(answer4 !== '' || !closed4) && (
                  <div className={classes.flex}>
                    <TextValidator
                      className={classes.left}
                      name='answer4'
                      label='Answer'
                      value={answer4}
                      variant='outlined'
                      onChange={handleTextFieldChange}
                      validators={['required']}
                      errorMessages={['This field is required']}
                      disabled={answer4 === '' && closed4 ? true : false}
                    />
                    <DeleteForeverIcon
                      onClick={() => handleDelete('answer4', 'closed4')}
                      className={classes.delete_icon}
                    />
                    <FormControlLabel
                      className={classes.right}
                      control={
                        <GreenCheckbox
                          checked={checked4}
                          onChange={handleCheckBoxChange}
                          name='checked4'
                        />
                      }
                      label=''
                      disabled={closed4}
                    />
                  </div>
                )}
                {(answer5 !== '' || !closed5) && (
                  <div className={classes.flex}>
                    <TextValidator
                      className={classes.left}
                      name='answer5'
                      label='Answer'
                      value={answer5}
                      variant='outlined'
                      onChange={handleTextFieldChange}
                      validators={['required']}
                      errorMessages={['This field is required']}
                      disabled={answer5 === '' && closed5 ? true : false}
                    />
                    <DeleteForeverIcon
                      onClick={() => handleDelete('answer5', 'closed5')}
                      className={classes.delete_icon}
                    />
                    <FormControlLabel
                      className={classes.right}
                      control={
                        <GreenCheckbox
                          checked={checked5}
                          onChange={handleCheckBoxChange}
                          name='checked5'
                        />
                      }
                      label=''
                      disabled={closed5}
                    />
                  </div>
                )}
                <div>
                  <Button
                    data-testid='save-button'
                    className={classes.save_btn}
                    variant='contained'
                    color='primary'
                    type='submit'
                    startIcon={
                      state.submitted ? (
                        <CircularProgress size={20} />
                      ) : (
                        <SaveIcon />
                      )
                    }
                    disabled={state.submitted || !selectedQuestion.id}
                  >
                    Save
                  </Button>
                  <Button
                    data-testid='add-button'
                    className={classes.add_btn}
                    variant='contained'
                    color='primary'
                    type='button'
                    disabled={
                      (!closed3 && !closed4 && !closed5) || !selectedQuestion.id
                    }
                    startIcon={<AddBoxIcon />}
                    onClick={handleNewInput}
                  >
                    Add Answer
                  </Button>
                  <Button
                    data-testid='preview-button'
                    className={classes.preview_btn}
                    variant='contained'
                    color='primary'
                    type='button'
                    disabled={!selectedQuestion.id}
                    startIcon={<VisibilityIcon />}
                    onClick={() => {
                      if (selectedQuestion.id) {
                        setPreview(true);
                        setTimeout(() => setPreview(false), 200);
                      }
                    }}
                  >
                    Preview
                  </Button>
                </div>
              </div>
            </Paper>
          </Fade>
        </ValidatorForm>
        <Preview show={preview} question={selectedQuestion} />
      </div>
    </Grid>
  );
};

const mapStateToProps = (state: { quiz: { selectedQuestion: Question } }) => {
  return { selectedQuestion: state.quiz.selectedQuestion };
};

export default connect(mapStateToProps)(QuestionEditor);
