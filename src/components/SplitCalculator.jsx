import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import styles from "./SplitCalculator.module.css";

function SplitCalculator({ friends, items, taxAmt, tipAmt }) {
  const [splits, setSplits] = useState([]);
  const summaryRef = useRef();

  function SplitCost() {
    // Initializing totals for each friend
    const totals = {};
    friends.forEach(friend => {
      totals[friend.id] = 0.0;
    });

    // Splitting each item's cost
    items.forEach(item => {
      const price = parseFloat(item.price) || 0;

      if (item.taggedFriends && item.taggedFriends.length > 0) {
        // Prepare portions, default to 1 if not set
        const portions = {};
        item.taggedFriends.forEach(fid => {
          portions[fid] = item.portions && item.portions[fid] ? item.portions[fid] : 1;
        });

        const totalWeight = Object.values(portions).reduce((sum, w) => sum + Number(w), 0);

        Object.entries(portions).forEach(([fid, weight]) => {
          if (totals[fid] !== undefined && totalWeight > 0) {
            totals[fid] += (price * weight) / totalWeight;
          }
        });
      } else {
        // fallback: split equally among all friends if none tagged
        const tagged = friends.map(f => f.id);
        const share = price / tagged.length;
        tagged.forEach(fid => { totals[fid] += share; });
      }
    });

    // Calculate total subtotal
    const subTotal = Object.values(totals).reduce((sum, val) => sum + val, 0);

    // Computing proportional tax & tip
    const results = friends.map(friend => {
      const sub = totals[friend.id];
      const taxShare = subTotal > 0 ? (sub / subTotal) * taxAmt : 0;
      const tipShare = subTotal > 0 ? (sub / subTotal) * tipAmt : 0;
      const total = sub + taxShare + tipShare;

      return {
        name: friend.name,
        subtotal: sub.toFixed(2),
        tax: taxShare.toFixed(2),
        tip: tipShare.toFixed(2),
        total: total.toFixed(2),
      };
    });

    setSplits(results);
  }

  function exportPDF() {
    if (!summaryRef.current) return;

    summaryRef.current.style.position = "static";
    summaryRef.current.style.left = "auto";

    html2pdf()
      .set({
        margin: 12,
        filename: `SplitBill_${Date.now()}.pdf`,
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(summaryRef.current)
      .save();
  }

  return (
    <div className={styles.container}>
      {/* Calls SplitCost function */}
      <button className={styles.button} onClick={SplitCost}>Split-a-bill</button>

      {splits.length > 0 && (
        <>
          <button className={styles.button} onClick={exportPDF}>Export PDF</button>

          {/* PDF CONTENT */}
          <div ref={summaryRef} className={styles.container}>
            <h2 className={styles.sectionTitle}>Split-a-Bill Summary</h2>
            <p>Generated on {new Date().toLocaleDateString()}</p>

            {/* Food Items Table */}
            <h3 className={styles.sectionTitle}>Food Items Ordered</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Item</th>
                  <th className={styles.th}>Price ($)</th>
                  <th className={styles.th}>Split Details</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => {
                  const itemName = item?.iname || "Unnamed Item";
                  const itemPrice = item?.price !== undefined ? item.price : "0.00";
                  const portionsObj = item?.portions || {};

                  return (
                    <tr key={idx}>
                      <td className={styles.td}>{itemName}</td>
                      <td className={styles.td}>{itemPrice}</td>
                      <td className={styles.td}>
                        {item.taggedFriends?.length > 0 ? (
                          <ul style={{ paddingLeft: "16px", margin: 0 }}>
                            {item.taggedFriends.map(fid => (
                              <li key={fid}>
                                {friends.find(f => f.id === fid)?.name || "Unknown"} — Portion {portionsObj[fid] || 1}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span>Split equally</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Charges Table */}
            <h3 className={styles.sectionTitle}>Charges</h3>
            <table className={styles.table} style={{ width: "50%" }}>
              <tbody>
                <tr>
                  <td className={styles.td}>Subtotal</td>
                  <td className={styles.td}>${splits.reduce((sum, s) => sum + Number(s.subtotal), 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className={styles.td}>Tax</td>
                  <td className={styles.td}>${Number(taxAmt).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className={styles.td}>Tip</td>
                  <td className={styles.td}>${Number(tipAmt).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            {/* Split Summary Table */}
            <h3 className={styles.sectionTitle}>Split Summary</h3>
            <table className={styles.table} style={{ width: "60%" }}>
              <thead>
                <tr>
                  <th className={styles.th}>Person</th>
                  <th className={styles.th}>Total Owed ($)</th>
                </tr>
              </thead>
              <tbody>
                {splits.map((s, i) => (
                  <tr key={i}>
                    <td className={styles.td}>{s.name}</td>
                    <td className={styles.td}><strong>${s.total}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default SplitCalculator;
