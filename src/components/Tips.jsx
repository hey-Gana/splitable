import React, {useState} from "react";

function Tips() {

    const [tipValue, setTipValue] = useState("");

    // Handle tip input (also numeric only)
    function handleTipInput(e) {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setTipValue(value);
        }
    }

    return (
        <div>
            Tips:
            <input type="text" placeholder="Enter tip amount" value={tipValue} onChange={handleTipInput} />
        </div>
    )
}

export default Tips