import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import LandingPage from './components/views/Landing';
import Register from './components/views/Register'
import Dashboard from './components/views/Dashboard'
import BackgroundSlider from 'react-background-slider'

import image1 from './components/styles/pictures/card.jpg'
import image3 from './components/styles/pictures/money.jpg'
import image4 from './components/styles/pictures/building.jpg'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#42a5f5',
    },
    secondary: {
      main: '#4C4B63',
    },
  },
});

/**
 *
 * Main app component with routes
 * 
 */
const App = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
     <CssBaseline />
      <BackgroundSlider
        images={[image1, image3, image4]}
        duration={2} transition={2} />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </MuiThemeProvider>
  </Router>

);

export default App;
