import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Main Styling
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '40vw',
        textAlign: 'left',
        fontFamily: 'Roboto, sans-serif',
      },
    },
    main_heading: {
      textAlign: 'center',
    },
    headings: {
      padding: '8px',
    },
    paper: {
      marginRight: 20,
      padding: 20,
      opacity: '.85',
      backgroundColor: '#e6e6e6',
    },
    paper_inner: {
      margin: 8,
      padding: 20,
      backgroundColor: 'white',
      border: '2px groove #0e4b16',
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    },
    flex: {
      display: 'flex',
    },
    left: {
      flex: 3,
    },
    right: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
    },
    btn_container: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    save_btn: {
      backgroundColor: 'green',
      margin: 10,
      '&:hover': {
        backgroundColor: 'green',
        opacity: 0.8,
      },
    },
    add_btn: {
      backgroundColor: 'orange',
      margin: 10,
      '&:hover': {
        backgroundColor: 'orange',
        opacity: 0.8,
      },
    },
    preview_btn: {
      backgroundColor: 'blue',
      margin: 10,
      '&:hover': {
        backgroundColor: 'blue',
        opacity: 0.8,
      },
    },
    delete_icon: {
      color: 'red',
      position: 'relative',
      right: '38px',
      top: '22px',
      marginRight: '-25px',
      cursor: 'pointer',
    },
  })
);

// Initial Component's State
export const initialState = {
  formdata: {
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: '',
    checked1: true,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    closed3: true,
    closed4: true,
    closed5: true,
  },
  submitted: false,
};
