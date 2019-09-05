import React, { Component } from "react";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import HomeLayout from "./components/HomeLayout";
import Login from "./components/LoginLayout";
import Main from "./components/Main";
import TableToPrint from "./components/TableToPrint";
import PageSelection from "./components/PageSelection";
import BankPage from "./components/BankPage";
import Discount from "./components/Discount";
import DiscountForm from "./components/DiscountForm";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import moment from "moment";
var _url = "http://132.148.19.159";
var _url_Bank = "http://132.148.19.159:8081";
class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeValueCustomer = this.handleChangeValueCustomer.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrint = this.handlePrint.bind(this);
    this.handleChangeValueCode = this.handleChangeValueCode.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.returnRegisterTable = this.returnRegisterTable.bind(this);
    this.cleanTable = this.cleanTable.bind(this);
    this.checkUserLogged = this.checkUserLogged.bind(this);
    this.handleRegistersPage = this.handleRegistersPage.bind(this);
    this.handleBankPage = this.handleBankPage.bind(this);
    this.handleBackMainPage = this.handleBackMainPage.bind(this);
    this.handleDiscount = this.handleDiscount.bind(this);
    this.handleBackBankPage = this.handleBackBankPage.bind(this);
    this.handleDiscountForm = this.handleDiscountForm.bind(this);
    this.handleBackTableDiscount = this.handleBackTableDiscount.bind(this);
    this.handleAddDiscount = this.handleAddDiscount.bind(this);
    this.handleFormDiscountChange = this.handleFormDiscountChange.bind(this);
    this.handleDiscountSend = this.handleDiscountSend.bind(this);
    this.handleCleanDiscountForm = this.handleCleanDiscountForm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeStartDateDiscount = this.handleChangeStartDateDiscount.bind(
      this
    );
    this.handleChangeEndDateDiscount = this.handleChangeEndDateDiscount.bind(
      this
    );
    this.discountFormSubmit = this.discountFormSubmit.bind(this);

    this.state = {
      user: null,
      usuario: "",
      password: "",

      pageSelection: 0,
      allCustomers: [],
      rememberme: false,
      clientCode: "",
      clientName: "",
      customerId: [],
      showDiscount: false,
      showDiscountForm: false,
      showTable: false,
      valuePosnet: "",
      name: "?",
      valueCustomer: "0",
      loading: false,
      error_description: false,
      discountConcept: "",
      discountType: "",
      discountPercentage: 0,
      discountDateCreated: new Date(),
      discountDateValidity: new Date(),
      dataDiscount: {
        Client: [
          {
            Type: "",
            Concept: "",
            Percentage: 0,
            Date_created: new Date(),
            Date_validity: new Date()
          }
        ]
      },
      dataClients: {
        Entities: [
          {
            ClientId: 0,
            Name: "Seleccione cliente...",
            Code: "0",
            Posnets: [
              {
                PosnetId: 0,
                Number: "0"
              }
            ]
          }
        ]
      },
      defaultOptionClient: {
        ClientId: 0,
        Name: "Seleccione cliente...",
        Code: "0",
        Posnets: [
          {
            PosnetId: 0,
            Number: "0"
          }
        ]
      },
      transactionData: [],
      startDate: new Date(),
      endDate: new Date(),
      transactionDataBank: [],
      transactionDataDiscount: [],
      error: null
    };
  }

  componentWillMount() {
    fetch(_url + "/api/client/Get?posnet=0")
      .then(res => res.json())
      .then(res => this.setState({ allCustomers: res }));
  }

  componentDidMount() {
    localStorage.getItem("userToken");
    localStorage.getItem("userExpires");
  }

  fetchTransactionData = async () => {
    let day = this.state.startDate.getDate();
    let ClientCode = this.state.clientCode;
    if (parseInt(day) < 10) {
      day = "0" + day;
    }
    let month = parseInt(this.state.startDate.getMonth()) + 1;
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    let dayEnd = this.state.endDate.getDate();
    if (parseInt(dayEnd) < 10) {
      dayEnd = "0" + dayEnd;
    }
    let monthEnd = parseInt(this.state.endDate.getMonth()) + 1;
    if (parseInt(monthEnd) < 10) {
      monthEnd = "0" + monthEnd;
    }
    var dateStar = day + "-" + month + "-" + this.state.startDate.getFullYear();
    var dateEnd =
      dayEnd + "-" + monthEnd + "-" + this.state.endDate.getFullYear();
    var appendCode = ClientCode != undefined ? `&clientcode=${ClientCode}` : "";

    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(
        _url +
          `/api/account/Get/${this.state.valueCustomer}?datefrom=${dateStar}&dateTo=${dateEnd}` +
          appendCode
      );
      const transactionData = await response.json();
      this.setState({
        loading: false,
        transactionData: transactionData
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  };

  fetchTransactionDataBank = async () => {
    let day = this.state.startDate.getDate();
    let ClientCode = this.state.clientCode;
    if (parseInt(day) < 10) {
      day = "0" + day;
    }
    let month = parseInt(this.state.startDate.getMonth()) + 1;
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    let dayEnd = this.state.endDate.getDate();
    if (parseInt(dayEnd) < 10) {
      dayEnd = "0" + dayEnd;
    }
    let monthEnd = parseInt(this.state.endDate.getMonth()) + 1;
    if (parseInt(monthEnd) < 10) {
      monthEnd = "0" + monthEnd;
    }
    var dateStar = day + "-" + month + "-" + this.state.startDate.getFullYear();
    var dateEnd =
      dayEnd + "-" + monthEnd + "-" + this.state.endDate.getFullYear();
    var appendCode = ClientCode != undefined ? `&clientcode=${ClientCode}` : "";

    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(
        _url_Bank +
          `/api/account/Get/${this.state.valueCustomer}?datefrom=${dateStar}&dateTo=${dateEnd}&tax=true` +
          appendCode
      );
      const transactionDataBank = await response.json();
      this.setState({
        loading: false,
        transactionDataBank: transactionDataBank
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  };

  fetchTransactionDataDiscount = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(_url_Bank + `/api/tax/Get`);
      const transactionDataDiscount = await response.json();
      this.setState({
        loading: false,
        transactionDataDiscount: transactionDataDiscount
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  };

  fetchCustomersList(typeCustomer) {
    this.setState({ loading: true, error: null });
    try {
      fetch(_url + `/api/client/Get?posnet=${typeCustomer}`)
        .then(response => response.json())
        .then(dataClients => {
          dataClients.Entities.unshift(this.state.defaultOptionClient);

          this.setState({
            loading: false,
            dataClients: dataClients,
            valueCustomer: dataClients.Entities[0].ClientId
          });
        });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  }

  handleChange(e) {
    e.preventDefault();
    var typeCustomer = e.target.value;
    this.fetchCustomersList(typeCustomer);
    this.setState({
      transactionData: [],
      loading: false,
      clientCode: "",
      valuePosnet: typeCustomer
    });
  }
  handleChangeValueCustomer(e) {
    var customerSelected = this.state.dataClients.Entities.find(function(
      element
    ) {
      return element.ClientId == e.target.value;
    });

    this.setState({
      valueCustomer: e.target.value,
      customerId: customerSelected,
      loading: false,
      transactionData: [],
      clientCode: "",
      clientName: ""
    });
  }

  handleChangeValueCode(e) {
    var customerFilterByCode = this.state.allCustomers.Entities.find(function(
      element
    ) {
      return element.Code == e.target.value;
    });
    this.setState({
      clientCode: e.target.value,
      transactionData: [],
      customerId: customerFilterByCode,
      valueCustomer: "0",
      clientName:
        customerFilterByCode !== undefined ? customerFilterByCode.Name : ""
    });
  }

  handleChangeStartDate(date) {
    this.setState({
      startDate: date
    });
  }
  handleChangeEndDate(date) {
    this.setState({
      endDate: date
    });
  }

  handleChangeStartDateDiscount(date) {
    this.setState({
      discountDateCreated: date
    });
  }
  handleChangeEndDateDiscount(date) {
    this.setState({
      discountDateValidity: date
    });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  handleChangeUser(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  setInputRefUser = element => {
    this.inputUser = element;
  };

  setInputRefPass = element => {
    this.inputPass = element;
  };
  handleSignIn = async () => {
    this.setState({ loading: true, error: null });
    try {
      var datos = `username=${this.state.usuario}&password=${this.state.password}&grant_type=password`;
      const response = await fetch(_url + "/OAuth/Token", {
        method: "POST",
        body: datos
      });
      const dataUser = await response.json();
      if (dataUser.access_token !== undefined) {
        this.setState({ user: dataUser, loading: false });
        localStorage.setItem("userToken", this.state.user.access_token);
        localStorage.setItem("userExpires", this.state.user[".expires"]);
      } else {
        this.setState({
          loading: false,
          error_description: true
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  };

  handleSubmit() {
    if (this.state.usuario && this.state.password != null) {
      this.handleSignIn();
      this.setState({
        error_description: undefined,
        loading: true
      });
    } else {
      this.setState({
        error_description: true,
        loading: false
      });
    }
  }

  checkUserLogged() {
    var today = new Date();
    var userDateExpires = moment(localStorage.getItem("userExpires")).toDate();
    return (
      (this.state.user != null && this.state.user != undefined) ||
      (localStorage.getItem("userToken") != null &&
        today.getTime() <= userDateExpires.getTime())
    );
  }

  handleLogout() {
    this.setState({
      user: null,
      usuario: undefined,
      password: undefined,
      transactionData: "",
      clientCode: "",
      valueCustomer: "0",
      valuePosnet: "-1",
      pageSelection: 0,
      showDiscount: false,
      showDiscountForm: false,
      startDate: new Date(),
      endDate: new Date()
    });
    localStorage.clear();
  }

  handlePrint() {
    this.setState({
      showTable: true
    });
  }

  returnRegisterTable() {
    this.setState({
      showTable: false
    });
  }

  cleanTable() {
    this.setState({
      transactionData: []
    });
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleSubmit();
    }
  };

  handleDiscount(e) {
    this.setState({
      showDiscount: true
    });
  }

  handleDiscountSend(e) {
    e.preventDefault();
  }

  setInputRefCode = element => {
    this.inputCode = element;
  };

  setInputRefType = element => {
    this.inputType = element;
  };

  setInputRefPercentage = element => {
    this.inputType = element;
  };

  handleFormDiscountChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleAddDiscount(e) {
    {
      if (
        this.state.discountConcept &&
        this.state.discountType &&
        this.state.discountPercentage &&
        this.state.discountDateCreated &&
        this.state.discountDateValidity != null
      ) {
        this.discountFormSubmit();
      } else {
        alert("Los campos estan vacios");
      }
    }
    this.setState({
      showDiscountForm: false,
      showDiscount: true
    });
  }

  discountFormSubmit = async () => {
    this.setState({ loading: true, error: null });
    let day = this.state.discountDateCreated.getDate();
    if (parseInt(day) < 10) {
      day = "0" + day;
    }
    let month = parseInt(this.state.discountDateCreated.getMonth()) + 1;
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    let dayEnd = this.state.discountDateValidity.getDate();
    if (parseInt(dayEnd) < 10) {
      dayEnd = "0" + dayEnd;
    }
    let monthEnd = parseInt(this.state.discountDateValidity.getMonth()) + 1;
    if (parseInt(monthEnd) < 10) {
      monthEnd = "0" + monthEnd;
    }
    var dateStar =
      this.state.discountDateCreated.getFullYear() + "-" + month + "-" + day;
    var dateEnd =
      this.state.discountDateValidity.getFullYear() +
      "-" +
      monthEnd +
      "-" +
      dayEnd;
    try {
      var datos = {
        Type: this.state.discountType,
        Concept: this.state.discountConcept,
        Percentage: this.state.discountPercentage,
        Date_created: dateStar,
        Date_validity: dateEnd
      };
      var myHeaders = new Headers();
      debugger;
      myHeaders.append("Content-Type", "application/json; charset=utf-8");
      const response = await fetch(_url_Bank + "/api/tax/PostTax", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: myHeaders
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  };

  handleDelete(TaxId) {
    const data = this.state.transactionDataDiscount.Entities.filter(
      i => i.id !== TaxId.id
    );
    this.setState({
      transactionDataDiscount: data
    });
  }

  handleDiscountForm(e) {
    this.setState({
      showDiscountForm: true,
      showDiscount: false,
      [e.target.name]: e.target.value
    });
  }

  handleCleanDiscountForm() {
    this.setState({
      discountConcept: "",
      discountType: "",
      discountPercentage: "",
      discountDateCreated: new Date(),
      discountDateValidity: new Date()
    });
  }

  handleBackTableDiscount(e) {
    e.preventDefault();
    this.setState({
      showDiscountForm: false,
      showDiscount: true
    });
  }

  handleBankPage() {
    var typeCustomer = "2";
    this.fetchCustomersList(typeCustomer);
    this.setState({
      pageSelection: 2,
      valuePosnet: typeCustomer,
      loading: false
    });
  }

  handleBackBankPage(e) {
    this.setState({
      showDiscount: false
    });
  }

  handleBackMainPage(e) {
    e.preventDefault();
    this.setState({
      transactionData: "",
      clientCode: "",
      valueCustomer: "0",
      valuePosnet: "-1",
      pageSelection: 0,
      startDate: new Date(),
      endDate: new Date()
    });
  }

  handleRegistersPage() {
    this.setState({
      pageSelection: 1
    });
  }

  render() {
    if (this.state.error) {
      return `Error: ${this.state.error.message}`;
    }

    var options = [
      {
        name: "Select…",
        value: "-1"
      },
      {
        name: "Con Posnet",
        value: "2"
      },
      {
        name: "Sin Posnet",
        value: "1"
      },
      {
        name: "Todos",
        value: "0"
      }
    ];

    const columns = [
      {
        Header: "Fecha Comprobante",
        accessor: "ReceiptDateFormat",
        className: "centerCell"
      },
      {
        Header: "N Comprobante",
        accessor: "ReceiptNumber",
        className: "centerCell"
      },
      {
        Header: "Tipo",
        accessor: "ReceiptType",
        className: "centerCell"
      },
      {
        Header: "Debe",
        accessor: "Debit",
        className: "centerCell"
      },
      {
        Header: "Haber",
        accessor: "Assets",
        className: "centerCell"
      },
      {
        Header: "Saldo",
        accessor: "Subtotal",
        className: "centerCell"
      }
    ];

    const BankColumns = [
      {
        Header: "Fecha Comprobante",
        accessor: "ReceiptDateFormat",
        className: "centerCell"
      },
      {
        Header: "N Comprobante",
        accessor: "ReceiptNumber",
        className: "centerCell"
      },
      {
        Header: "Tipo",
        accessor: "ReceiptType",
        className: "centerCell"
      },
      {
        Header: "Debe",
        accessor: "Debit",
        className: "centerCell"
      },
      {
        Header: "Haber",
        accessor: "Assets",
        className: "centerCell"
      },
      {
        Header: "Saldo",
        accessor: "Subtotal",
        className: "centerCell"
      }
    ];

    const discountColumns = [
      {
        Header: "Concepto",
        accessor: "Concept",
        className: "centerCell"
      },
      {
        Header: "Tipo",
        accessor: "Type",
        className: "centerCell"
      },
      {
        Header: "Porcentaje de Descuento",
        accessor: "Percentage",
        className: "centerCell"
      },
      {
        Header: "Fecha de inicio",
        accessor: "Date_created",
        className: "centerCell"
      },
      {
        Header: "Fecha fin",
        accessor: "Date_validity",
        className: "centerCell"
      },
      {
        Header: "Editar",
        accessor: "Edit",
        className: "centerCell",
        Cell: row => (
          <div>
            <button className="btn-primary">
              <FaPencilAlt size={22} style={{ color: "#FFF" }} />
            </button>
          </div>
        )
      },
      {
        Header: "Borrar",
        accessor: "Delete",
        className: "centerCell",
        Cell: TaxId => (
          <div>
            <button className="btn-primary">
              <FaTrashAlt
                onClick={() => this.handleDelete(TaxId.original)}
                size={22}
                style={{ color: "#FFF" }}
              />
            </button>
          </div>
        )
      }
    ];

    if (this.state.showTable) {
      return (
        <TableToPrint
          transactionData={this.state.transactionData}
          optionsCustomer={this.state.dataClients.Entities}
          dataHeader={this.state.customerId}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChangeUser}
          returnTable={this.returnRegisterTable}
        />
      );
    }

    if (this.state.showDiscount == true) {
      return (
        <Discount
          handleBackBankPage={this.handleBackBankPage}
          handleLogout={this.handleLogout}
          dataHeader={this.state.customerId}
          loading={this.state.loading}
          data={this.state.transactionDataDiscount.Entities}
          columns={discountColumns}
          loading={this.state.loading}
          showDiscountForm={this.handleDiscountForm}
          data={this.state.transactionDataDiscount.Entities}
          onClickFetchTransactionDataDiscount={() =>
            this.fetchTransactionDataDiscount()
          }
          cleanTable={this.handleCleanDiscountForm}
        />
      );
    }

    if (this.state.showDiscountForm == true) {
      return (
        <DiscountForm
          handleBackTableDiscount={this.handleBackTableDiscount}
          handleAddDiscount={this.handleAddDiscount}
          change={this.handleFormDiscountChange}
          discountConcept={this.state.discountConcept}
          discountType={this.state.discountType}
          discountPercentage={this.state.discountPercentage}
          discountDateCreated={this.state.discountDateCreated}
          discountDateValidity={this.state.discountDateValidity}
          setRefCode={this.setInputRefCode}
          setRefType={this.setInputRefType}
          setRefPercentage={this.setInputRefPercentage}
          handleDiscountSend={this.handleDiscountSend}
          handleLogout={this.handleLogout}
          selected={this.state.discountDateCreated}
          startDate={this.state.discountDateCreated}
          endDate={this.state.discountDateValidity}
          handleChangeStartDate={this.handleChangeStartDateDiscount}
          selectedEndDate={this.state.discountDateValidity}
          onChangeEndDate={this.handleChangeEndDateDiscount}
          onClickFetchTransactionDataDiscount={() =>
            this.fetchTransactionDataDiscount()
          }
        />
      );
    }

    if (this.state.pageSelection == 1) {
      return (
        <Main
          handleLogout={this.handleLogout}
          handleChange={this.handleChange}
          valuePosnet={this.state.valuePosnet}
          options={options}
          onChangeCustomer={this.handleChangeValueCustomer}
          valueCustomer={this.state.valueCustomer}
          optionsCustomer={this.state.dataClients.Entities}
          selected={this.state.startDate}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          handleChangeStartDate={this.handleChangeStartDate}
          selectedEndDate={this.state.endDate}
          onChangeEndDate={this.handleChangeEndDate}
          minDate={this.state.startDate}
          maxDate={this.state.startDate}
          loading={this.state.loading}
          onClickFetchTransactionData={() => this.fetchTransactionData()}
          data={this.state.transactionData.Entities}
          columns={columns}
          dataTable={this.state.dataTable}
          handleToggle={this.handleToggle}
          isOpen={this.state.dropdownOpen}
          transactionData={this.state.transactionData}
          handlePrint={this.handlePrint}
          handleChangeValueCode={this.handleChangeValueCode}
          valueClientCode={this.state.clientCode}
          buttonPrint={this.state.buttonPrint}
          handlePage={this.handlePage}
          allCustomers={this.state.allCustomers}
          cleanTable={this.cleanTable}
          backMainPage={this.handleBackMainPage}
        />
      );
    }

    if (this.state.pageSelection == 2) {
      return (
        <BankPage
          transactionLots={this.state.transactionLots}
          handleLogout={this.handleLogout}
          handleChange={this.handleChange}
          valuePosnet={this.state.valuePosnet}
          options={options}
          columns={BankColumns}
          onChangeCustomer={this.handleChangeValueCustomer}
          valueCustomer={this.state.valueCustomer}
          optionsCustomer={this.state.dataClients.Entities}
          selected={this.state.startDate}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          handleChangeStartDate={this.handleChangeStartDate}
          selectedEndDate={this.state.endDate}
          onChangeEndDate={this.handleChangeEndDate}
          minDate={this.state.startDate}
          maxDate={this.state.startDate}
          loading={this.state.loading}
          onClickFetchTransactionDataBank={() =>
            this.fetchTransactionDataBank()
          }
          onClickFetchTransactionDataDiscount={() =>
            this.fetchTransactionDataDiscount()
          }
          data={this.state.transactionDataBank.Entities}
          columns={columns}
          dataTable={this.state.dataTable}
          handleToggle={this.handleToggle}
          isOpen={this.state.dropdownOpen}
          transactionData={this.state.transactionData}
          handlePrint={this.handlePrint}
          handleChangeValueCode={this.handleChangeValueCode}
          valueClientCode={this.state.clientCode}
          buttonPrint={this.state.buttonPrint}
          handlePage={this.handlePage}
          allCustomers={this.state.allCustomers}
          cleanTable={this.cleanTable}
          backMainPage={this.handleBackMainPage}
          lotsFilter={this.handleChangeValueLots}
          valueLots={this.state.customerLots}
          handleDiscount={this.handleDiscount}
        />
      );
    }

    return (
      <HomeLayout>
        {this.checkUserLogged() ? (
          <PageSelection
            registersPage={this.handleRegistersPage}
            bankPage={this.handleBankPage}
          />
        ) : (
          <Login
            setRefUser={this.setInputRefUser}
            setRefPass={this.setInputRefPass}
            handleChange={this.handleChangeUser}
            handleSubmit={this.handleSubmit}
            loading={this.state.loading}
            errorDescription={this.state.error_description}
            usuario={this.state.usuario}
            password={this.state.password}
            handleKeyPress={this.handleKeyPress}
          />
        )}
      </HomeLayout>
    );
  }
}

export default App;
