import React, { Component, Fragment, useState } from 'react' 

import { Grid, Paper, withStyles, Typography, FormControl, InputLabel, Input, Button, FormHelperText} from '@material-ui/core'
import Validator from 'validator'
import loginStyles from '../styles/loginStyles'

const Login = ({ ...props }) => {
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
				props.history.push('/dashboard')
			}
		})
		.catch(err => {
			handleErrors({ err })
		})
	}

	const { classes } = props
	return (
		<Fragment>
		    <Grid
		        container
		        direction="row"
		        justify="center"
		        alignItems="center"
		        style={{height: "100vh"}}
		    >
		        <Grid item xs sm={12} md={6}>
		        	<div className={classes.signIn}>
					    <Typography variant="h1" align="left" color="primary" style={{marginBottom: "-12px", fontFamily: "Dancing Script, cursive", textShadow: "1px 1px #000000"}} >
		                    Sign In
	                	</Typography>
	                </div>
	                { errors.err ? <FormHelperText error>Invalid Email or Password</FormHelperText> : null }
		            <Paper className={classes.paper}>
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
                                       {errors.email ? <FormHelperText error>Invalid Email</FormHelperText> : null}
                                   </FormControl>
                               </span>
                               <span className={classes.wrapper}>
                                   <FormControl margin="normal" fullWidth required>
                                       <InputLabel htmlFor="password"> Password </InputLabel>
                                       <Input 
                                           id="password" 
                                           name="password" 
                                           value={password}
                                           onChange={handlePassword}
                                           type="password"
                                           autoComplete="password"
                                           className={classes.textField}
                                       />
                                   </FormControl>
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
		</Fragment>
	)
}

export default withStyles(loginStyles)(Login)