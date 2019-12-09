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
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

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
  const [user, setUser] = useState({});
  const [toAccount, setTo] = useState("");
  const [balance, setBalance] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
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

  const submit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3001/api/t/', { 
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
      handleClose(result)
      user.balance += balance
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
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

  const classes = useStyles();
  return (
    <Fragment>
      <Title>Checking Balance</Title>
      <Typography component="p" variant="h4">
        ${user.balance}
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
    </Fragment>
  );
}

export default Deposits