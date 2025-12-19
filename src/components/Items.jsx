import React, { useState } from "react";
import styles from "./ItemsForm.module.css";

function Items(props) {
    //State for capturing Item Name and Price input
    const [itemName, addItemName] = useState("");
    const [itemPrice, addPrice] = useState("");

    //Handles Form Submission
    function handleSubmit(e) {
        e.preventDefault();
        if (!itemName || !itemPrice) {
            alert("Please enter both item name and price!");
            return;
        }
        props.addItem(itemName, itemPrice);
        addItemName("");
        addPrice("");
    }

    //Cancel button clears inputs
    function handleCancel() {
        addItemName("");
        addPrice("");
    }

    return (
        <div className={styles.container}>
            <h3>Items:</h3>

            {/* Always show Add Item form */}
            <form onSubmit={handleSubmit}>
                <h4>Item Name:</h4>
                <input
                    type="text"
                    value={itemName}
                    onChange={e => addItemName(e.target.value)}
                    placeholder="Enter item name"
                    required
                    className={styles.input}
                />

                <h4>Item Price:</h4>
                <input
                    type="text"
                    value={itemPrice}
                    onChange={e => {
                        const value = e.target.value;
                        if (value === '' || /^\d*\.?\d*$/.test(value)) {
                            addPrice(value);
                        }
                    }}
                    placeholder="Enter price"
                    required
                    className={styles.input}
                />

                <button type="submit" className={styles.button}>Save</button>
                <button type="button" onClick={handleCancel} className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
            </form>
        </div>
    );
}

export default Items;
