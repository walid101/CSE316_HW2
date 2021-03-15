// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS' // WE NEED THIS TOO

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'

//IMPORT TRANSACTIONS HERE
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction'
import AddNewClose_Transaction from './transactions/AddNewClose_Transaction'

{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);
    //this.myRef = React.createRef();
    // DISPLAY WHERE WE ARE
    console.log("App constructor");
    this.deleteListMod = this.deleteListMod.bind(this);
    this.addNewItemTransaction = this.addNewItemTransaction.bind(this);
    this.moveItemUp = this.moveItemUp.bind(this);
    this.moveItemDown = this.moveItemDown.bind(this);
    this.deleteListItem = this.deleteListItem.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.addNewCloseTransaction = this.addNewCloseTransaction.bind(this);
    this.revertClose = this.revertClose.bind(this);
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);//list of lists
    //We want to always make sure top list is colored, rest is black! How to get the div elem?
    
    for(let i = 0; i<this.state.toDoLists.length; i++)
    {
      if(this.state.toDoLists[i].id == toDoList.id)
      {this.state.toDoLists[i].color = '#ffc819'}
      else{this.state.toDoLists[i].color = '#353a44';}
    }
    
    this.setState({
      toDoLists: nextLists,
      currentList: toDoList
    });
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    //[...newToDoListInList, ...this.state.toDoLists];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListsList[0];
    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    }, this.afterToDoListsChangeComplete);
  }

  makeNewToDoList = () => {
    //console.log("new ListId Prev: " + this.highListId);
    let newToDoList = {
      id: this.state.nextListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      description: "No Description",
      dueDate: "Enter Date",
      status: "incomplete",
      id: this.state.nextListItemId
    };
    return newToDoListItem;
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recent_work", toDoListsString);
  }

  deleteListMod()
  {
    console.log("Delete the List!");
    //check if current list is null, if so nothing to do
    //once we implement fool proof design ^ probably wont be needed
    if(this.state.currentList != null)
    {
      let nextLists = this.state.toDoLists.filter(testList =>
        testList.id !== this.state.currentList.id
      );
      //list gone
      //nextLists.unshift(toDoList);//list of lists
      //We want to always make sure top list is colored, rest is black! How to get the div elem?
      
      for(let i = 0; i<nextLists.length; i++)
      {
        nextLists[i].color = '#353a44';
      }
      
      this.setState({
        toDoLists: nextLists,
        currentList: null
      });
    }
  }
  addNewItem()
  {
    if(this.state.currentList!=null)
    {
      let newList = this.state.currentList;
      newList.items.push(this.makeNewToDoListItem());
      //newList.unshift(this.makeNewToDoListItem());//append a new Item!
      this.setState({
        currentList: newList,
        nextListItemId: this.state.nextListItemId + 1
      });
    } 
  }
  moveItemUp(itemId)
  {
    //console.log("Move Item Up! at id: " + itemId);
    if(itemId != this.state.currentList.items[0].id)//if not first one
    {
      let currList = this.state.currentList.items;
      let newList = this.state.currentList;
      for(let i = 0; i<currList.length; i++)
      {
        if(currList[i].id === itemId)//found the one
        {
          let prevItem = newList.items[i-1];
          newList.items[i-1] = currList[i];
          newList.items[i] = prevItem;
          i = currList.length + 1;
        }
      }
      this.setState({
        currentList: newList
      });
    }
    else
    {
      //make arrow color black (fool proof design);
    }
  }
  moveItemDown(itemId)
  {
    if(itemId != this.state.currentList.items[this.state.currentList.items.length-1].id)//if not first one
    {
      let currList = this.state.currentList.items;
      let newList = this.state.currentList;
      for(let i = 1; i<currList.length; i++)
      {
        if(currList[i-1].id === itemId)//found the one
        {
          let nextItem = newList.items[i];
          newList.items[i] = currList[i-1];
          newList.items[i-1] = nextItem;
          i = currList.length + 1;
        }
      }
      this.setState({
        currentList: newList
      });
    }
    else
    {
      //make arrow color black (fool proof design);
    }
  }
  deleteListItem(itemId)
  {
    let currList = this.state.currentList.items;
    if(currList.length > 0)
    {
      let nextList = this.state.currentList;
      nextList.items = nextList.items.filter(testItem =>
        testItem.id !== itemId
      );
      this.setState({
        currentList: nextList
      });
    }
  }
  addNewItemTransaction()
  {
    let transaction = new AddNewItem_Transaction(this);
    this.tps.addTransaction(transaction);
  }

  addNewCloseTransaction(itemId)
  {
    let items = null;
    let index = -1;
    let currList = this.state.currentList.items;
    for(let i = 0; i<currList.length; i++)
    {
      if(currList[i].id === itemId)//found
      {
        items = currList[i];
        index = i;
        i = currList.length + 1;
      }
    }
    console.log("itemId: " + itemId);
    console.log("itemIndex: " + index);
    console.log("itemsDesc: " + items.description);
    let transaction = new AddNewClose_Transaction(this, items, index);
    this.tps.addTransaction(transaction);
  }
  revertClose(items, index)
  {
    //console.log("revert Item Deletion!");
    let currList = this.state.currentList.items;
    let newList = this.state.currentList;
    //newList.items = [...currList[0, index], items, ...currList[index+1]];
    newList.items = [];
    let counter = 0;
    for(let i = 0; i<currList.length + 1; i++)
    {
      if(index !== i)
      {
        newList.items.push(currList[counter]);
        counter++;
      }
      else
      {
        newList.items.push(items);
      }
    }
    //console.log("newItems: " + newList.items);
    this.setState({
      currentList: newList
    });
  }

  /**
     * Undo the most recently done transaction if there is one.
     */
   undo() {
    if (this.tps.hasTransactionToUndo()) {
        this.tps.undoTransaction();
    }
  }  
    /**
     * Redo the current transaction if there is one.
     */
     redo() {
      if (this.tps.hasTransactionToRedo()) {
          this.tps.doTransaction();
      }
  }   
  render() {
    let items;
    if(this.state.currentList != null)
    {items = this.state.currentList.items;}
    else{items = [];}
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
        />
        <Workspace 
          toDoListItems={items} 
          deleteListMod = {this.deleteListMod}
          addNewItemTransaction = {this.addNewItemTransaction}
          moveItemUp = {this.moveItemUp}
          moveItemDown = {this.moveItemDown}
          deleteListItem = {this.deleteListItem}
          addNewCloseTransaction = {this.addNewCloseTransaction}
          undo = {this.undo}
          redo = {this.redo}
        />
      </div>
    );
  }
}

export default App;