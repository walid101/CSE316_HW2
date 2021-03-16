'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewStat_Transaction extends jsTPS_Transaction {
    constructor(App, itemId, currStatus, prevStatus) {
        super();
        this.app = App;
        this.itemId = itemId;
        this.currStat = currStatus;
        this.prevStat = prevStatus;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.app.addNewStat(this.itemId, this.currStat);
    }

    undoTransaction() {
        this.app.revertStat(this.itemId, this.prevStat);
    }
}