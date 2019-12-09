import React, { Fragment, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const styles1 = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});


const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const day = new Date().getDate()
const month = new Date().getMonth()
const year = new Date().getFullYear()
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]



const Deposits = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const [snOpen, setSNOpen] = useState(false);
  const [user, setUser] = useState({});
  const [toAccount, setTo] = useState("");
  const [balance, setBalance] = useState("");
  const [er, setErrors] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleSN = () => {
    return setSNOpen(!snOpen);
  }

  const handleErrors = (mes) => {
    return setErrors(mes);
  }

  const handleClose = () => {
    setOpen(false);
    clearBalance()
    clearToAccount()
  }

  const handleUser = (usr) => {
    return setUser(usr)
  }

  const handleBalance = (e) => {
    return setBalance(e.target.value)
  }

  const handleToAccount = (e) => {
    return setTo(e.target.value)
  }

  const clearBalance = () => {
    return setBalance("")
  }

  const clearToAccount = () => {
    return setTo("")
  }

  const submit = async (e) => {
    e.preventDefault()
    
    await fetch('http://localhost:3001/api/t/', { 
        method: "post",
        headers: {
          'Content-Type': "application/json",
          'Authorization': localStorage.getItem("cool-jwt")
        },
        body: JSON.stringify({
          toEmail: toAccount,
          amount: balance
        })
    })
    .then(response => response.json())
    .then(result => {
      if (result.err) {
        throw new Error(result.err)
      }

      handleClose(result)
      user.balance += balance
    })
    .catch(err => {
      handleErrors(err.message)
      handleSN()
    })
  }

  useEffect( () => {
    fetch('http://localhost:3001/api/u/', { 
        method: "get",
        headers: {
          'Content-Type': "application/json",
          'Authorization': localStorage.getItem("cool-jwt")
        }
    })
    .then(response => response.json())
    .then(result => {
      handleUser(result)
    })
    .catch(err => console.log(err))
  }) 

  const MySnackbarContent = (props) => {
    const { classes, className, message, handleClose, variant, ...other } = props;
    return (
      <SnackbarContent
        className={classes.error}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <ErrorIcon className={classes.iconVariant} style={{fontSize: 20}} />
            {er}
          </span>
        }
        {...other}
      />
    );
  }

  const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

  const classes = useStyles();
  return (
    <Fragment>
      <Typography variant="body1" color="primary">Hey {user.firstName} {user.lastName}</Typography>
      <Title>Checking Balance</Title>
      <Typography component="p" variant="h4">
        ${(+(user.balance)).toFixed(2)}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {day + " " + monthNames[month] + ", " + year}
      </Typography>
      <div>
        <Button variant="contained" color="primary" onClick={handleClickOpen}> Transfer </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Create a transaction"}</DialogTitle>
        <DialogContent>
          <form
              className={classes.form}
          >
              <span className={classes.wrapper}>
                  <FormControl margin="normal" fullWidth>
                      <InputLabel> To </InputLabel>
                      <Input 
                          id="email" 
                          name="email" 
                          type="text"
                          value={toAccount}
                          autoFocus
                          onChange={handleToAccount}
                          className={classes.textField}
                      />
                  </FormControl>
              </span>
              <span className={classes.wrapper}>
                  <FormControl margin="normal" fullWidth>
                      <InputLabel htmlFor="balance"> Balance </InputLabel>
                      <Input 
                          id="balance" 
                          name="balance" 
                          value={balance}
                          onChange={handleBalance}
                          type="text"
                          className={classes.textField}
                          startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      />
                  </FormControl>
              </span>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
       <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={snOpen}
          autoHideDuration={6000}
          // onClose={this.handleClose}
        >
         <MySnackbarContentWrapper
          variant="error"
          className={classes.margin}
          message="Invalid Credentials!"
          handleClose = {handleSN}
        />
      </Snackbar>
    </Fragment>
  );
}

export default Deposits