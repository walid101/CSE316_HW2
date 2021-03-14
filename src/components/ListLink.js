// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component, ref } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    render() {
        // DISPLAY WHERE WE ARE
        //console.log("this color is: " + this.props.toDoList.color);
        console.log("\t\t\tListLink render");
        //this is listlink
        return (
            <div 
                className='todo-list-button'
                onClick={this.handleLoadList}
                style = {{background: this.props.toDoList.color}}
            >
                {this.props.toDoList.name}<br />
            </div>
        )
    }
}

export default ListLink;