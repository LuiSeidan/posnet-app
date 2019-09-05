import React from "react";

function DropdownCustomer(props) {
  return (
    <div className="form-group has-search">
      <select
        className="form-control"
        onChange={props.onChange}
        value={props.value}
      >
        {props.options.map(item => (
          <option key={item.ClientId} value={item.ClientId}>
            {item.Name}
          </option>
        ))}
      </select>
    </div>
  );
}
export default DropdownCustomer;
