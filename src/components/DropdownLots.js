import React from "react";

function DropdownLots(props) {
  return (
    <div className="form-group has-search">
      <select className="form-control">
        {props.transactionData.Entities.map(item => (
          <option key={item.key}>{item.ReceiptType}</option>
        ))}
      </select>
    </div>
  );
}
export default DropdownLots;
