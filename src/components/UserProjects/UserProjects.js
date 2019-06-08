import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserProjects.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import swal from 'sweetalert';
import {withRouter} from 'react-router-dom';



class UserProjects extends Component {

    state = {
        keyword: '',
        syns_id: 0,

    }
    
    // Loads Saved Names For Current Project
    loadProject(id) {
        console.log('Load Project Clicked', id);
        // "/project/${id}"
        this.props.history.push(`/new/${id}`);
        this.props.dispatch({ type: 'FETCH_NAMES', project_id: id });
    }

    // Triggers an Alert To Confirm Delete
    removeAlert(id) {
        console.log('Remove Alert');
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this project file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
        if (willDelete) {
            { this.removeProject(id) };
            swal("Poof! Your project file has been deleted!", {
                icon: "success",
                
            });
        } else {
            swal("Your project file is safe!");
        }
        });
    } // End removeAlert

    // Remove Project Row and Project From Database
    removeProject(id) {
        console.log('remove button pressed. ID:', id);
        
        this.props.dispatch({ type: 'REMOVE_PROJECT', payload: id})

    } // End removeProject

    render() {

        let userProjects;

        if (this.props.reduxState.projectReducer.length != 0) {
            console.log('projectReducer:', this.props.reduxState.projectReducer)
            userProjects = this.props.reduxState.projectReducer.map((project, i) => {
                return (
                    <tr key={i} className="projectRow">
                        <td className="projectName">{project.project_name}</td>
                        <td 
                        onClick={() => this.loadProject(project.id)}
                        ><EditIcon /></td>
                        <td></td>
                        <td onClick={() => this.removeAlert(project.id)}><DeleteIcon /></td>
                    </tr>
                )
            })
        }

        return (
            <div>
                <h2>Projects</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>My Projects</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        {userProjects}
                    </tbody>
                </table>
            </div>

        ) // end return
    } // end render
} // end class

const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}

export default withRouter(connect(mapStateToProps)(UserProjects));