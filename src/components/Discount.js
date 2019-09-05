import React from "react";
import NavbarDiscount from "./NavbarDiscount";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default function Discount(props) {
  return (
    <div>
      <NavbarDiscount
        backDiscountPage={props.handleBackBankPage}
        handleLogout={props.handleLogout}
        fetchDiscount={props.onClickFetchTransactionDataDiscount}
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10 mx-auto col-md-6 col-lg-4">
            <h4
              className="text-uppercase text-center"
              style={{
                textDecoration: "underline",
                textDecorationColor: "#3F51B5"
              }}
            >
              descuento
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-sm mt-5">
            <ReactTable
              pageText={"Pagina"}
              ofText={"de"}
              rowsText={"Registros"}
              previousText={"Anterior"}
              nextText={"Siguiente"}
              noDataText={"No se encontraron registros"}
              defaultPageSize={10}
              data={props.data}
              columns={props.columns}
              loading={props.loading}
              filterable={true}
            />
            <button
              className="btn btn-lg btn-primary text-capitalize float-right my-3"
              onClick={e => {
                props.showDiscountForm(e);
                props.cleanTable(e);
              }}
            >
              agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
