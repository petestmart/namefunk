// ========== REACT ========== //
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// ========== COMPONENTS ========== //
import UserProjects from '../UserProjects/UserProjects';

// ========== STYLE ========== //
import './NewNames.css'
import swal from 'sweetalert';

// ========== MATERIAL UI ========== //
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    palette: {
        secondary: { main: '#e61610' },
    },
});


// ========== CLASS ========== //
class NewNames extends Component {

    state = {
        keyword: '',
        syns_id: 0,
        project_id: 0,
    }

    // ========== LIFECYCLE ========== //
    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_USER' });
        this.props.dispatch({ type: 'FETCH_PROJECT' });
    }

    // ========== FUNCTIONS ========== //
    // = Functions Are In Alphabetical Order = //

    // Changes State To What is Being Typed By The User Into The Input
    handleChange = (event) => {

        console.log('Input Keyword:', event.target.value)
        let modKeyword;
        let keyword;
        modKeyword = event.target.value
        keyword = modKeyword.replace(modKeyword.charAt(0), modKeyword.charAt(0).toUpperCase())
        this.setState({
            keyword: keyword,
        })
    }

    // Handles Click Event When Submit Button Is Pressed After Typing Text Into The Input
    handleClick = (event) => {
        event.preventDefault();

        // Alert For Empty Input Field
        if (this.state.keyword === '') {
            swal("Howdy, Friend", "You'll need to enter a keyword before we can name your function.")
        }
        // Sends User Input to newNamesSaga (Then Thesaurus API and also Starts Route To DB)
        else {
            this.props.dispatch({
                type: 'SEARCH_KEYWORD',
                payload: this.state.keyword,
                history: this.props.history
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
        this.props.dispatch({ type: 'SEARCH_FUNCTION', payload: "get" })
    } // End function handleGetClick

    // Handles POST NAME SUGGESTIONS - Not a typical POST function
    handlePostClick = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SEARCH_FUNCTION', payload: "post" })
    } // End function handlePostClick

    // Handles PUT NAME SUGGESTIONS - Not an actual PUT function
    handlePutClick = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SEARCH_FUNCTION', payload: "put" })
    } // End function handlePutClick

    hardPageReload = () => {
        window.location.reload();
    }

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

    // Triggers an Alert To Confirm Delete
    removeAlert(id) {
        console.log('Remove Alert', id);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this saved name!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    { this.removeSavedName(id) };
                    swal("Poof! Your saved name has been deleted!", {
                        icon: "success",

                    });
                } else {
                    swal("Your saved name is safe!");
                }
            });
    } // End removeAlert

    // Removes Project Row and Project From Database
    removeSavedName(id) {
        this.props.dispatch({ type: 'REMOVE_SAVED_NAME', payload: { id: id, project_id: this.props.match.params.id } })

    } // End removeSavedName

    // Changes State to Match URL of Project ID
    renderProject = () => {
        this.setState({
            project_id: this.props.match.params.id,
        })
    } // End renderProject

    // Sends Suggested Function name to newNamesSaga (Then to DB via name.router)
    saveName = (string) => {
        let funkName = this.props.reduxState.functionReducer[this.state.syns_id].syn;
        let modNewName = this.props.reduxState.newNamesReducer[0].meta.syns[0][this.state.syns_id]
        let newName = modNewName.replace(modNewName.charAt(0), modNewName.charAt(0).toUpperCase());
        let text = funkName + newName;

        console.log('saveName pressed', funkName + newName);
        this.props.dispatch({ type: 'SAVE_NAME', payload: { text: text, project_id: this.props.match.params.id } })
        this.renderProject();
    } // End function saveName

    // ========== RENDER ========== //
    render() {

        let modKeyword;
        let currentKeyword;
        let currentFunction;
        let savedNames;



        // currentKeyword is a Synonym of the User-Entered Keyword (Carousel)
        if (this.props.reduxState.newNamesReducer.length != 0) {

            if (this.props.reduxState.newNamesReducer[0].meta) {
                modKeyword = this.props.reduxState.newNamesReducer[0].meta.syns[0][this.state.syns_id];
                currentKeyword = modKeyword.replace(modKeyword.charAt(0), modKeyword.charAt(0).toUpperCase())
            }
            else {
                // Alerts User If No Search Results Were Found
                swal({
                    title: "Sorry, Friend",
                    text: "That Search Did Not Yield Any Results",
                    icon: "warning",
                    buttons: {
                        false: "Okie Dokie"
                    },
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            swal("Reloading", {
                                icon: "success",

                            })
                                .then(
                                    this.hardPageReload()
                                )

                        } else {

                            swal("Give It Another Shot!",
                                {
                                    icon: "success",
                                    buttons: ["ok"]
                                }
                            );
                        }
                    });
            }
        } // end currentKeyword if statement

        // currentFunction is a Synonym of the User-Selected Function (Carousel)
        if (this.props.reduxState.functionReducer.length != 0) {
            currentFunction = this.props.reduxState.functionReducer[this.state.syns_id].syn

        } // end currentFunction if statement

        // Displays Names Saved Under the Currently Selected Project
        if (this.props.reduxState.currentProjectReducer.length != 0) {
            savedNames = this.props.reduxState.currentProjectReducer.map((savedName) => {
                return (

                    <tr key={savedName.id} className="savedNameRow">
                        <td className="savedName">{savedName.text}</td>
                        <td></td>
                        <td></td>
                        <td onClick={() => this.removeAlert(savedName.id)}><DeleteIcon /></td>
                    </tr>
                )
            })

        } // end savedNames if statement

        // ========== RETURN ========== //
        return (
            <div>
                <ThemeProvider theme={theme} >
                    <Card className="enterKeyword">
                        <h2>Enter keyword</h2>
                        <form className="enterKeywordForm">
                            <TextField
                                onChange={this.handleChange}
                                size="medium"
                                label="keyword"
                                placeholder="ex: Pets" />

                            <Button
                                onClick={this.handleClick}
                                size="large"
                                className="submitButton"
                                variant="contained"
                                color="primary"
                                type="submit" >Submit</Button>
                        </form>
                    </Card>
                    
                    <Card className="functionNameSelect">
                    <div >
                        <h2>Function Type</h2>
                        <Button
                            onClick={this.handleGetClick}
                            size="large"
                            className="functionButton"
                            variant="contained"
                            color="secondary" >GET</Button>
                        <Button
                            onClick={this.handlePostClick}
                            size="large"
                            className="functionButton"
                            variant="contained"
                            color="secondary" >POST</Button>
                        <Button
                            onClick={this.handlePutClick}
                            size="large"
                            className="functionButton"
                            variant="contained"
                            color="secondary" >PUT</Button>
                        <Button
                            onClick={this.handleDeleteClick}
                            size="large"
                            className="functionButton"
                            variant="contained"
                            color="secondary" >DELETE</Button>
                       
                    </div>
                    <div id="displayProjectName">Your Function Name Related To <b>{this.state.keyword}</b>:</div><br /> 

                        <div className="currentSuggestion">{currentFunction}{currentKeyword}</div><br />

                   
                    <Button
                        onClick={() => this.previousSuggestion()}
                        size="small"
                        className="carouselButton"
                        variant="outlined"
                        color="default" >prev</Button>
                    <Button
                        onClick={() => this.nextSuggestion()}
                        size="small"
                        className="carouselButton"
                        variant="outlined"
                        color="default" >next</Button>
                    <Button
                        onClick={() => this.saveName()}
                        size="small"
                        className="carouselSaveButton"
                        variant="outlined"
                        color="default" >save</Button>

                    <br />
                    </Card>
                    
                    <Card className="savedNamesForProject">
                    <h2>Saved Names For Project: {this.state.keyword}</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th className="savedName">Names</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                            {savedNames}
                        </tbody>
                    </table>
                    </Card>
                    <UserProjects />
                </ThemeProvider>
            </div>
        ) // End Return 
    } // End Render
} // End Class

const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}

export default withRouter(connect(mapStateToProps)(NewNames));