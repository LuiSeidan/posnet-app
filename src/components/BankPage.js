import React from "react";
import "../App.css";
import DropdownCustomer from "./DropdownCustomer";
import ReactTable from "react-table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomerCode from "./CustomerCode";
import NavbarBank from "./NavbarBank";

export default function BankPage(props) {
  return (
    <div>
      <NavbarBank
        handleLogout={props.handleLogout}
        backMainPage={props.backMainPage}
        discount={props.handleDiscount}
        fetchDiscount={props.onClickFetchTransactionDataDiscount}
        data={props.data}
      />
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-md-auto col-lg-4 col-xl-4 mt-2 dropdown">
            <div className="mt-2">
              <DropdownCustomer
                onChange={props.onChangeCustomer}
                value={props.valueCustomer}
                options={props.optionsCustomer}
              />
              <div>
                <CustomerCode
                  onChangeCustomer={props.onChangeCustomer}
                  onChange={props.handleChangeValueCode}
                  value={props.valueClientCode}
                  onBlur={props.onClickFetchTransactionData}
                  options={props.optionsCustomer}
                />
              </div>
            </div>
          </div>
          <div className="mx-auto col-8 col-md-2 col-lg-2 col-xl-2 mt-2 date-desde">
            <label htmlFor="exampleFormControlSelect1">Desde:</label>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              locale="es"
              selected={props.selected}
              selectsStart
              startDate={props.startDate}
              endDate={props.endDate}
              maxDate={props.endDate}
              onChange={props.handleChangeStartDate}
            />
          </div>
          <div className="mx-auto col-8 col-md-3 col-lg-2 col-xl-2 mt-2 date-hasta">
            <label htmlFor="exampleFormControlSelect1">Hasta:</label>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              locale="es"
              selected={props.selectedEndDate}
              selectsEnd
              startDate={props.startDate}
              endDate={props.endDate}
              onChange={props.onChangeEndDate}
              minDate={props.minDate}
            />
          </div>
          <div className="col-8 col-md-2 co-lg-2 col-xl-2 my-2 button-table">
            {props.loading ? (
              <button
                type="button"
                className="btn btn-primary "
                onClick={() => {
                  props.cleanTable();
                  props.onClickFetchTransactionDataBank();
                }}
              >
                Cargando
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary "
                onClick={() => {
                  props.cleanTable();
                  props.onClickFetchTransactionDataBank();
                }}
              >
                Buscar
              </button>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-sm mb-5">
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
              filterable={props.filterable}
            />
            {props.data && (
              <button
                onClick={() => props.handlePrint()}
                type="button"
                className="btn btn-block btn-danger"
              >
                Vista Previa
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
