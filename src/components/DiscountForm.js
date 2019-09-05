import React from "react";
import NavbarDiscountForm from "./NavbarDiscountForm";
import DatePicker from "react-datepicker";

export default function DiscountForm(props) {
  return (
    <div>
      <NavbarDiscountForm handleLogout={props.handleLogout} />
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-6 col-lg-6 my-5">
            <form>
              <div className="form-group">
                <label htmlFor="codigo">Concepto</label>
                <input
                  type="text"
                  className="form-control"
                  id="codigoDescuento"
                  name="discountConcept"
                  placeholder=""
                  ref={props.setRefCode}
                  value={props.discountConcept}
                  onChange={props.change}
                />
                <label htmlFor="tipo">Tipo</label>
                <input
                  type="text"
                  className="form-control"
                  id="tipoDescuento"
                  name="discountType"
                  ref={props.setRefType}
                  value={props.discountType}
                  onChange={props.change}
                />
                <label htmlFor="porcentaje-descuento">
                  Porcentaje de descuento
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="porcentaje-descuento"
                  name="discountPercentage"
                  ref={props.setRefPercentage}
                  value={props.discountPercentage}
                  onChange={props.change}
                />
                <label htmlFor="fecha-inicio" className="my-2">
                  Fecha de inicio:
                </label>
                <div className="mx-auto">
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
                <div className="justify-content-md-right">
                  <label htmlFor="fecha-fin" className="my-2">
                    Fecha fin:
                  </label>
                  <div className="mx-auto">
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
                </div>
              </div>
              <button
                type="button"
                id="agregar-descuento"
                className="btn btn-lg btn-primary text-capitalize mx-1 my-1"
                onClick={() => {
                  props.onClickFetchTransactionDataDiscount();
                  props.handleAddDiscount();
                }}
              >
                agregar descuento
              </button>
              <button
                id="cancelar-descuento"
                className="btn btn-lg btn-danger text-capitalize mx-1 my-2"
                onClick={props.handleBackTableDiscount}
              >
                cancelar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
