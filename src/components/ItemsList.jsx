import React from "react";

function ItemsList(props) {
    const { id, name, splitFriends } = props;

    function handleDropDownOption(e) {
        //passing the item's id and friend's id to App.jsx by calling tagFriendToItem()
        // console.log("From Item:",e.target.value)
        props.tagFriendToItem(props.id, e.target.value)
        //resets the DropDown option
        e.target.value = "";
    }

    return (
        <li>
            <div>
                <label id={props.id}>{props.name} - {props.price}</label>
            </div>
            {/* <div>
                <strong>Split Between:</strong>

            </div> */}

            <div>
                <h3> People Tagged:</h3>
                <select defaultValue="" onChange={handleDropDownOption}>
                    <option value="" disabled>
                        Tag People
                    </option>
                    {/* Accessing splitFriends passed from app.jsx ; mapping it to drop down by accessing the object's properties - id and name */}
                    {props.splitFriends.map((friend) => (
                        <option key={friend.id} value={friend.id}>
                            {friend.name}
                        </option>
                    ))}
                </select>
                <p>
                    Tagged Friends:{" "}
                    {props.taggedFriends.length > 0
                        ? props.taggedFriends
                            .map(id => {
                                const f = props.splitFriends.find(friend => friend.id === id);
                                return f ? f.name : "";
                            })
                            .join(", ")
                        : "None"}
                </p>
            </div>

            <div>
                <button onClick={() => props.delItem(props.id)}>Delete Item</button>
            </div>
        </li>
    )
}

export default ItemsList;