'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewClose_Transaction extends jsTPS_Transaction {
    constructor(App, Items, Index) {
        super();
        this.app = App;
        this.items = Items;
        this.currIndex = Index;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.app.deleteListItem(this.items.id);
    }

    undoTransaction() {
        this.app.revertClose(this.items, this.currIndex);
    }
}