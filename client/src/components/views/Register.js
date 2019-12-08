import React, { Component, Fragment, useState } from "react";

import { Grid, Paper, withStyles, Typography, FormControl, Button, InputLabel, Input } from "@material-ui/core";

import registerStyles from "../styles/registerStyles";
import RegisterForm from "../forms/RegisterForm";

const Register = ({ ...props }) => {
  const { classes } = props
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [ssn, setSSN] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")

  const handleEmail = (e) => {
    return setEmail(e.target.value)
  }

  const handleFirstName = (e) => {
    return setFirstName(e.target.value)
  }
  
  const handleLastName = (e) => {
    return setLastName(e.target.value)
  }

  const handlePassword = (e) => {
    return setPassword(e.target.value)
  }

  const handleSSN = (e) => {
    return setSSN(e.target.value)
  }

  const handleAddress = (e) => {
    return setAddress(e.target.value)
  }

  const handleCity = (e) => {
    return setCity(e.target.value)
  }

  const handleState = (e) => {
    return setState(e.target.value)
  }

  const submit = (e) => {
    e.preventDefault()
    fetch("http://localhost:3001/api/u/register", {
      method: "post",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                SSN: ssn,
                address: address + " " + city + ", " + state,
      })
    })
    .then(response => response.json())
    .then(result => {
      if (result.token) {
        localStorage.setItem('cool-jwt', token)
        props.history.push('/dashboard')
      }

      console.log("SFS")
    })
    .catch(err => console.log(err))
  }

  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ height: "100vh", backgroundColor: "white" }}
      >
        <Grid item xs sm={12} md={6}>
          <Typography variant="h1" align="left" color="primary" style={{marginBottom: "-12px", fontFamily: "Dancing Script, cursive", textShadow: "1px 1px #000000"}}>
            Register
          </Typography>
          <Paper className={classes.paper}>
            <div className={classes.outer}>
              <form className={classes.form}>
                <span className={classes.wrapper}>
                  <FormControl
                    margin="normal"
                    fullWidth
                    required
                  >
                    <InputLabel> Email Address </InputLabel>
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      onChange={handleEmail}
                      autoComplete="email"
                      autoFocus
                      className={classes.textField}
                    />
                  </FormControl>
                </span>
                <span className={classes.wrapper}>
                  <FormControl
                    margin="normal"
                    fullWidth
                    required
                  >
                    <InputLabel htmlFor="firstname"> First name </InputLabel>
                    <Input
                      id="firstname"
                      name="firstname"
                      value={firstName}
                      onChange={handleFirstName}
                      type="text"
                      autoComplete="firstname"
                      className={classes.textField}
                    />
                  </FormControl>
                </span>
                <span className={classes.wrapper}>
                  <FormControl
                    margin="normal"
                    fullWidth
                    required
                  >
                    <InputLabel htmlFor="lastname"> Last name </InputLabel>
                    <Input
                      id="lastname"
                      name="lastname"
                      value={lastName}
                      onChange={handleLastName}
                      type="text"
                      autoComplete="lastname"
                      className={classes.textField}
                    />
                  </FormControl>
                </span>
                <span className={classes.wrapper}>
                  <FormControl
                    margin="normal"
                    fullWidth
                    required
                  >
                    <InputLabel htmlFor="ssn"> Social Security Number </InputLabel>
                    <Input
                      id="ssn"
                      name="ssn"
                      type="text"
                      value={ssn}
                      onChange={handleSSN}
                      autoComplete="password"
                      className={classes.textField}
                    />
                  </FormControl>
                </span>
                <span className={classes.wrapper}>
                  <FormControl
                    margin="normal"
                    fullWidth
                    required
                  >
                    <InputLabel htmlFor="address"> Address </InputLabel>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      value={address}
                      onChange={handleAddress}
                      autoComplete="address"
                      className={classes.textField}
                    />
                  </FormControl>
                </span>
                <span className={classes.wrapper}>
                  <FormControl
                    margin="normal"
                    fullWidth
                    required
                  >
                    <InputLabel htmlFor="city"> City </InputLabel>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      value={city}
                      onChange={handleCity}
                      autoComplete="city"
                      className={classes.textField}
                    />
                  </FormControl>
                </span>
                <span className={classes.wrapper}>
                  <FormControl
                    margin="normal"
                    fullWidth
                    required
                  >
                    <InputLabel htmlFor="state"> State </InputLabel>
                    <Input
                      id="state"
                      name="state"
                      type="text"
                      value={state}
                      onChange={handleState}
                      autoComplete="state"
                      className={classes.textField}
                    />
                  </FormControl>
                </span>
                <span className={classes.wrapper}>
                  <FormControl
                    margin="normal"
                    fullWidth
                    required
                  >
                    <InputLabel htmlFor="password"> Password </InputLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={handlePassword}
                      autoComplete="password"
                      className={classes.textField}
                    />
                  </FormControl>
                </span>                                
                <span className={classes.wrapper}>
                  <Button
                    className={classes.button}
                    type="submit"
                    onClick={submit}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </span>
              </form>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default withStyles(registerStyles)(Register);
