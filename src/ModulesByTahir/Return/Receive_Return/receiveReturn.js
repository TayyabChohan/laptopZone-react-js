import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";
import notify from "../../Functions/notify";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import { ToastsContainer, ToastsStore } from "react-toasts";

var that = "";
export class ActionFormatter extends Component {
  constructor(props) {
    super(props);
  }
  action = (cell, row) => {
    that.setState({
      marchId: cell
    });
    that.setRedirect();
  };
  render() {
    return (
      <React.Fragment>
        <button
          title="Open Request"
          className="btn btn-primary"
          onClick={() => {
            this.action(this.props.cell, this.props.row);
          }}
          value={this.props.cell}
        >
          <span
            className="glyphicon glyphicon-retweet p-b-5"
            aria-hidden="true"
          />
        </button>
      </React.Fragment>
    );
  }
}

function actionFormatter(cell, row) {
  return <ActionFormatter cell={cell} row={row} />;
}
function returnView(cell, row) {
  return <button className="btn btn-primary btn-block btn-sm">{cell}</button>;
}
function junkView(cell, row) {
  return <button className="btn btn-danger btn-block btn-sm">{cell}</button>;
}

class ReceiveReturn extends Component {
  constructor(props) {
    super(props);
    that = this;
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    this.state = {
      baseUrl: finalurl,
      allRequest: [],
      marchId: "",
      redirect: false
    };
  }
  componentWillMount() {
    //   $("#cataCashMenu").html("<span class='red'>Hello <b>Again</b></span>");
    this.getReceiveRequests();
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  getReceiveRequests = () => {
    const { baseUrl } = this.state;
    let merch_id = localStorage.getItem("merId");
    let insertUrl =
      baseUrl +
      "/laptopzone/reactcontroller/c_receiveReturn/getReceiveRequests";
    new Promise(function(resolve, reject) {
      $.ajax({
        url: insertUrl,
        dataType: "json",
        type: "POST",
        data: {
          merch_id: merch_id
        }
      }).then(
        function(data) {
          resolve(data);
        },
        function(err) {
          reject(err);
        }
      );
    })
      .then(result => {
        $.LoadingOverlay("hide");
        if (result.found) {
          this.setState({
            allRequest: result.allRequests
          });
        } else {
          notify("error", result.message);
        }
      })
      .catch(err => {
        $.LoadingOverlay("hide");
        console.log(err);
      });
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/allRequests",
            state: { merchantId: this.state.marchId }
          }}
        />
      );
    }
    const { allRequest } = this.state;
    const options = {
      paginationShowsTotal: true,
      page: 1, // which page you want to show as default
      sizePerPage: 25, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5, // the pagination bar size.
      prePage: "Prev", // Previous page button text
      nextPage: "Next", // Next page button text
      firstPage: "First", // First page button text
      lastPage: "Last", // Last page button text
      prePageTitle: "Go to previous", // Previous page button title
      nextPageTitle: "Go to next", // Next page button title
      firstPageTitle: "Go to first", // First page button title
      lastPageTitle: "Go to Last", // Last page button title
      paginationPosition: "top", // default is bottom, top and both is
      sizePerPageList: [
        {
          text: "25",
          value: 25
        },
        {
          text: "50",
          value: 50
        },
        {
          text: "100",
          value: 100
        },
        {
          text: "All",
          value: allRequest.length
        }
      ]
    };
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} />
        <section className="content-header">
          <h1>
            Receive Return <small>Control Panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/merchantDashboard">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>Receiving</li>
            <li className="active">
              <Link to="/receiveReturn">Receive Return</Link>
            </li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Merchant Return Requests</h3>
                </div>
                <div className="box-body">
                  <BootstrapTable
                    data={allRequest}
                    pagination
                    search
                    tableHeaderclassName="my-header-class"
                    columnWidth="100%"
                    options={options}
                  >
                    <TableHeaderColumn
                      dataField="MERCHANT_ID"
                      isKey={true}
                      dataFormat={actionFormatter}
                      width="10%"
                    >
                      Action
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="BUISNESS_NAME" width="15%">
                      Merchant Name
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="RETURN_REQUEST"
                      width="15%"
                      dataFormat={returnView}
                    >
                      Return Requests
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="JUNK_REQUEST"
                      width="15%"
                      dataFormat={junkView}
                    >
                      Junk Requests
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="TOTAL_RETURN"
                      width="15%"
                      dataFormat={returnView}
                    >
                      Total Return
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="TOTAL_JUNK"
                      width="15%"
                      dataFormat={junkView}
                    >
                      Total Junk
                    </TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default ReceiveReturn;
