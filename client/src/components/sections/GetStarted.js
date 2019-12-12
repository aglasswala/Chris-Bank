import React from 'react'

import { Grid, Typography, Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

import getStartedStyles from '../styles/getStartedStyles'

const GetStarted = () => {
	const classes = getStartedStyles()
	return (
		<div className={classes.image}>
			<Grid
			    container
			    direction="column"
			    justify="center"
			    alignItems="center"
			    style={{height: "100%"}}
			>
			    <Grid item>
			        <div className={classes.wrapper}>
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
			        <Grid container justify="center">
			            <Grid item>
			                <div className={classes.wrapper}>
			                    <NavLink
			                        to="register"
			                        style={{textDecoration: "none"}}
			                    >
			                        <Button variant="contained" color="primary" className={classes.Button}>
			                            Get started 
			                        </Button>
			                    </NavLink>
			                </div>
			            </Grid>
			        </Grid>
			    </Grid>
			</Grid>
		</div>
	)
}

export default GetStarted