import React from "react";

function ItemsList(props) {
    const { id, name, splitFriends } = props;
    return (
        <li>
            <div>
                <label id={props.id}>{props.name} - {props.price}</label>
            </div>
            <div>
                <button onClick={()=>props.delItem(props.id)}>Delete Item</button>
            </div>
            <div>
                Add Friends
            </div>
        </li>
    )
}

export default ItemsList;