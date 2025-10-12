import React from "react";

function Friends(props){

    return(
        <li>
            <div>
                <label id={props.id}>{props.name}</label>
            </div>
            <div>
                {/* When clicked on Delete, the function calls delFriend from App.jsx */}
                <button onClick={()=>props.delFriend(props.id)}>Delete</button>
            </div>
        </li>
    )
}

export default Friends