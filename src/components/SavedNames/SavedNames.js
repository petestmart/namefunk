import React, { Component } from 'react';
import { connect } from 'react-redux';

class SavedNames extends Component {
    render() {
        return (
            <div>
                <h2>Saved Names Go Here</h2>
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

export default connect(mapStateToProps)(SavedNames);