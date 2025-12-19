import React from "react";
import styles from "./Friends.module.css";

function Friends(props){

    return(
        <li>
            <div className={styles.friendItem}>
                <span className={styles.name}>{props.name}</span>
                {/* When clicked on Delete, the function calls delFriend from App.jsx */}
                <button 
                    onClick={() => props.delFriend(props.id)} 
                    className={styles.deleteButton}
                >
                    Delete
                </button>
            </div>
        </li>
    )
}

export default Friends
