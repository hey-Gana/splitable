import React, { useState } from "react";

function Tips(props) {
  //State
  //tipType -variable for radio button
  //setTipType - function that sets value for tipType
  const [tipType, setTipType] = useState("");

  //tipValue -variable for text input
  //setTipValue- function that sets value for taxValue
  const [tipValue, setTipValue] = useState("");

  let tipAmt=0;
  //Calculating Tips amount if % is chosen 
  if (tipType === "percentage") {
    tipAmt = props.totalAmt * (Number(tipValue) / 100);
  } else if (tipType === "amount") {
    tipAmt = Number(tipValue);
  }

  // Conditional display: only show tip if % is chosen
  const tipDisplay = tipType === "percentage" && tipValue !== ""
    ? `Calculated Tip: $${(props.totalAmt * (Number(tipValue) / 100)).toFixed(2)}`
    : null;
  
  //Handle radio button change
  function handleTipType(e) {
    setTipType(e.target.value);
    setTipValue(""); // reset input when changing type
  }

  //Handle tax input and restrict to numbers/decimal
  function handleTipInput(e) {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
        //restrict value for % to be between 0 & 100
      if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
        setTipValue(value);
      }
    }
  }




  return (
    <div>
      <h4>Enter Tips</h4>
      <label>
        <input
          type="radio" name="tiptype" value="percentage" onChange={handleTipType} checked={tipType === "percentage"}/>
        Percentage
      </label>
      
      <label>
        <input
          type="radio" name="tiptype" value="amount" onChange={handleTipType} checked={tipType === "amount"}/>
        Amount
      </label>

      <input type="text" placeholder={ tipType === "percentage" ? "Enter tip in %" : tipType === "amount" ? "Enter tip amount" : ""} value={tipValue} onChange={handleTipInput} />
      {/* Displaying Calculated Tip Amount */}
      <div>
        {tipDisplay}
      </div>
    </div>
  );
}

export default Tips;
