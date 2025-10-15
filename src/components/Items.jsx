import React, { useState } from "react";

function Items(props) {

    // State for AddItems - initially declared as false, waits for user to add item
    // itemAdd - a boolean variable to check if add item button was clicked or not
    // addingItem - function that renders the form to key in item and its price if itemAdd is true
    const [itemAddState, setAddingItemState] = useState(false);

    //State for capturing Item Name and Price input
    // itemName - name of item added
    // addItem - function that adds the item input
    const [itemName,addItem] = useState("")

    //Handles Form Submission
    function handleSubmit(e){
        e.preventDefault()
        props.addItem(itemName)
        addItem("")
        setAddingItemState(false)
    }

    //Handles Input into text box 
    function handleChange(e){
        addItem(e.target.value)
    }

    // When Add Item button is clicked
    const addItemTemplate = (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Item Name" value={itemName} onChange={handleChange} required/>
            <button type="Submit">Save</button>
            <button type="button" onClick={() => setAddingItemState(false)}>Cancel</button>
        </form>
    );

    // Normal State
    const normalStateTemplate = (
        <div>
            <button onClick={() => setAddingItemState(true)}>Add Item</button>
        </div>
    );

    return (
        // if itemAdd is true, render addItemTemplate else render normalStateTemplate
        <div>
            {itemAddState ? addItemTemplate : normalStateTemplate}
        </div>
    );
}

export default Items;
