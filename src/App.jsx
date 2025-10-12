import React from "react";
import { useState } from "react";
import { nanoid } from "nanoid";
import Intro from "./components/Intro.jsx";
import Friends from "./components/Friends.jsx";
import FriendsForm from "./components/FriendsForm.jsx";


function App() {
  
  //For State
  //friends - array of multiple friend - accessed by FriendList
  //setFriends -function to add friend to array
  const [friends, setFriends] = useState([])

  //Function to add new friend to the FriendsList Array
  function addFriend(name) {
    //uses nanoid for random string id generation 
    const newFriend = { id: nanoid(), name }
    //appends newFriend to the friendlist array
    setFriends([...friends, newFriend])
    console.log(countFriends + 1)
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

  return (
    <div>
      {/* Introduction of the App */}
      <Intro />

      {/* Friends Form Component - passes the function addFriend as props */}
      <FriendsForm addFriend={addFriend} />

      {/* Friends List Component */}
      <div>
        <ul>
          {FriendsList}
        </ul>
      </div>


      {/* Entering food items & their splits */}
      <div>
        <h3>Items Ordered:</h3>
        <h4>Enter Item Name - </h4>
        <input type="Text" placeholder="Name"></input>
        <h4>Enter Item Cost - </h4>
        <input type="Text" placeholder="Name"></input>
        <br />
        <button>Add</button>
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