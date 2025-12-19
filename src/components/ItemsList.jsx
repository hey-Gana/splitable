import React, { useState } from "react";

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

    //setting the portion value for the person with friendId
    setPortions(prev => ({
      ...prev,
      [friendId]: intVal,
    }));

    //parent update - passing it on to parent: App.jsx
    props.updateItemPortions(props.id, {
      ...portions,
      [friendId]: intVal,
    });
  }


  return (
    <li>
      <div>
        <label id={props.id}>
          {props.name} - ${props.price}
        </label>
      </div>

      <div>
        <h3>
          People Tagged:
          <select defaultValue="" onChange={handleDropDownOption}>
            <option value="" disabled>
              Tag People
            </option>
            {/* Displays friends list */}
            {props.splitFriends.map(friend => (
              <option key={friend.id} value={friend.id}>
                {friend.name}
              </option>
            ))}
          </select>
        </h3>
        {/* If any friend is tagged, display friend name,slider and remove button ; else split equally */}
        {props.taggedFriends.length > 0 ? (
          props.taggedFriends.map(id => {
            const friend = props.splitFriends.find(f => f.id === id);
            if (!friend) return null;

            return (
              <div key={friend.id}>
                {/* when clicked on friend name: toggle slidervisibility */}
                <span onClick={() => toggleSlider(friend.id)}>
                  {friend.name}
                </span>
                {/* for friend with slider visibility, set their portion  */}
                {sliderVisibility[friend.id] && (
                  <div>
                    <label>Portion size: {portions[friend.id] || 1}</label>
                    <input type="range" min="1" max="5" value={portions[friend.id] || 1} onChange={e => handlePortionChange(friend.id, e.target.value)} />
                  </div>
                )}

                {/* remove button for friend tagged to item */}
                <button onClick={() => props.removeFriendFromItem(props.id, friend.id)}>
                  x
                </button>

              </div>
            );
          })
        ) : (
          <p>Split Equally</p>
        )}
      </div>

      <div>
        {/* Delete item from Item List */}
        <button onClick={() => props.delItem(props.id)}>Delete Item</button>
      </div>
    </li>
  );
}

export default ItemsList;
