import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import NewNames from '../NewNames/NewNames';


const UserPage = (props) => (
  <div>
    <NewNames />
    {/* <h1 id="welcome">
      {/* Welcome, {props.user.username}! */}
    {/* </h1> */} 
    <p>Your ID is: {props.user.id}</p>
    <LogOutButton className="log-in" />
    
  </div>
);

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
