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
        let myProps = this.props;
        // DISPLAY WHERE WE ARE
        //console.log("this color is: " + this.props.toDoList.color);
        console.log("\t\t\tListLink render");
        //this is listlink
        return (
            <div 
                className='todo-list-button'
                onClick=
                {() => {
                    this.handleLoadList()
                    document.getElementById("add-item-button").style.color = "white";
                    let delButton = document.getElementById("delete-list-button");
                    let redoButton = document.getElementById("redo-button");
                    let undoButton = document.getElementById("undo-button");
                    let closeButton =  document.getElementById("close-list-button");
                    let addListButton = document.getElementById("add-list-button");
                    delButton.style.color = "white";
                    redoButton.style.color = "white";
                    undoButton.style.color = "white";
                    closeButton.style.color = "white";
                    addListButton.style.color = "black";
                    /*let firstUpArr = document.getElementById("upArrow-"+myProps.toDoList.items[0].id);
                    let lastUpArr = document.getElementById("downArrow-"+myProps.toDoList.items[myProps.toDoList.items.length-1].id);
                    firstUpArr.style.color = "black";
                    lastUpArr.style.color = "black";*/
                }}
                style = {{background: this.props.toDoList.color}}
            >
                {this.props.toDoList.name}<br />
            </div>
        )
    }
}

export default ListLink;