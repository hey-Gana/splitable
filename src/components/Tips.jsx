import React, { useState, useEffect } from "react";
import styles from "./Tax.module.css"; // Reusing Tax.module.css

function Tips({ totalAmt, onTipChange }) {
  // State
  const [tipType, setTipType] = useState("");
  const [tipValue, setTipValue] = useState("");

  // Calculation of tip amount
  useEffect(() => {
    let tipAmt = 0;

    if (tipType === "percentage") {
      tipAmt = totalAmt * (Number(tipValue) / 100);
    } else if (tipType === "amount") {
      tipAmt = Number(tipValue);
    }

    onTipChange(tipAmt.toFixed(2));
  }, [tipType, tipValue, totalAmt, onTipChange]);

  const tipDisplay = tipType === "percentage" && tipValue !== ""
    ? `Calculated Tip: $${(totalAmt * (Number(tipValue) / 100)).toFixed(2)}`
    : null;

  function handleTipType(e) {
    setTipType(e.target.value);
    setTipValue("");
  }

  function handleTipInput(e) {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
        setTipValue(value);
      }
    }
  }

  return (
    <div className={styles.container}>
      <h3>Tips:</h3>

      <div className={styles.radioGroup}>
        <label>
          <input
            type="radio"
            name="tiptype"
            value="percentage"
            checked={tipType === "percentage"}
            onChange={handleTipType}
          />
          Percentage
        </label>
        <label>
          <input
            type="radio"
            name="tiptype"
            value="amount"
            checked={tipType === "amount"}
            onChange={handleTipType}
          />
          Amount
        </label>
      </div>

      <input
        type="text"
        placeholder={
          tipType === "percentage"
            ? "Enter tip in %"
            : tipType === "amount"
            ? "Enter tip amount"
            : ""
        }
        value={tipValue}
        onChange={handleTipInput}
        className={styles.input}
      />

      {tipDisplay && <div className={styles.display}>{tipDisplay}</div>}
    </div>
  );
}

export default Tips;
