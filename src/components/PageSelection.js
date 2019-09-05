import React from "react";
import logo from "../image/logo.JPG";

export default function PageSelection(props) {
  return (
    <div className="text-center">
      <div className="col">
        <img src={logo} alt="distribuidora-img" id="distribuidora-logo" />
      </div>
      <div className="col-mx btn-index">
        <button
          className="btn btn-lg btn-primary text-uppercase"
          onClick={props.registersPage}
          style={{ marginRight: "20px" }}
        >
          cuentas corrientes
        </button>
        <button
          className="btn btn-lg btn-info text-uppercase btn-bancaria"
          onClick={props.bankPage}
        >
          conciliacion bancaria
        </button>
      </div>
    </div>
  );
}
