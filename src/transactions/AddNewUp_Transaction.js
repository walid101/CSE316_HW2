'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewUp_Transaction extends jsTPS_Transaction {
    constructor(App, itemId) {
        super();
        this.app = App;
        this.itemId = itemId;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.app.moveItemUp(this.itemId);
    }

    undoTransaction() {
        this.app.moveItemDown(this.itemId);
    }
}