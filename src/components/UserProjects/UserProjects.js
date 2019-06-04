import React, { Component } from 'react';
import { connect } from 'react-redux';


class UserProjects extends Component {
    render() {

        let userProjects;

        if (this.props.reduxState.projectReducer.length != 0) {
            console.log('projectReducer:', this.props.reduxState.projectReducer)
            userProjects = this.props.reduxState.projectReducer.map((project) => {
                return (
                    <li>{project.project_name}</li>
                )
            })
        }

        return (
            <div>
                <h2>User Projects Go Here</h2>
                <ul>
                    {userProjects}
                </ul>
            </div>

        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        // keywordState: reduxState.newNamesReducer
        reduxState
    }
}

export default connect(mapStateToProps)(UserProjects);