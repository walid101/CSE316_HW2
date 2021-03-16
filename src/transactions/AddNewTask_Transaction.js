'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewTask_Transaction extends jsTPS_Transaction {
    constructor(App, itemId, currDescription, prevDescription) {
        super();
        this.app = App;
        this.itemId = itemId;
        this.currDesc = currDescription;
        this.prevDesc = prevDescription;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.app.addNewTask(this.itemId, this.currDesc);
    }

    undoTransaction() {
        this.app.revertTask(this.itemId, this.prevDesc);
    }
}