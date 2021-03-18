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
                id = {"todo-list-"+myProps.key}
                className='todo-list-button'
                onDoubleClick=
                {()=>{
                console.log("top Key: " + myProps.topKey);
                console.log("my key: " + myProps.toDoList.id);
                if(myProps.topKey === myProps.toDoList.id)
                {
                        let taskItemElement = document.getElementById("todo-list-" + myProps.key);
                        //console.log("List name: " + taskItemElement.textContent);
                        //let preValText = listItem.description;
                        let textField = document.createElement("input");
                        textField.setAttribute("id", "todo-list-tf-" + myProps.toDoList.id);
                        textField.setAttribute("type", "text");
                        textField.setAttribute("value", "" + myProps.toDoList.description);
                        taskItemElement.textContent = "";
                        //taskItemElement.removeAllChildNodes("task-item-" + listItem.id);                    
                        taskItemElement.appendChild(textField);
                        textField.focus();
                        textField.select();
                        textField.onkeydown = (event) => {
                            // Number 13 is the "Enter" key on the keyboard
                            if (event.code === "Enter") {
                                // Cancel the default action, if needed
                                event.preventDefault();
                                
                                // Trigger the button element with a click
                                let text = textField.value;
                                //this.controller.handleUpdateItem(listItem, text, listItem.getDueDate(), listItem.getStatus());
                                taskItemElement.textContent = "";
                                //this.removeAllChildNodes("task-item-" + listItem.id);
                                let textElement = document.createTextNode(text);
                                taskItemElement.appendChild(textElement);
                                myProps.toDoList.name = text;
                                myProps.saveToDoListName();//myProps.toDoList, text);
                        }}
                    }
                }}
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
                }}
                style = {{background: this.props.toDoList.color}}
            >
                {this.props.toDoList.name}<br />
            </div>
        )
    }
}

export default ListLink;