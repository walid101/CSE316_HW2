'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewItem_Transaction extends jsTPS_Transaction {
    constructor(App) {
        super();
        this.app = App;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.itemAddedId = this.app.state.nextListItemId;
        this.app.addNewItem();
    }

    undoTransaction() {
        this.app.deleteListItem(this.itemAddedId);
    }
}