import React from 'react'
import { Toolbar, AppBar, withStyles, Grid, Typography } from "@material-ui/core"
import navbarStyles from '../styles/navbarStyles';

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
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(navbarStyles)(NavBar)