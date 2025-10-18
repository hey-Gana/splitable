import React, { useState } from "react";

function Items(props) {

    // State for AddItems - initially declared as false, waits for user to add item
    // itemAdd - a boolean variable to check if add item button was clicked or not
    // addingItem - function that renders the form to key in item and its price if itemAdd is true
    const [itemAddState, setAddingItemState] = useState(false);

    //State for capturing Item Name and Price input
    // itemName - name of item added
    // addItemName - function that adds the item input
    const [itemName, addItemName] = useState("")
    const [itemPrice, addPrice] = useState("")

    //Handles Form Submission
    function handleSubmit(e) {
        e.preventDefault()
        if (!itemName || !itemPrice) {
            alert("Please enter both item name and price!");
            return;
        }
        props.addItem(itemName, itemPrice)
        addItemName("")
        addPrice("")
        setAddingItemState(false)
    }

    //Handles Input for item name
    function handleChange(e) {
        addItemName(e.target.value)
    }

    //Handles Input for price
    function handlePriceChange(e) {
        addPrice(e.target.value)
    }

    //Conditional Rendering

    // When Add Item button is clicked
    const addItemTemplate = (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Item Name" value={itemName} onChange={handleChange} required />
            <input type="text"
                placeholder="Item Price"
                value={itemPrice}
                onChange={(e) => {
                    const value = e.target.value;
                    // Allow only numbers and at most one decimal point
                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                        handlePriceChange(e);
                    }
                }}
                required
            />

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
