import React from 'react'
import { Grid, Typography, withStyles } from '@material-ui/core'
import footerStyles from '../styles/footerStyles'

const Footer = () => {
    return (
    	<div style={{height: "80px"}}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >	
            	<Grid item>
            		<Typography
            		    variant="body1"
            		    color="primary"
            		    align="center"
            		    style={{padding: 20}}
            		>
            			<a href="/#" style={{textDecoration: "none"}}>About Cris Bank</a>
            		</Typography>
            	</Grid>
            	<Grid item>
            		<Typography
            		    variant="body1"
            		    color="primary"
            		    align="center"
            		    style={{padding: 20}}
            		>
            			<a href="/#" style={{textDecoration: "none"}}>Careers</a>
            		</Typography>
            	</Grid>
            	<Grid item>
            		<Typography
            		    variant="body1"
            		    color="primary"
            		    align="center"
            		    style={{padding: 20}}
            		>
            			<a href="/#" style={{textDecoration: "none"}}>Report Fraud</a>
            		</Typography>
            	</Grid>
            	<Grid item>
            		<Typography
            		    variant="body1"
            		    color="primary"
            		    align="center"
            		    style={{padding: 20}}
            		>
            			<a href="/#" style={{textDecoration: "none"}}>Contact us</a>
            		</Typography>
            	</Grid>
            </Grid>	
        </div>	
    )
}

export default withStyles(footerStyles)(Footer)