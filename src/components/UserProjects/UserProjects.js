import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserProjects.css';


class UserProjects extends Component {
    render() {

        let userProjects;

        if (this.props.reduxState.projectReducer.length != 0) {
            console.log('projectReducer:', this.props.reduxState.projectReducer)
            userProjects = this.props.reduxState.projectReducer.map((project) => {
                return (
                    <tr className="projectRow">
                    
                        <td className="projectName">{project.project_name}</td>
                        <td><button>Get More Names</button> </td>
                        <td><button>View / Edit Project</button></td>
                        <td>delete icon will go here</td>
                    </tr>
                )
            })
        }

        return (
            <div>
                <h2>User Projects Go Here</h2>
                <table>
                    <thead>
                        <th>Project:</th>
                        <th></th>
                        <th></th>

                    </thead>
                    <tbody>
                        {userProjects}
                    </tbody>
                </table>
            </div>

        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}

export default connect(mapStateToProps)(UserProjects);