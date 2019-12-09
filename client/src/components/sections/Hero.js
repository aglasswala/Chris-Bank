import React, { Component } from 'react'
import { Grid, Typography, withStyles, Button, Paper, FormControl, Input, InputLabel } from '@material-ui/core'
import heroStyles from '../styles/heroStyles';
import { ScrollDownIndicator } from 'react-landing-page'
import BackgroundSlider from 'react-background-slider'

import image1 from '../styles/pictures/card.jpg'
import image3 from '../styles/pictures/money.jpg'
import image4 from '../styles/pictures/building.jpg'

import { NavLink } from 'react-router-dom'

class Hero extends Component {
    render() {
        const { classes } = this.props
    
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
                                                   type="text"
                                                   autoComplete="email" 
                                                   autoFocus
                                                   className={classes.textField}
                                               />
                                           </FormControl>
                                       </span>
                                       <span className={classes.wrapper}>
                                           <FormControl margin="normal" fullWidth required>
                                               <InputLabel htmlFor="password"> Password </InputLabel>
                                               <Input 
                                                   id="password" 
                                                   name="password" 
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
}

export default withStyles(heroStyles)(Hero)