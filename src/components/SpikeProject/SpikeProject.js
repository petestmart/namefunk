import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';

class SpikeProject extends Component {

    state = {
        keyword: '',
        syns_id: 0,
    }

    handleChange = (event) => {
        console.log('Spike:', event.target.value)
        this.setState({
            keyword: event.target.value
        })
    }

    handleClick = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SEARCH_KEYWORD', payload: this.state.keyword })
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

    handleDeleteClick = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SEARCH_FUNCTION', payload: "delete" })
    }

    render() {

        // let eachKeyword = this.props.reduxState.spikeProjectReducer.map(
        //     (arrayOfObjects) => {
        //         return arrayOfObjects.meta.syns[0].map((word, i) => {
        //             return <li key={i} >{word}</li>

        //         })

        //     })

        // let eachKeyword = this.props.reduxState.spikeProjectReducer.map(
        //     (arrayOfObjects) => {
        //         return arrayOfObjects.meta.syns[0].map((word, i) => {
        //             this.setState({
        //                 keyword: {word}
        //             })

        //         })

        //     })

        let eachFunction = this.props.reduxState.functionReducer.map(
            (arrayOfObjects) => {
                return arrayOfObjects.meta.syns[0].map((word, i) => {
                    return <li key={i} >{word}</li>
                })
            }
        )



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
                    Similar Terms:<br />
                    <ul>
                        {/* {eachKeyword} */}
                        {eachFunction}
                    </ul>
                    <pre>{JSON.stringify(this.props.reduxState.spikeProjectReducer)}</pre>
                </form>

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        // keywordState: reduxState.spikeProjectReducer
        reduxState
    }
}

export default connect(mapStateToProps)(SpikeProject);