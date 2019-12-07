import React, { Component } from 'react'
import { Toolbar, AppBar, withStyles, Grid, Typography, Button } from "@material-ui/core"
import navbarStyles from '../styles/navbarStyles';
import { NavLink } from 'react-router-dom'

const NavBar = ({ ...props }) => {
    const { classes } = props
    return (
        <AppBar color="white" className={classes.NotTop}>
            <Toolbar>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                    <Grid item>
                        <div> 
                            <Typography
                                color="secondary"
                                className={classes.navbarScrolled}
                                variant="h5"
                            >
                                Cris Bank
                           </Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className={classes.wrapper}>
                            <NavLink
                                to="login"
                                style={{textDecoration: "none"}}
                            >
                                <Button variant="outline" color="inherit" className={classes.buttonNotTop}>    
                                    Login 
                                </Button>
                            </NavLink>
                        </div>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(navbarStyles)(NavBar)