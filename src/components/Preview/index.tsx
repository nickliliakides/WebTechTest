import React, { useEffect, useState } from 'react';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { green } from '@material-ui/core/colors';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import Zoom from 'react-reveal/Zoom';
import { Question } from '../../types/Question';
import { styles, shuffle } from './misc';

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color='default' {...props} />);

interface IProps {
  show: boolean;
  question: Question;
}

const Preview: React.FC<IProps> = ({ show, question }): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [answers, setAnswers] = useState(['a', 'b']);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    if (show) setOpen(true);
    if (question && question.question) {
      const shuffledAnswers = shuffle([
        ...question.incorrect_answers,
        question.correct_answer,
      ]);
      setAnswers(shuffledAnswers);
    }
  }, [show]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleSubmitAnswer = (): void => {
    if (value !== '') {
      setAnswered(true);
      if (value === question.correct_answer) {
        setCorrect(true);
      } else {
        setCorrect(false);
      }
      setTimeout(() => setAnswered(false), 2500);
    }
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Category: {question.category} - Difficulty:{' '}
          {question.difficulty &&
            question.difficulty.charAt(0).toUpperCase() +
              question.difficulty.slice(1)}
        </DialogTitle>
        <DialogContent dividers>
          <Typography style={{ marginBottom: 20 }} gutterBottom>
            Q. {question.question}
          </Typography>
          <FormControl component='fieldset'>
            <RadioGroup
              aria-label='gender'
              name='gender1'
              value={value}
              onChange={handleChange}
            >
              {answers.map((ans, i) => (
                <FormControlLabel
                  key={i}
                  value={ans}
                  control={<GreenRadio />}
                  label={ans}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <div style={{ height: 100, marginTop: '-20px' }}>
            {answered && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {correct ? (
                  <Zoom>
                    <div
                      style={{
                        textAlign: 'center',
                        fontSize: 22,
                      }}
                    >
                      <p>Correct Answer!!!</p>
                      <ThumbUpIcon
                        style={{ color: 'green', width: 40, height: 40 }}
                      />
                    </div>
                  </Zoom>
                ) : (
                  <Zoom>
                    <div style={{ textAlign: 'center', fontSize: 22 }}>
                      <p>Wrong Answer!</p>
                      <ThumbDownIcon
                        style={{ color: 'red', width: 40, height: 40 }}
                      />
                    </div>
                  </Zoom>
                )}
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleSubmitAnswer}
            variant='contained'
            color='primary'
          >
            Submit
          </Button>
          <Button
            autoFocus
            onClick={handleClose}
            variant='contained'
            color='secondary'
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Preview;
