import { makeStyles } from '@material-ui/core/styles';
import image from './pictures/background.jpg'

const getStartedStyles = makeStyles(theme => ({ 
	Button: {
	    padding: 20,
	    paddingLeft: 40,
	    paddingRight: 40,
	    marginBottom: 20,
	    marginLeft: "1rem",
	    marginRight: "1rem",
	    marginTop: 0,
	    fontSize: "1rem",
	    fontFamily: 'Roboto',
	    borderRadius: "0",
	    color: "white",
	    '&:active, &:focus': {
	        boxShadow: 'none',
	    },
	},
	wrapper: {
	    padding: 10
	},
	round2: {
		marginTop: "100px",
	    fontSize: "calc(12px + 1.5vw)",
	    fontFamily: "Roboto"
	},
	image: {
		marginTop: "100px",
		width: "100%",
		height: "auto",
		minHeight: "50vh",
		backgroundImage: `url(${image})`,
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
	}
}))

export default getStartedStyles