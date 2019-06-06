import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  withRouter,
} from 'react-router-dom';
import logo from './logo.svg';
import { connect } from 'react-redux';

// import Nav from '../Nav/Nav';
// import TemporaryDrawer from '../TemporaryDrawer/TemporaryDrawer';
import ButtonAppBar from '../ButtonAppBar/ButtonAppBar';
// import TemporaryDrawer from '../TemporaryDrawer/TemporaryDrawer';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import SavedNames from '../SavedNames/SavedNames';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import UserProjects from '../UserProjects/UserProjects';
import NewNames from '../NewNames/NewNames';

import './App.css';




class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    this.props.dispatch({ type: 'FETCH_PROJECT'});
  }

  render() {
    return (
      <Router>
        <div>
          {/* <Nav /> */}
          <ButtonAppBar />
          <img src={logo} className="App-logo" alt="logo" />

          {/* <TemporaryDrawer /> */}
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/names"
              component={SavedNames}
            />
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            <ProtectedRoute
              exact
              path="/project/:id"
              component={UserProjects}
            />
            <ProtectedRoute
              exact
              path="/new"
              component={NewNames}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default connect()(App);
