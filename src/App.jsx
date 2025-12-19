import React from "react";
import { useState } from "react";
import { nanoid } from "nanoid";

//Global CSS Import
import styles from './App.module.css';
//Intro Section Import
import Intro from "./components/Intro.jsx";
//People Section Import
import Friends from "./components/Friends.jsx";
import FriendsForm from "./components/FriendsForm.jsx";
//Items Section Import
import Items from "./components/Items.jsx";
import ItemsList from "./components/ItemsList.jsx";
//Tax Section Import
import Tax from "./components/Tax.jsx";
//Tips Section Import
import Tips from "./components/Tips.jsx";
//Split Calculation Import
import SplitCalculator from "./components/SplitCalculator.jsx";

function App() {

  //PEOPLE SECTION FUNCTIONS

  //For State
  //friends - array of multiple friend - accessed by FriendList
  //setFriends -function to add friend to array
  const [friends, setFriends] = useState([])

  //Function to add new friend to the FriendsList Array
  function addFriend(name) {
    //can only add maximum of 10 friends
    if (countFriends < 3) {
      //uses nanoid for random string id generation 
      const newFriend = { id: nanoid(), name }
      //appends newFriend to the friendlist array
      setFriends([...friends, newFriend])
      // console.log(countFriends + 1)
    }
    else {
      alert("No more friends can be added!")
    }

  }

  //Function to delete friend from FriendList array and update Items
  function delFriend(id) {
    // console.log(id)
    //Creates an array with all friend that doesnt match with the deleted friend's id
    const remainingFriends = friends.filter((friend) => id !== friend.id)
    setFriends(remainingFriends)
    // console.log(countFriends - 1)

    // Remove friend from all items
    setItem(prevItems =>
      prevItems.map(item => ({
        ...item,
        taggedFriends: item.taggedFriends.filter(fid => fid !== id)
      }))
    );
  }

  //Friends List - accesses friends and maps them to Friends.jsx component
  const FriendsList = friends?.map((friend) =>
  (<Friends
    id={friend.id}
    name={friend.name}
    key={friend.id}
    //passing the delFriend() to Friends.jsx so that it can be called by props
    //callback props
    delFriend={delFriend} />))

  //Count of friends
  const countFriends = FriendsList.length

  //ITEMS SECTION FUNCTIONS

  //For State
  //ListOfItems - array of multiple items and its price added from Items.jsx
  //setItem - function to add item and its price to the ListOfItems array
  const [ListOfItems, setItem] = useState([])

  //Total amount before tax and tips
  let totalAmt = 0;

  //Calculating totalAmt
  for (const item of ListOfItems) {
    totalAmt += Number(item.price || 0)
  }
  // Round totalAmt to 2 decimals
  totalAmt = Math.round(totalAmt * 100) / 100;

  // Conditional display: only show Items Added section if items are added
  const itemsDisplay = ListOfItems.length > 0 ? <h3> Items Added: </h3> : null;

  //Items list - accesses ListOfItems and maps them to ItemsList.jsx component
  const items = ListOfItems?.map((item) =>
  (<ItemsList
    id={item.id}
    name={item.iname}
    price={item.price}
    //passing friends list to ItemsList.jsx
    splitFriends={friends}
    //passing tagged friends to ItemsList.jsx
    taggedFriends={item.taggedFriends}
    key={item.id}
    //passing the delItem() to ItemsList.jsx so that it can be called by props
    //callback props
    delItem={delItem}
    //function to tag friend to items
    //callback props
    tagFriendToItem={tagFriendToItem}
    //function to delete person from item
    removeFriendFromItem={removeFriendFromItem}
    //function to update items portion for each friend tagged
    updateItemPortions={updateItemPortions}
  />))

  //Function to add items 
  function addItem(iname, price) {
    //gets item name, price and taggedFriends list from Items.jsx
    const newItem = { id: nanoid(), iname, price: parseFloat(price), taggedFriends: [] }
    setItem([...ListOfItems, newItem]);
    // console.log(FriendsList)
  }

  //function to delete items
  function delItem(id) {
    //passing the delItem() to ItemsList.jsx so that it can be called by props
    //callback props
    const remainingItems = ListOfItems.filter((item) => id !== item.id)
    setItem(remainingItems)
  }

  //function to tag friends to items
  function tagFriendToItem(itemId, friendId) {
    setItem(prevItems => {
      const newItems = prevItems.map(item => {
        // If item ids match and friend is not already tagged
        if (item.id === itemId && !item.taggedFriends.includes(friendId)) {
          return {
            ...item,
            taggedFriends: [...item.taggedFriends, friendId]
          };
        }
        return item;
      });

      return newItems;
    });
  }

  //function to remove friend from a particular item
  function removeFriendFromItem(itemId, friendId) {
    setItem(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId) {
          // Remove friendId from taggedFriends
          return {
            ...item,
            taggedFriends: item.taggedFriends.filter(id => id !== friendId)
          };
        }
        return item;
      })
    );
  }

  //function to add portions for friends tagged to items
  function updateItemPortions(itemId, portions) {
    setItem(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, portions } : item
      )
    );
  }

  //Taxes Section
  //taxAmt - taxAmt calculated by Tax.jsx
  //setTaxAmt - a function that assigns value to taxAmt
  const [taxAmt, setTaxAmt] = useState(0);

  //Tips Section
  //tipAmt - tipAmt calculated by Tips.jsx
  //setTipAmt - a function that assigns value to tipAmt
  const [tipAmt, setTipAmt] = useState(0);

  return (
    <div className={styles.app}>
      <div className={styles.appContainer}>
        {/* Introduction of the App */}
        <Intro />

        {/* Friends Form Component - passes the function addFriend as props */}
        <FriendsForm addFriend={addFriend} />

        {/* Friends List Component - Displays the friends added*/}
        <div className={styles.section}>
          <ul>
            {FriendsList}
          </ul>
        </div>

        {/* Items Form Component - Entering food items, prices & their splits */}
        <Items addItem={addItem} />

        {/* Items List Component - Displays the Items added*/}
        <div className={styles.section}>
          {/* Conditional Display of Items added heading */}
          {itemsDisplay}

          {ListOfItems.length > 0 && (
            <div className={styles.itemsHeader}>
              <span>Item Name</span>
              <span>Price</span>
              <span>People Tagged</span>
            </div>
          )}

          <ul>
            {items}
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Bill Amount: ${totalAmt.toFixed(2)}</h3>
        </div>

        {/* Entering Tax */}
        <div className={styles.section}>
          {/* passing totalAmt to Tax.jsx */}
          <Tax totalAmt={totalAmt} onTaxChange={setTaxAmt} />
        </div>

        {/* Entering Tips */}
        <div className={styles.section}>
          {/* passing totalAmt to Tips.jsx */}
          <Tips totalAmt={totalAmt} onTipChange={setTipAmt} />
        </div>

        {/* Calculation */}
        <div className={styles.section}>
          <SplitCalculator friends={friends} items={ListOfItems} taxAmt={taxAmt} tipAmt={tipAmt} />
        </div>

        {/* Display Results */}
      </div>
    </div>
  )
}

export default App;
