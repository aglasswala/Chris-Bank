import React, { Component, Fragment } from 'react' 

import { Grid, Paper, withStyles, Typography, } from '@material-ui/core'

import BackgroundSlider from 'react-background-slider'

import image1 from '../styles/pictures/card.jpg'
import image3 from '../styles/pictures/money.jpg'
import image4 from '../styles/pictures/building.jpg'
import LoginForm from '../../components/forms/LoginForm'

import loginStyles from '../styles/loginStyles'

class Login extends Component {

	render() {
		const { classes } = this.props
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
				            <Paper className={classes.paper}>
				            	<div className={classes.outer}>
					                <LoginForm
					                    submit={this.submit}
					                />
					            </div>
				            </Paper>
				        </Grid>
				    </Grid>
			</Fragment>
		)
	}
}

export default withStyles(loginStyles)(Login)