import React from "react";
//import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
//import jQuery from 'jquery';

import $ from "jquery";
//window.$ = $;

class UnpostedRecord extends React.Component {
  constructor(props) {
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    //console.log(finalurl);
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      baseUrl: finalurl,
      redirectToReferrer: false
    };
  }

  componentDidMount() {
    //console.log(jQuery.fn.jquery);
    // $.noConflict();
    // 	 var a= $("#table").DataTable();
    // 	 console.log(a);
    //var table = $("#table").DataTable();
    //console.log(finalurl);

    fetch(
      this.state.baseUrl +
        "/laptopzone/reactcontroller/c_react/get_unposted_item"
    )
      .then(res => res.json())
      .then(
        result => {
          //console.log(result);
          this.setState({
            isLoaded: true,
            items: result.get_items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      );
  }

  componentWillMount() {
    if (sessionStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }

  // 	componentDidUpdate(){
  // 	//console.log('3');
  // 	console.log(jQuery.fn.jquery);
  // 	console.log($("#table").DataTable());
  // }

  // 	componentDidUpdate(){
  // 	//console.log('3');
  // 	$('#example').dataTable({
  //   "bAutoWidth": false,
  //   "bDestroy": true,
  // });
  // }

  render() {
    const { error, isLoaded, items } = this.state;

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
              Item
              <small>Recognition</small>
            </h1>
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

          <section className="content">
            <div className="row">
              <div className="col-xs-12">
                <div className="box">
                  <div className="box-header">
                    <h3 className="box-title">Unposted Items</h3>
                  </div>

                  <div className="box-body">
                    <table
                      id="table"
                      className="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Action</th>
                          <th>Barcode Avail</th>
                          <th>Barcode No</th>
                          <th>Condition</th>
                          <th>Object</th>
                          <th>Mpn Desc</th>
                          <th>Mpn</th>
                          <th>Upc</th>
                          <th>Pic Date</th>
                          <th>Pic By</th>
                          <th>Remarks</th>
                          <th>Folder Name</th>
                          <th>Item Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map(item => (
                          <tr key={item.BARCODE_PRV_NO}>
                            {/*<td><Link to={`/varify/${item.BARCODE_PRV_NO}`}><button className="btn btn-info pull-left">Edit</button></Link></td>*/}

                            <td>
                              <Link
                                to={{
                                  pathname: "/varify",
                                  state: {
                                    barcodePass: item.BARCODE_PRV_NO
                                  }
                                }}
                              >
                                <button className="btn btn-info pull-left">
                                  Edit
                                </button>
                              </Link>
                            </td>

                            <td>{item.VERIFY_ITEM}</td>
                            <td>{item.BARCODE_PRV_NO}</td>
                            <td>{item.COND_NAME}</td>
                            <td>{item.OBJECT_NAME}</td>
                            <td>{item.MPN_DESC}</td>
                            <td>{item.MPN}</td>
                            <td>{item.UPC}</td>
                            <td>{item.PIC_DATE_TIME}</td>
                            <td>{item.PIC_BY}</td>
                            <td>{item.REMARKS}</td>
                            <td>{item.FOLDER_NAME}</td>
                            <td>{item.BAROCDE_TYPE}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
export default UnpostedRecord;
