import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserProjects extends Component {
    render() {
        return (
            <div>
                <h2>User Projects Go Here</h2>
                <ul>

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