import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserProjects.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import swal from 'sweetalert';




class UserProjects extends Component {

    // removeAlert() {
    //     console.log('Remove Alert');
    //     swal({
    //         title: "Are you sure?",
    //         text: "Once deleted, you will not be able to recover this imaginary file!",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //     })
    //     .then((willDelete) => {
    //     if (willDelete) {
    //         swal("Poof! Your imaginary file has been deleted!", {
    //             icon: "success",

    //         });
    //     } else {
    //         swal("Your imaginary file is safe!");
    //     }
    //     });
    // }

    // Remove Project Row and Project From Database
    removeProject(id) {
        console.log('remove button pressed. ID:', id);
        // this.removeAlert()
        this.props.dispatch({ type: 'REMOVE_PROJECT', payload: id})

    }

    render() {

        let userProjects;

        if (this.props.reduxState.projectReducer.length != 0) {
            console.log('projectReducer:', this.props.reduxState.projectReducer)
            userProjects = this.props.reduxState.projectReducer.map((project, i) => {
                return (
                    <tr key={i} className="projectRow">

                        <td className="projectName">{project.project_name}</td>
                        <td><button>Get More Names</button> </td>
                        <td><EditIcon /></td>
                        <td onClick={() => this.removeProject(project.id)}><DeleteIcon /></td>
                    </tr>
                )
            })
        }

        return (
            <div>
                <h2>User Projects Go Here</h2>
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

        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}

export default connect(mapStateToProps)(UserProjects);