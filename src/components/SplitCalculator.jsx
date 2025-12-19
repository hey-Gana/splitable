import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

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
  //function to export to PDF
  function exportPDF() {
    if (!summaryRef.current) return;

    // Temporarily show PDF content (needed for html2canvas)
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

  // Table styles
  const th = {
    border: "1px solid #ccc",
    padding: "8px",
    backgroundColor: "#f5f5f5",
    textAlign: "left",
  };
  const td = {
    border: "1px solid #ccc",
    padding: "8px",
  };

  return (
    <div>
      {/* Calls SplitCost function */}
      <button onClick={SplitCost}>Split-a-bill</button>

      {/* Display Splits */}
      {splits.length > 0 && (
        <>
          {/* Export PDF button */}
          <button onClick={exportPDF}>Export PDF</button>

          {/* PDF CONTENT */}
          <div
            ref={summaryRef}
            style={{
              padding: "24px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: "12px",
              lineHeight: "1.6",
              color: "#222",
            }}
          >
            {/* HEADER */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
              <img
                // src="/logo.png"
                alt=""
                style={{ width: "60px", marginRight: "16px" }}
              />
              <div>
                <h2 style={{ margin: 0 }}>Split-a-Bill Summary</h2>
                <p style={{ margin: 0, fontSize: "11px", color: "#555" }}>
                  Generated on {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <hr />

            {/* Food Items Table */}
            <h3>Food Items Ordered</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
              <thead>
                <tr>
                  <th style={th}>Item</th>
                  <th style={th}>Price ($)</th>
                  <th style={th}>Split Details</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => {
                  const itemName = item?.iname || "Unnamed Item";
                  const itemPrice = item?.price !== undefined ? item.price : "0.00";
                  const portionsObj = item?.portions || {};

                  return (
                    <tr key={idx}>
                      <td style={td}>{itemName}</td>
                      <td style={td}>{itemPrice}</td>
                      <td style={td}>
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
            <h3>Charges</h3>
            <table style={{ width: "50%", borderCollapse: "collapse", marginBottom: "20px" }}>
              <tbody>
                <tr>
                  <td style={td}>Subtotal</td>
                  <td style={td}>
                    ${splits.reduce((sum, s) => sum + Number(s.subtotal), 0).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td style={td}>Tax</td>
                  <td style={td}>${Number(taxAmt).toFixed(2)}</td>
                </tr>
                <tr>
                  <td style={td}>Tip</td>
                  <td style={td}>${Number(tipAmt).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            {/* Split Summary Table */}
            <h3>Split Summary</h3>
            <table style={{ width: "60%", borderCollapse: "collapse", marginBottom: "30px" }}>
              <thead>
                <tr>
                  <th style={th}>Person</th>
                  <th style={th}>Total Owed ($)</th>
                </tr>
              </thead>
              <tbody>
                {splits.map((s, i) => (
                  <tr key={i}>
                    <td style={td}>{s.name}</td>
                    <td style={td}><strong>${s.total}</strong></td>
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
