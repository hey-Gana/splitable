import React, { useState, useEffect } from "react";
import styles from "./Tax.module.css";

function Tax({ totalAmt, onTaxChange }) {
  // State
  const [taxType, setTaxType] = useState("");
  const [taxValue, setTaxValue] = useState("");

  // Calculation of tax amount
  useEffect(() => {
    let taxAmt = 0;

    if (taxType === "percentage") {
      taxAmt = totalAmt * (Number(taxValue) / 100);
    } else if (taxType === "amount") {
      taxAmt = Number(taxValue);
    }

    onTaxChange(taxAmt.toFixed(2));
  }, [taxType, taxValue, totalAmt, onTaxChange]);

  // Conditional display
  const taxDisplay = taxType === "percentage" && taxValue !== ""
    ? `Calculated Tax: $${(totalAmt * (Number(taxValue) / 100)).toFixed(2)}`
    : null;

  function handleTaxType(e) {
    setTaxType(e.target.value);
    setTaxValue("");
  }

  function handleTaxInput(e) {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
        setTaxValue(value);
      }
    }
  }

  return (
    <div className={styles.container}>
      <h3>Tax:</h3>

      <div className={styles.radioGroup}>
        <label>
          <input
            type="radio"
            name="taxtype"
            value="percentage"
            checked={taxType === "percentage"}
            onChange={handleTaxType}
          />
          Percentage
        </label>
        <label>
          <input
            type="radio"
            name="taxtype"
            value="amount"
            checked={taxType === "amount"}
            onChange={handleTaxType}
          />
          Amount
        </label>
      </div>

      <input
        type="text"
        placeholder={
          taxType === "percentage"
            ? "Enter tax in %"
            : taxType === "amount"
            ? "Enter tax amount"
            : ""
        }
        value={taxValue}
        onChange={handleTaxInput}
        className={styles.input}
      />

      {taxDisplay && <div className={styles.display}>{taxDisplay}</div>}
    </div>
  );
}

export default Tax;
