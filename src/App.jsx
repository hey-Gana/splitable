import React from "react";
import { useState } from "react";
import { nanoid } from "nanoid";

import Intro from "./components/Intro.jsx";
//People Section Import
import Friends from "./components/Friends.jsx";
import FriendsForm from "./components/FriendsForm.jsx";
//Items Section Import
import Items from "./components/Items.jsx";
import ItemsList from "./components/ItemsList.jsx";


function App() {

  //PEOPLE SECTION FUNCTIONS
  
  //For State
  //friends - array of multiple friend - accessed by FriendList
  //setFriends -function to add friend to array
  const [friends, setFriends] = useState([])

  //Function to add new friend to the FriendsList Array
  function addFriend(name) {
    //can only add maximum of 10 friends
    if(countFriends<3){
        //uses nanoid for random string id generation 
        const newFriend = { id: nanoid(), name }
        //appends newFriend to the friendlist array
        setFriends([...friends, newFriend])
        console.log(countFriends + 1)
    }
    else{
      alert("No more friends can be added!")
    }
   
  }

  //Function to delete friend from FriendList array
  function delFriend(id) {
    // console.log(id)
    //Creates an array with all friend that doesnt match with the deleted friend's id
    const remainingFriends = friends.filter((friend) => id !== friend.id)
    setFriends(remainingFriends)
    console.log(countFriends - 1)
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

  const [ListOfItems,setItem] = useState([])
  

  const items = ListOfItems?.map((item) => 
  (<ItemsList 
    id={item.id}
    name={item.iname}
    price={item.price}
    splitFriends = {friends}
    key={item.id}
    delItem={delItem}
   />))
  
  //Function to add items 
  function addItem(iname,price){
    const newItem = {id:nanoid(), iname, price: parseFloat(price)}
    setItem([...ListOfItems,newItem]);
    console.log(FriendsList)
  }

  //function to delete items
  function delItem(id){
    //passing the delItem() to ItemsList.jsx so that it can be called by props
    //callback props
    const remainingItems = ListOfItems.filter((item) => id !== item.id)
    setItem(remainingItems)
  }

  return (
    <div>
      {/* Introduction of the App */}
      <Intro />

      {/* Friends Form Component - passes the function addFriend as props */}
      <FriendsForm addFriend={addFriend} />

      {/* Friends List Component - Displays the friends added*/}
      <div>
        <ul>
          {FriendsList}
        </ul>
      </div>


      {/* Items Form Component - Entering food items, prices & their splits */}
      <Items addItem={addItem} />

      
      {/* Items List Component - Displays the Items added*/}
      <div>
        <h3> Items Added: </h3>
        <ul>
         {items}
        </ul>
      </div>


      {/* Entering Tax % and Tips */}
      <div>
        <h3>Tax & Tips:</h3>
        <h4>Enter Tax Amount - </h4>
        <input type="Text" placeholder="Name"></input>
        <h4>Enter Tips -</h4>
        <input type="Text" placeholder="Name"></input>
      </div>

      {/* Calculation */}
      <button>Splitable</button>

      {/* Display Results */}
      <div>
        <h3>Split:</h3>
        <p>
          Gana: 3.14$
          <br />
          Hero1: 12$
          <br />
          Hero2: 7.2$
          <br />
          <button>Share Receipt</button>
        </p>
      </div>
    </div>
  )
}
export default App;