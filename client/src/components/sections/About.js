import React, { Component, Fragment } from "react";
import { withStyles, Grid, Typography, Button } from "@material-ui/core"
import aboutStyles from "../styles/aboutStyles"

import image from '../styles/pictures/reading.jpg'
import { NavLink } from 'react-router-dom'

class About extends Component {

    render() {
        const { classes, mobile } = this.props
        return (
            <Fragment> 
                <div className={classes.wrapper}>
                    <Grid 
                        container 
                        direction="row" 
                        justify="center" 
                        alignItems="center"
                    >
                        <Grid item sm={12} md={6}>
                            <div className={classes.wrapper}>
                                <Typography
                                    variant="h2"
                                    align="center"
                                    color="primary"
                                >
                                    Serving our customers and communities
                                </Typography>
                                <hr className={classes.hr} />
                                <Typography
                                    variant="body1"
                                    align="center"
                                    gutterBottom
                                    paragraph
                                >
                                   It doesn't happen with one transaction, in one day on the job or in one quarter. It's earned relationship by relationship.
                                </Typography>
                            </div>
                            <div className={classes.wrapper}>
                                <Typography
                                    variant="h2"
                                    align="center"
                                    color="primary"
                                >
                                    Manage Your Money
                                </Typography>
                                <hr className={classes.hr} />
                                <Typography
                                    variant="body1"
                                    align="center"
                                    gutterBottom
                                    paragraph
                                >
                                   Explore these tools and resources for budgeting, paying down debt, building financial independence and more.
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <img className={classes.img} src={image} alt="there should be something really cool here" />
                        </Grid>
                    </Grid> 
                </div>
            </Fragment>
        )
    }
}

export default withStyles(aboutStyles)(About)