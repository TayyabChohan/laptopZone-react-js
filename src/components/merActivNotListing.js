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

class MerActivNotListing extends React.Component {
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
    $.ajax({
            url:  this.state.baseUrl+"/laptopzone/reactcontroller/c_react/mer_active_not_listed",
            dataType: 'json',
          type: 'POST',
            data:{'merchId':sessionStorage.getItem("merId")},
            success: function(data) {
              if(data.exist == true){              
              this.setState({
              isLoaded: true,
               items: data.merhc_activ_not_list
              }) 
              }else{
                alert('error');
                return false;
                this.setState({
                isLoaded: false,
             
              });

              }

                
            }.bind(this),
            error: function(xhr, resp, text) {
                //show error to console
                console.log(xhr,resp,text);
            }
        });

  
  }

  componentWillMount() {
    if (sessionStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }

  //  componentDidUpdate(){
  //  //console.log('3');
  //  console.log(jQuery.fn.jquery);
  //  console.log($("#table").DataTable());
  // }

  //  componentDidUpdate(){
  //  //console.log('3');
  //  $('#example').dataTable({
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
              Active
              <small>Listed</small>
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
              <li className="active">Active Listed</li>
            </ol>
          </section>

          <section className="content">
            <div className="row">
              <div className="col-xs-12">
                <div className="box">
                  <div className="box-header">
                    <h3 className="box-title">Active Listed</h3>
                  </div>

                  <div className="box-body">
                    <table
                      id="table"
                      className="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                                                    
                          <th>Picture</th>
                          <th>Barcode No</th>
                          <th>Item Description</th>
                          <th>Condition</th>
                          <th>Item Manufacture</th>
                          <th>Mpn</th>
                          <th>Upc</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {items.map(item => (
                          <tr key={item.BARCODE_NO}>                            
                            <td><div  style={{
                                      width: "100px",
                                      height: "70px",
                                      float: "left",
                                      overflow: " hidden",
                                      position: "relative"
                                    }}>
                                </div>
                            </td>
                            <td>{item.BARCODE_NO}</td>                            
                            <td>{item.ITEM_DESC}</td>                                                        
                            <td>{item.CONDITION_ID}</td>
                            <td>{item.ITEM_MT_MANUFACTURE}</td>
                            <td>{item.ITEM_MT_MFG_PART_NO}</td>
                            <td>{item.ITEM_MT_UPC}</td>
                            
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
export default MerActivNotListing;
