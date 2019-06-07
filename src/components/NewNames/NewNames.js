import React, { Component } from 'react';
// import SavedNames from '../SavedNames/SavedNames';
import { connect } from 'react-redux';
import './NewNames.css'
import swal from 'sweetalert';
import UserProjects from '../UserProjects/UserProjects';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

class NewNames extends Component {

    state = {
        keyword: '',
        syns_id: 0,
        project_id: 0,
    }

    componentDidMount() {
        // this.loadCurrentProject();

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
            swal("Howdy, Friend", "You'll need to enter a keyword before we can name your function.")
        }
        // else if (this.props.reduxState.newNamesReducer.length == 0) {
        //     this.handleClickStopper()
        // }
        // else if (this.props.reduxState.newNamesReducer[0].meta.id[0] != this.state.keyword) {
        //     swal("Sorry, Friend", "That keyword has no results.")
        // }
        else {
            this.props.dispatch({
                type: 'SEARCH_KEYWORD',
                payload: this.state.keyword
            })
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

    // loadCurrentProject = () => {
    //     if (this.props.reduxState.projectReducer.length > 0) {
    //     console.log('projectReducer.project_id', this.props.reduxState.projectReducer.project_id)
    //         this.setState({
    //             project_id: this.props.reduxState.projectReducer[9],
    //         })
    //     }
    // }

    // loadProject(id) {
    //     console.log('Load Project Clicked', id);
    //     // "/project/${id}"
    //     this.props.history.push(`/new/${id}`)
    // }

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

    // Sends Suggested Function name to newNamesSaga (Then to DB via name.router)
    saveName = (string) => {
        let funkName = this.props.reduxState.functionReducer[0].meta.syns[0][this.state.syns_id];
        let newName = this.props.reduxState.newNamesReducer[0].meta.syns[0][this.state.syns_id];
        let text = funkName + newName;
        console.log('saveName pressed', funkName + newName);
        this.props.dispatch({ type: 'SAVE_NAME', payload: { text: text, project_id: this.props.match.params.id } })
        this.renderProject();
    } // End function saveName

    renderProject = () => {
        this.setState({
            project_id: this.props.match.params.id,
        })
    }

    render() {

        let currentKeyword;
        let currentFunction;
        let savedNames;

        // Wait until load 
        if (this.props.reduxState.newNamesReducer.length != 0) {
            currentKeyword = this.props.reduxState.newNamesReducer[0].meta.syns[0][this.state.syns_id]
            // console.log=('currentKeyword', currentKeyword)
        }

        // Wait until load 
        if (this.props.reduxState.functionReducer.length != 0) {
            currentFunction = this.props.reduxState.functionReducer[0].meta.syns[0][this.state.syns_id]

        }

        if (this.props.reduxState.currentProjectReducer.length != 0) {
            savedNames = this.props.reduxState.currentProjectReducer.map((savedName, i) => {
                return (

                    <tr key={i} className="projectRow">
                        <td className="projectName">{savedName.text}</td>
                        <td></td>
                        <td><EditIcon /></td>
                        <td onClick={() => this.removeAlert(savedName.id)}><DeleteIcon /></td>
                    </tr>
                )
            })

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
                    <div id="displayProjectName">Your Function Name Related To <b>{this.state.keyword}</b> {this.state.project_id}:</div><br />

                    <span className="currentSuggestion">{currentFunction}{currentKeyword}</span>

                    <br /><br />
                    <button onClick={() => this.previousSuggestion()}>Previous</button>
                    <button onClick={() => this.nextSuggestion()}>Next</button>
                    <button onClick={() => this.saveName()}>Save</button><br />
                    {/* <pre>{JSON.stringify(this.props.reduxState.projectReducer)}</pre> */}
                </form>
                <h2>Saved Names For Project: {this.state.keyword}</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Names</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        {savedNames}
                    </tbody>
                </table>
                <UserProjects />
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