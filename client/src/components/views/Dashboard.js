import React, { useState, Fragment, useEffect } from 'react'

import clsx from 'clsx';
import dashboardStyles from '../styles/dashboardStyles'
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import Chart from '../sections/Chart';
import Deposits from '../sections/Deposits';
import Orders from '../sections/Orders';
import Button from '@material-ui/core/Button';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Cris Bank
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

/**
 *
 * Main Dashboard Element
 * 
 */
const Dashboard = ({ ...props }) => {
	const [open, setOpen] = useState(true);

	const classes = dashboardStyles()
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	const handleDrawerOpen = () => {
	  setOpen(true);
	}

	const logout = () => {
		localStorage.removeItem("cool-jwt")
		props.history.push("/")
	}

	function MainDash() {
		return (
			<Fragment>
				<Grid item xs={12} md={8} lg={9}>
				  <Paper className={fixedHeightPaper}>
				    <Chart />
				  </Paper>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
				  <Paper className={fixedHeightPaper}>
				    <Deposits />
				  </Paper>
				</Grid>
				<Grid item xs={12}>
				  <Paper className={classes.paper}>
				    <Orders />
				  </Paper>
				</Grid>
			</Fragment>
		)
	}

	useEffect(() => {
		if (!localStorage.getItem("cool-jwt")) {
			props.history.push("/")
		}
	}) 

	return (
	  <div className={classes.root}>
	    <CssBaseline />
	    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
	      <Toolbar className={classes.toolbar}>
	        <IconButton
	          edge="start"
	          color="inherit"
	          aria-label="open drawer"
	          onClick={handleDrawerOpen}
	          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
	        >
	          <MenuIcon />
	        </IconButton>
	        <Typography component="h1" variant="h6" noWrap className={classes.title}>
	          Dashboard
	        </Typography>
	        <Button onClick={logout}>
	        	Logout
	        </Button>
	      </Toolbar>
	    </AppBar>
	    <main className={classes.content}>
	      <div className={classes.appBarSpacer} />
	      <Container maxWidth="lg" className={classes.container}>
	        <Grid container spacing={3}>
	        	<MainDash />
	        </Grid>
	        <Box pt={4}>
	          <Copyright />
	        </Box>
	      </Container>
	    </main>
      	
	  </div>
	);
}

export default Dashboard