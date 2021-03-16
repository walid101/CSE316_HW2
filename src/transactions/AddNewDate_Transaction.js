'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewDate_Transaction extends jsTPS_Transaction {
    constructor(App, itemId, currDueDate, prevDueDate) {
        super();
        this.app = App;
        this.itemId = itemId;
        this.currDue = currDueDate;
        this.prevDue = prevDueDate;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.app.addNewDue(this.itemId, this.currDue);
    }

    undoTransaction() {
        this.app.revertDue(this.itemId, this.prevDue);
    }
}