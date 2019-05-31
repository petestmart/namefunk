import React, { Component } from 'react';
// import axios from 'axios';

import { connect } from 'react-redux';
import './NewNames.css'

// let eachKeyword = this.props.reduxState.newNamesReducer.map(
//     (arrayOfObjects) => {
//         return arrayOfObjects.meta.syns[0].map((word, i) => {
//             return [word]
//             // return {word}
//         })

//     })

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
        this.props.dispatch({ type: 'SEARCH_KEYWORD', payload: this.state.keyword })
        
    }

    handleDeleteClick = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SEARCH_FUNCTION', payload: "delete" })
        
    }

    handleGetClick = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SEARCH_FUNCTION', payload: "fetch" })
    }

    handlePostClick = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SEARCH_FUNCTION', payload: "post" })
    }

    handlePutClick = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SEARCH_FUNCTION', payload: "change" })
    }

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
    }

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
    }

    
    saveName = () => {
        let funkName = this.props.reduxState.functionReducer[0].meta.syns[0][this.state.syns_id];
        let newName = this.props.reduxState.newNamesReducer[0].meta.syns[0][this.state.syns_id];
        let text = funkName + newName;
        console.log('saveName pressed', funkName + newName);
        this.props.dispatch({ type: 'SAVE_NAME', payload: text })
        
    }


    // renderSuggestion = () => {
    //     this.props.reduxState.newNamesReducer.map(
    //         (arrayOfObjects) => {
    //             return arrayOfObjects.meta.syns[0].map((word, i) => {
    //                 return <li key={i} >{word}</li>

    //             })

    //         })

    // }

    // renderSuggestion = () => {
    //     this.props.reduxState.newNamesReducer.map(
    //         (arrayOfObjects) => {
    //             return arrayOfObjects.meta.syns[0].map((word, i) => {
    //                 return <li key={i} >{word}[0]</li>

    //             })

    //         })

    // }



    render() {

        let currentKeyword;
        let currentFunction;

        if (this.props.reduxState.newNamesReducer.length != 0) {
            currentKeyword = this.props.reduxState.newNamesReducer[0].meta.syns[0][this.state.syns_id]
            // console.log=('currentKeyword', currentKeyword)
        }

        // let eachKeyword = this.props.reduxState.newNamesReducer.map(
        //     (arrayOfObjects) => {
        //         // return arrayOfObjects.meta.syns[0].map((words, i) => {
        //         //     return <span key={i}>{words}</span>
        //         //     // return {words}
        //         // })
        //         return <li></li>{arrayOfObjects.meta.syns[0][this.state.syns_id]}


        // })

        // let eachKeyword = this.props.reduxState.newNamesReducer.map(
        //     (arrayOfObjects) => {
        //         return arrayOfObjects.meta.syns[0].map((word, i) => {
        //             this.setState({
        //                 keyword: {word}
        //             })

        //         })

        //     })

        // let eachFunction = this.props.reduxState.functionReducer.map(
        //     (arrayOfObjects) => {
        //         // return arrayOfObjects.meta.syns[0].map((functionSyns, i) => {
        //         //     return <span key={i} >{functionSyns}</span>
        //         return arrayOfObjects.meta.syns[0][this.state.syns_id]
        //         // })
        //     }
        // )

        if (this.props.reduxState.functionReducer.length != 0) {
            currentFunction = this.props.reduxState.functionReducer[0].meta.syns[0][this.state.syns_id]
            // console.log=('currentKeyword', currentKeyword)
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
                    <br />
                    Your Function Is Named:<br />

                    {/* <ul> */}
                    <span className="currentSuggestion">{currentFunction}{currentKeyword}</span>


                    {/* {this.renderSuggestion()} */}
                    {/* </ul> */}<br /><br />
                    <button onClick={() => this.previousSuggestion()}>Previous</button>
                    <button onClick={() => this.nextSuggestion()}>Next</button>
                    <button onClick={() => this.saveName()}>Save</button><br />
                    {/* <pre>{JSON.stringify(this.props.reduxState.newNamesReducer)}</pre> */}
                </form>

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