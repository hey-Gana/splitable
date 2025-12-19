import React, { useState } from "react";
import styles from "./ItemsList.module.css";

function ItemsList(props) {
  const { id, name, splitFriends } = props;

  // for slider visibility (friendId : true/false)
  const [sliderVisibility, setSliderVisibility] = useState({});

  // for slider values (friendId : integer(portion value))
  const [portions, setPortions] = useState({});

  // Add friend to item
  function handleDropDownOption(e) {
    props.tagFriendToItem(props.id, e.target.value);
    e.target.value = "";
  }

  // Toggle visibility of slider for each friend
  function toggleSlider(friendId) {
    setSliderVisibility(prev => ({
      ...prev,
      [friendId]: !prev[friendId],
    }));
  }

  // Update slider (portion) value
  function handlePortionChange(friendId, value) {
    const intVal = parseInt(value);

    setPortions(prev => ({
      ...prev,
      [friendId]: intVal,
    }));

    //pass to parent
    props.updateItemPortions(props.id, {
      ...portions,
      [friendId]: intVal,
    });
  }

  return (
    <li className={styles.itemRow}>
      {/* Item name */}
      <div className={styles.columnName}>
        <label id={props.id}>{name}</label>
      </div>

      {/* Item price */}
      <div className={styles.columnPrice}>
        <label>${props.price}</label>
      </div>

      {/* People Tagged */}
      <div className={styles.columnTagged}>
        <select className={styles.selectTag} defaultValue="" onChange={handleDropDownOption}>
          <option value="" disabled>
            Tag People
          </option>
          {splitFriends.map(friend => (
            <option key={friend.id} value={friend.id}>
              {friend.name}
            </option>
          ))}
        </select>

        {props.taggedFriends.length > 0 ? (
          props.taggedFriends.map(id => {
            const friend = splitFriends.find(f => f.id === id);
            if (!friend) return null;

            return (
              <div key={friend.id} className={styles.sliderContainer}>
                <span className={styles.infoIcon} onClick={() => toggleSlider(friend.id)}>ℹ️</span>
                <span>{friend.name}</span>

                {sliderVisibility[friend.id] && (
                  <div>
                    <label className={styles.portionLabel}>Portion size: {portions[friend.id] || 1}</label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={portions[friend.id] || 1}
                      onChange={e => handlePortionChange(friend.id, e.target.value)}
                    />
                  </div>
                )}

                <button
                  className={styles.deleteButton}
                  onClick={() => props.removeFriendFromItem(props.id, friend.id)}
                >
                  x
                </button>
              </div>
            );
          })
        ) : (
          <p style={{marginLeft: "6px"}}>Split Equally</p>
        )}
      </div>

      {/* Delete button */}
      <div>
        <button className={styles.deleteButton} onClick={() => props.delItem(props.id)}>
          Delete Item
        </button>
      </div>
    </li>
  );
}

export default ItemsList;
