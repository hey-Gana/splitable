import React, { useState } from "react";

function FriendsForm(props) {

    //For State
    //fname - variable for friend name
    //setFriend - function for adding friend name
    const [fname,setFriend] = useState("")

    //when user submits the form for adding friends
    function handleSubmission(event) {
        event.preventDefault();
        //callback props used to call addFriend from App.jsx
        props.addFriend(fname)
        //after adding, state is setback to ""
        setFriend("")
    }


    //When User inputs into text box 
    function handleName(event) {
        //extracting the name from the text box input
        setFriend(event.target.value)
    }


    return (
        <div>
            <h3>People:</h3>
            <h4>Enter Name - </h4>
            <form onSubmit={handleSubmission}>
                <input type="Text" placeholder="Name" onChange={handleName} value={fname}></input>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default FriendsForm