// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';
import { DepartureBoardSharp } from '@material-ui/icons';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";
        console.log("props child: " + this.props.children);
        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                <div className='item-col task-col' id = {'task-item-'+listItem.id} 
                onMouseDown = { () => {
                    let taskItemElement = document.getElementById("task-item-" + listItem.id);
                    if (taskItemElement.childElementCount === 0) {
                        let textField = document.createElement("input");
                        textField.setAttribute("id", "task-item-tf-" + listItem.id);
                        textField.setAttribute("type", "text");
                        textField.setAttribute("value", "" + listItem.description);
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
                            }
                        };
                        textField.change = (event) => {
                            // REMOVE THE TEXT FIELD
                            taskItemElement.textContent = "";
                            let text = textField.value;
                            let textElement = document.createTextNode(text);
                            taskItemElement.appendChild(textElement);
                            //taskItemElement.textContent = "";
                            //let textElement = document.createTextNode(text);
                            //taskItemElement.appendChild(textElement);
                            //this.removeAllChildNodes("task-item-" + listItem.id);
                            //this.controller.handleUpdateItem(listItem, text, listItem.getDueDate(), listItem.getStatus());
                        }
                    }
                }}>{listItem.description}</div>
                <div className='item-col due-date-col' id = {'due-date-item-'+listItem.id}
                onMouseDown = { () => {
                let dueDateItemElement = document.getElementById("due-date-item-" + listItem.id);
                if (dueDateItemElement.childElementCount === 0) {
                    dueDateItemElement.textContent = "";
                    console.log("in if statement!");
                    let datePicker = document.createElement("input");
                    datePicker.setAttribute("id", "task-item-date-" + listItem.id);
                    datePicker.setAttribute("type", "date");
                    datePicker.setAttribute("value", "" + listItem.dueDate);
                    //datePicker.textContent = document.getElementById("due-date-item-" + listItem.id).value;
                    dueDateItemElement.appendChild(datePicker);
                    datePicker.focus();
                    datePicker.select();
                    datePicker.onkeydown = (event) => {
                        // Number 13 is the "Enter" key on the keyboard
                        if (event.code === "Enter") {
                            // Cancel the default action, if needed
                            event.preventDefault();
                            // Trigger the button element with a click
                            let dateValue = datePicker.value;
                            //this.controller.handleUpdateItem(listItem, listItem.getDescription(), dateValue, listItem.getStatus());

                        }
                    };
                    datePicker.onchange = (event) => {
                        // REMOVE THE TEXT FIELD
                        let date = datePicker.value;
                        let dateElement = document.createTextNode(date);
                        dueDateItemElement.textContent = "";
                        dueDateItemElement.appendChild(dateElement);
                        //let dateValue = datePicker.value;
                        //this.controller.handleUpdateItem(listItem, listItem.getDescription(), dateValue, listItem.getStatus());
                    };
                }
                }}>{listItem.due_date}</div>
                <div className='item-col status-col' className={statusType} id = {'status-item-'+listItem.id}
                onMouseDown = {() => {
                    let statusItemElement = document.getElementById("status-item-" + listItem.id);
                    if (statusItemElement.childElementCount === 0) {
                        statusItemElement.textContent = "";
                        let dropDownMenu = document.createElement("select");
                        dropDownMenu.setAttribute("id", "status-item-dd-" + listItem.id);
                        dropDownMenu.setAttribute("value", "" + listItem.status);
                        let completed = document.createElement("option");
                        completed.setAttribute("value", "Complete");
                        completed.appendChild(document.createTextNode("complete"));
                        dropDownMenu.appendChild(completed);
                        let incomplete = document.createElement("option");
                        incomplete.setAttribute("value", "Incomplete");
                        incomplete.appendChild(document.createTextNode("incomplete"));
                        dropDownMenu.appendChild(incomplete);
                        dropDownMenu.value = listItem.status;
                        //this.removeAllChildNodes("status-item-" + listItem.id);
                        //statusItemElement.textContent = "";
                        statusItemElement.appendChild(dropDownMenu);
                        dropDownMenu.onchange = (event) => {
                            // REMOVE THE TEXT FIELD
                            console.log("SELECTED!");
                            statusItemElement.textContent = "";
                            let statusValue = dropDownMenu.value;
                            let statElement = document.createTextNode(statusValue);
                            statusItemElement.appendChild(statElement);
                            if(statusValue === "Complete"){statusItemElement.style.color = '#19c8ff';}
                            else{statusItemElement.style.color = 'coral';}
                            //SAVE VAL
                            //this.controller.handleUpdateItem(listItem, listItem.getDescription(), listItem.getDueDate(), statusValue);
                        };
                        /*
                        if(dropDownMenu.selectedIndex > 0) {
                            console.log("SELECTED!");
                            statusItemElement.textContent = "";
                            let statusValue = dropDownMenu.value;
                            let statElement = document.createTextNode(statusValue);
                            statusItemElement.appendChild(statElement);
                            if(statusValue === "complete"){statusItemElement.style.color = '#19c8ff';}
                            else{statusItemElement.style.color = 'coral';}
                        }
                        */
                }}}>{listItem.status}</div>
                <div className='item-col test-4-col'></div>
                <div className='item-col list-controls-col'>
                    <KeyboardArrowUp className='list-item-control todo-button' />
                    <KeyboardArrowDown className='list-item-control todo-button' />
                    <Close className='list-item-control todo-button' />
                    <div className='list-item-control'></div>
        <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;