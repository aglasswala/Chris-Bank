import React, { useState, Fragment, useEffect } from 'react'

import clsx from 'clsx';
import dashboardStyles from '../styles/dashboardStyles'
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from '../sections/Listitems';
import Chart from '../sections/Chart';
import Deposits from '../sections/Deposits';
import Orders from '../sections/Orders';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { Switch, Route, NavLink } from 'react-router-dom'

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


const Dashboard = ({ ...props }) => {
	const [open, setOpen] = useState(true);
	const [user, setUser] = useState({});

	const classes = dashboardStyles()
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	const handleDrawerOpen = () => {
	  setOpen(true);
	}

	const handleDrawerClose = () => {
	  setOpen(false)
	}

	const handleUser = (usr) => {
		return setUser(usr)
	}

	useEffect(() => {
		if (localStorage.getItem("cool-jwt")) {
			fetch('http://localhost:3001/api/u/', { 
			    method: "get",
			    headers: {
			    	'Content-Type': "application/json",
			    	'Authorization': localStorage.getItem("cool-jwt")
			    }
			})
			.then(response => response.json())
			.then(result => {
				console.log(result)
			})
			.catch(err => console.log(err))
		} else {
			props.history.push("/")
		}
	}) 

	function MainDash() {
		return (
			<Fragment>
				{/* Chart */}
				<Grid item xs={12} md={8} lg={9}>
				  <Paper className={fixedHeightPaper}>
				    <Chart />
				  </Paper>
				</Grid>
				{/* Recent Deposits */}
				<Grid item xs={12} md={4} lg={3}>
				  <Paper className={fixedHeightPaper}>
				    <Deposits />
				  </Paper>
				</Grid>
				{/* Recent Orders */}
				<Grid item xs={12}>
				  <Paper className={classes.paper}>
				    <Orders />
				  </Paper>
				</Grid>
			</Fragment>
		)
	}

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
	        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
	          Dashboard
	        </Typography>
	        <IconButton color="inherit">
	          <Badge badgeContent={9} color="secondary">
	            <NotificationsIcon />
	          </Badge>
	        </IconButton>
	      </Toolbar>
	    </AppBar>

	    <main className={classes.content}>
	      <div className={classes.appBarSpacer} />
	      <Container maxWidth="lg" className={classes.container}>
	        <Grid container spacing={3}>
	         	<Switch>
		          	<Route exact path="/dashboard" component={MainDash} />
		          	<Route exact path="/dashboard/order" component={MainDash} />
		          	<Route exact path="/dashboard/userprofile" component={MainDash} />
		          	<Route exact path="/dashboard/medalists" component={MainDash} />
		    	</Switch>
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