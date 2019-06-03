import React, { Component } from 'react';

import { connect } from 'react-redux';
import './NewNames.css'
import swal from 'sweetalert';

class NewNames extends Component {

    state = {
        keyword: '',
        syns_id: 0,
    }

    handleChange = (event) => {
        console.log('Input Keyword:', event.target.value)
        this.setState({
            keyword: event.target.value
        })
    }

    handleClick = (event) => {
        event.preventDefault();

        // Sends User Input to newNamesSaga (Then Thesaurus API and also Starts Route To DB)
        if (this.state.keyword === '') {
            swal("Howdy, Friend", "You'll need to enter a keyword before we can find you some names.")
        }
        // else if (this.props.reduxState.newNamesReducer.length == 0) {
        //     this.handleClickStopper()
        // }
        // else if (this.props.reduxState.newNamesReducer[0].meta.id[0] != this.state.keyword) {
        //     swal("Sorry, Friend", "That keyword has no results.")
        // }
        else {
            this.props.dispatch({ type: 'SEARCH_KEYWORD', payload: this.state.keyword })
        }

    } // End function handleClick

    // Handles DELETE NAME SUGGESTIONS - Does not delete anything
    handleDeleteClick = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SEARCH_FUNCTION', payload: "delete" })

    } // End function handleDeleteClick

    // Handles GET NAME SUGGESTIONS - Not an actual GET function
    handleGetClick = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SEARCH_FUNCTION', payload: "fetch" })
    } // End function handleGetClick

    // Handles POST NAME SUGGESTIONS - Not a typical POST function
    handlePostClick = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SEARCH_FUNCTION', payload: "post" })
    } // End function handlePostClick

    // Handles PUT NAME SUGGESTIONS - Not an actual PUT function
    handlePutClick = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SEARCH_FUNCTION', payload: "change" })
    } // End function handlePutClick

    // Moves To Next Suggestion - Carousel - Increments Array Index by 1
    nextSuggestion = () => {
        // console.log('eachKeyword:', eachKeyword);
        console.log('syns_id ', this.state.syns_id)
        const newIndex = this.state.syns_id + 1;
        if (this.state.syns_id === this.props.reduxState.newNamesReducer[0].meta.syns[0].length - 1) {
            this.setState({
                syns_id: 0,

            })
        }
        else (
            this.setState({
                syns_id: newIndex,

            })
        )
    } // End function nextSuggestion

    // Moves To Previous Suggestion - Carousel - Decrements Array Index by 1
    previousSuggestion = () => {
        console.log('syns_id', this.state.syns_id)
        const newIndex = this.state.syns_id - 1;
        if (this.state.syns_id === 0) {
            this.setState({
                syns_id: (this.props.reduxState.newNamesReducer[0].meta.syns[0].length - 1),

            })
        }
        else (
            this.setState({
                syns_id: newIndex,

            })
        )
    } // End function previousSuggestion

    
    saveName = () => {
        let funkName = this.props.reduxState.functionReducer[0].meta.syns[0][this.state.syns_id];
        let newName = this.props.reduxState.newNamesReducer[0].meta.syns[0][this.state.syns_id];
        let text = funkName + newName;
        console.log('saveName pressed', funkName + newName);
        this.props.dispatch({ type: 'SAVE_NAME', payload: text })

    }

    render() {

        let currentKeyword;
        let currentFunction;

        if (this.props.reduxState.newNamesReducer.length != 0) {
            currentKeyword = this.props.reduxState.newNamesReducer[0].meta.syns[0][this.state.syns_id]
            // console.log=('currentKeyword', currentKeyword)
        }


        if (this.props.reduxState.functionReducer.length != 0) {
            currentFunction = this.props.reduxState.functionReducer[0].meta.syns[0][this.state.syns_id]

        }

        return (
            <div>
                <h2>Enter keyword</h2>
                <form>
                    <input type="text" placeholder="keyword" onChange={this.handleChange} />
                    <button onClick={this.handleClick}>Submit</button><br />
                    <button onClick={this.handleGetClick}>GET</button>
                    <button onClick={this.handlePostClick}>POST</button>
                    <button onClick={this.handlePutClick}> PUT </button>
                    <button onClick={this.handleDeleteClick}>DELETE</button>
                    <br /><br />
                    <div id="displayProjectName">Your Function Name Related To <b>{this.state.keyword}</b>:</div><br />

                    <span className="currentSuggestion">{currentFunction}{currentKeyword}</span>

                    <br /><br />
                    <button onClick={() => this.previousSuggestion()}>Previous</button>
                    <button onClick={() => this.nextSuggestion()}>Next</button>
                    <button onClick={() => this.saveName()}>Save</button><br />
                    {/* <pre>{JSON.stringify(this.props.reduxState.newNamesReducer)}</pre> */}
                </form>
                <div id="savedNames">

                </div>
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

export default connect(mapStateToProps)(NewNames);