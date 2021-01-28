import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import  {getService , insertService ,deleteService} from "../../actions/actions.js";
import SweetAlert from "react-bootstrap-sweetalert";
import swal from "sweetalert";
//import { error } from '../actions/actions.js';

const action = {
  getService,
  insertService,
  deleteService
};

class ActionFormatter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      error: ""
    };
  }
  // handleButtonDelete=(SERVICE_ID)=>{

  //         this.props.deleteService(SERVICE_ID);
  //         console.log(SERVICE_ID);
  //           }
  render() {
    return (
      <button
        className="btn btn-danger"
        onClick={() => this.handleButtonDelete(this.props.row.SERVICE_ID)}
      >
        Delete
      </button>
    );
  }
}

function actionFormatter(cell, row) {
  return (
    <button
      className="btn btn-danger"
      call="list"
      id="item_list"
      onClick={() => that.click(cell, row)}
    >
      Delete
    </button>
  );
}
var that = "";

class BilingSetup extends Component {
  constructor(props) {
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    super(props);
    that = this;
    this.state = {
      names: "",
      records: [],
      error: null,
      isLoaded: true,
      baseUrl: finalurl,
      redirectToReferrer: false,
      error: false
    };

    this.formHandler = this.formHandler.bind(this);
    this.handleChangebutton = this.handleChangebutton.bind(this);
    this.click = this.click.bind(this);
  }

  click = (cell, row) => {
    // {if (window.confirm('Are you sure ?'))this.click('list')}
    swal({
      title: "Are you Sure?",
      text: "Once deleted, you will not be able to recover this Data!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.deleteService(cell);
      } else {
      }
    });
    // alert("Are You Sure! ");
  };
  formHandler(event) {
    this.setState({
      names: event.target.value
    });
  }

  handleChangebutton = event => {
    event.preventDefault();
    const data = {
      name: this.state.names,
      created_by: localStorage.getItem("userId")
    };

    this.props.insertService(data);
    this.setState({
      names: ""
    });
  };
  handleOnClose = () => {
    this.setState({
      ...this.state,
      open: false
    });
  };

  componentWillMount() {
    if (localStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }

  componentDidMount() {
    this.props.getService();
  }
  renderShowsTotal(start, to, total) {
    return (
      <p style={{ color: "#696969" }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    );
  }
  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    const options = {
      page: 1, // which page you want to show as default
      sizePerPageList: [
        {
          text: "5",
          value: 5
        },
        {
          text: "10",
          value: 10
        },
        {
          text: "15",
          value: 15
        },
        {
          text: "20",
          value: 20
        },
        {
          text: "25",
          value: 25
        },
        {
          text: "All",
          value: this.props.records.length
        }
      ], // you can change the dropdown list for size per page
      sizePerPage: 10, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5, // the pagination bar size.
      prePage: "Prev", // Previous page button text
      nextPage: "Next", // Next page button text
      firstPage: "<<", // First page button text
      lastPage: ">>", // Last page button text
      prePageTitle: "Go to previous", // Previous page button title
      nextPageTitle: "Go to next", // Next page button title
      firstPageTitle: "Go to first", // First page button title
      lastPageTitle: "Go to Last", // Last page button title
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      paginationPosition: "bottom", // default is bottom, top and both is all available
      clearSearch: true
      // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
    };
    //  console.log(this.state);
    const enable = this.state.names > 4;

    const { error, isLoaded, records } = this.state;
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    if (error) {
      return <div> Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <section className="content-header">
          <h1>LOADING......</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-dashboard" /> Home
              </a>
            </li>
            <li>
              <a href="#">Tables</a>
            </li>
            <li className="active">Unposted Items</li>
          </ol>
        </section>
      );
    } else {
      return (
        <React.Fragment>
          <section className="content-header">
            <h1>
              Jeannie Services
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active">Jeannie Services</li>
            </ol>
          </section>

          <section className="content">
            <div className="row">
              <div className="col-sm-12">
                <div className="box">
                  <div className="box-header with-border">
                    <h3 className="box-title">Add Service</h3>
                    <div className="box-tools pull-right">
                      <button
                        type="button"
                        className="btn btn-box-tool"
                        data-widget="collapse"
                      >
                        <i className="fa fa-minus" />
                      </button>
                    </div>
                  </div>

                  <div className="box-body">
                    <div className="col-sm-12">
                      <form onSubmit={this.handleChangebutton}>
                        <div className="col-sm-4">
                          <label>Service Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="names"
                            onChange={this.formHandler}
                            value={this.state.names}
                            placeholder="Name"
                            id="names"
                            required
                          />
                        </div>
                        <div className="col-sm-4">
                          <br />

                          <button
                            type="submit"
                            style={{ width: "50%" }}
                            className="btn btn-primary btn-md"
                          >
                            {" "}
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="box">
                  <br />

                  <div className="row">
                    <div className="col-sm-12">
                      <BootstrapTable
                        data={this.props.records}
                        // footerData={footerData}
                        // footer
                        pagination
                        search
                        options={options}

                        // deleteRow={true}
                        //selectRow={selectRowProp}
                        //options={options}
                      >
                        <TableHeaderColumn
                          width="20%"
                          export={false}
                          isKey={true}
                          dataFormat={actionFormatter}
                          dataField="SERVICE_ID"
                        >
                          Action
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="20%"
                          dataSort={true}
                          dataField="SERVICE_DESC"
                        >
                          Service Name
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="20%"
                          dataSort={true}
                          dataField="CREATED_DATE"
                        >
                          Date{" "}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width="20%"
                          dataSort={true}
                          dataField="USER_NAME"
                        >
                          Created By
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      );
    }
  }
}
//
const mapStateToProps = state => {
  return {
    records: state.billingSetupReducer.records,
    error: state.billingSetupReducer.error
    // open: state.billingSetupReducer.open
  };
};

export default connect(
  mapStateToProps,
  action
)(BilingSetup);
