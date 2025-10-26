import React, { useState } from "react";

function SplitCalculator({ friends, items, taxAmt, tipAmt }) {
  const [splits, setSplits] = useState([]);

  function SplitCost() {
    //Initializing totals for each friend
    const totals = {};
    friends.forEach(friend => {
      totals[friend.id] = 0.0;
    });

    //Splitting each item's cost
    items.forEach(item => {
      const price = parseFloat(item.price) || 0;
      const tagged = item.taggedFriends && item.taggedFriends.length > 0
        ? item.taggedFriends
        : friends.map(f => f.id); // if not tagged, split among all

      const share = price / tagged.length;

      // Add share to each tagged friend
      tagged.forEach(fid => {
        if (totals[fid] !== undefined) {
          totals[fid] += share;
        }
      });
    });

    //Calculate total subtotal
    const subTotal = Object.values(totals).reduce((sum, val) => sum + val, 0);

    //Computing proportional tax & tip
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

  return (
    <div>
      <button onClick={SplitCost}>Split-a-bill</button>
        {/* Display Splits */}
      {splits.length > 0 && (
        <div>
          <h3>Split Summary</h3>
          
          <ul>
            {splits.map((s, i) => (
              <li key={i}>
                <strong>{s.name}</strong> — 
                Subtotal: ${s.subtotal}, Tax: ${s.tax}, Tip: ${s.tip}, 
                <b> Total: ${s.total}</b>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SplitCalculator;
