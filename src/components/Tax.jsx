import React, { useState } from "react";

function Tax(props) {
  //State
  //taxType -variable for radio button
  //setTaxType - function that sets value for taxType
  const [taxType, setTaxType] = useState("");

  //taxValue -variable for text input
  //setTaxValue- function that sets value for taxValue
  const [taxValue, setTaxValue] = useState("");

  let taxAmt = 0;
  //Calculating Tax amount if % is chosen 
  if (taxType === "percentage") {
    taxAmt = props.totalAmt * (Number(taxValue) / 100);
  } else if (taxType === "amount") {
    taxAmt = Number(taxValue);
  }

// Conditional display: only show tax if % is chosen
  const taxDisplay = taxType === "percentage" && taxValue !== ""
    ? `Calculated Tax: $${(props.totalAmt * (Number(taxValue) / 100)).toFixed(2)}`
    : null;

  //Handle radio button change
  function handleTaxType(e) {
    setTaxType(e.target.value);
    setTaxValue(""); // reset input when changing type
  }

  //Handle tax input and restrict to numbers/decimal
  function handleTaxInput(e) {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      //restrict value for % to be between 0 & 100
      if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
        setTaxValue(value);
      }
    }
  }


  return (
    <div>
      <h4>Enter Tax</h4>
      <label>
        <input
          type="radio" name="taxtype" value="percentage" onChange={handleTaxType} checked={taxType === "percentage"} />
        Percentage
      </label>
      <label>
        <input
          type="radio" name="taxtype" value="amount" onChange={handleTaxType} checked={taxType === "amount"} />
        Amount
      </label>

      <input type="text" placeholder={taxType === "percentage" ? "Enter tax in %" : taxType === "amount" ? "Enter tax amount" : ""} value={taxValue} onChange={handleTaxInput} />
      {/* Displaying Calculated Tax Amount */}
      <div>
        {taxDisplay}
      </div>
    </div>
  );
}

export default Tax;