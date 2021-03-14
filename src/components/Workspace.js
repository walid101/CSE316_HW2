// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let myProps = this.props;
        let thisEx = this;
        return (
            <div id="workspace">
                <div id = "delete_modal" class = "modal">
                <div class = "modal-content">
                    <div class = "modal-header">
                        <span class = "xBtn" id = "xBtn">&times;</span>
                        <span class = "yBtn" id = "yBtn">&#10003;</span>
                        <h2>Delete List</h2>
                    </div>
                    <p id = "modal_text">Are You Sure You Want To Delete This List?</p>
                    </div>
                </div>
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo id="undo-button" className="list-item-control material-icons todo-button" />
                        <Redo id="redo-button" className="list-item-control material-icons todo-button" />
                        <AddBox id="add-item-button" className="list-item-control material-icons todo-button" />
                        <Delete id="delete-list-button" className="list-item-control material-icons todo-button" 
                        onClick = {() => {
                            let modalPop = document.getElementById('delete_modal');
                            modalPop.style.display = 'block';
                            let closeBtn =  document.getElementById("xBtn");
                            let yesBtn = document.getElementById("yBtn");
                            closeBtn.onmousedown = function () {
                                modalPop.style.display = 'none';
                            }
                            yesBtn.onmousedown = function () {
                                modalPop.style.display = 'none';
                                myProps.deleteListMod();
                            }
                        }}/>
                        <Close id="close-list-button" className="list-item-control material-icons todo-button" />
                    </div>
                </div>
                <div id="todo-list-items-div">
                {
                    this.props.toDoListItems.map((toDoListItem) => (
                    <ToDoItem
                        key={toDoListItem.id}
                        toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                    />))
                }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;