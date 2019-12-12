import React, { useState } from 'react'
import { Grid, Typography, withStyles, Button, Paper, FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core'
import Validator from 'validator'
import heroStyles from '../styles/heroStyles';
import { ScrollDownIndicator } from 'react-landing-page'

import { NavLink } from 'react-router-dom'

const Hero = ({ ...props }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})

  const handleEmail = (e) => {
    return setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    return setPassword(e.target.value)
  }

  const handleErrors = (err) => {
    return setErrors(err)
  }

  const validate = (email, password) => {
      const errors = {}
      if(!Validator.isEmail(email)) errors.email = "Invalid Email";
      if(!password) errors.password = "Can't be blank";
      return errors
  }

  const submit = (e) => {
    e.preventDefault()
    const val = validate(email, password)
    
    if (Object.keys(val).length !== 0) {
      return handleErrors(val)
    }

    fetch('http://localhost:3001/api/u/login', { 
        method: "post",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
                email: email,
                password: password
        })
    })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        localStorage.setItem("cool-jwt", result.token)
        window.location.href = "/dashboard"
      } else {
        throw new Error()
      }
    })
    .catch(err => {
      handleErrors({ err })
    })
  }


  const { classes } = props

  return (
          <div> 
              <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  style={{ minHeight: '100vh' }}
              >
                  <Grid item>
                      <Grid
                          container
                          direction="column"
                          justify="center"
                          alignItems="center"
                          style={{ minHeight: '100%' }}
                      >
                          <Grid item>
                              <Typography
                                  variant="h1"
                                  className={classes.heroText}
                                  color="secondary"
                                  align="center"
                              >
                                  Cris Bank
                              </Typography>
                          </Grid>
                          <Grid item>
                              <div className={classes.wrapper1}>
                                  <Typography
                                      variant="h5"
                                      color="primary"
                                      align="center"
                                      className={classes.round2}
                                  >
                                      Sign up for the world's best banking service
                                  </Typography>
                              </div>
                          </Grid>
                          <Grid item>
                              <div className={classes.wrapper1}>
                                  <NavLink
                                      to="register"
                                      style={{textDecoration: "none"}}
                                  >
                                      <Button variant="contained" color="primary" className={classes.Button}>
                                          Register 
                                      </Button>
                                  </NavLink>
                              </div>
                          </Grid>
                      </Grid>
                  </Grid>
                  <Grid item>
                      <Paper style={{width: "30vw", height: "100%", margin: 50, boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                          <Typography
                              variant="h5"
                              color="primary"
                              align="center"
                              className={classes.heroText1}
                          >
                              Sign in
                          </Typography>
                              { errors.err ?                          
                                <Typography
                                    variant="body1"
                                    color="error"
                                    align="center"
                                >
                                    Invalid Email or Password
                                </Typography> : null }
                          <div className={classes.outer}>
                              <form
                                  className={classes.form}
                              >
                                  <span className={classes.wrapper}>
                                      <FormControl margin="normal" fullWidth required>
                                          <InputLabel> Email Address </InputLabel>
                                          <Input 
                                              id="email" 
                                              name="email" 
                                              error={errors.email}
                                              type="text"
                                              value={email}
                                              autoComplete="email" 
                                              autoFocus
                                              onChange={handleEmail}
                                              className={classes.textField}
                                          />
                                      </FormControl>
                                      {errors.email ? <FormHelperText error>Invalid Email</FormHelperText> : null}
                                  </span>
                                  <span className={classes.wrapper}>
                                      <FormControl margin="normal" fullWidth required>
                                          <InputLabel htmlFor="password"> Password </InputLabel>
                                          <Input 
                                              id="password" 
                                              name="password" 
                                              value={password}
                                              error={errors.password}
                                              onChange={handlePassword}
                                              type="password"
                                              autoComplete="password"
                                              className={classes.textField}
                                          />
                                      </FormControl>
                                      {errors.password ? <FormHelperText error>Invalid Password</FormHelperText> : null}
                                  </span>
                                  <span className={classes.wrapper}>
                                      <Button
                                          className={classes.button}
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                          onClick={submit}
                                      >
                                          Submit
                                      </Button>
                                  </span>
                              </form>
                          </div>
                      </Paper>
                  </Grid>
              </Grid>
              <ScrollDownIndicator />
          </div>
  )
}

export default withStyles(heroStyles)(Hero)