import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import Select from "react-select";
import swal from "sweetalert";
import "./node_modules/react-phone-number-input/style.css";
import PhoneInput, { formatPhoneNumber } from "react-phone-number-input";


class DownloadOrders extends Component {
  constructor(props) {
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
    super(props);
    //that = this;
    this.state = {
      names: "",
      records: [],
      error: null,
      isLoaded: true,
      baseUrl: finalurl,
      redirectToReferrer: false, 
      error: false,
      
    };
  }

  


  componentWillMount() {
    if (localStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }

  render() {
  
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
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
            Download Orders
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <p>Home</p>
              </li>
              <li className="active">Download Orders</li>
            </ol>
          </section>

          <section className="content">
            <div className="row">
              <div className="col-sm-12">
                <div className="box">
                  <div className="box-header with-border">
                    <h3 className="box-title">Download Orders</h3>
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

                  <div className="box-body" style={{ padding_left: "12%" }}>
                    <form onSubmit={this.handleChangeOnSubmmit}>
                   
                      <div className="col-sm-12">
                        <div className="col-sm-2">
                        
                        <a href={'http://71.78.236.20/laptopzone/cron_job/c_cron_job/downloadOrders/1'} className='btn btn-primary' target='_blank' getSellerOrders style={{width:'100%'}} >techbargains2015</a>
                        
                        </div>
                       
                        <div className="col-sm-1">
                    
                        <a href={'http://71.78.236.20/laptopzone/cron_job/c_cron_job/downloadOrders/2'} className='btn btn-primary' target='_blank' getSellerOrders >dfwonline</a>
                        
                        </div> 

                        <div className="col-sm-1">
                         
                           <a href={'http://71.78.236.20/laptopzone/cron_job/c_cron_job/downloadOrders/3'} className='btn btn-primary' target='_blank' getSellerOrders >bosslp3</a>
                        </div>
     
                        <div className="col-sm-1">
                         
                           <a href={'http://71.78.236.20/laptopzone/cron_job/c_cron_job/downloadOrders/4'} className='btn btn-primary' target='_blank' getSellerOrders >All</a>
                        </div>

                        <div className="col-sm-7">
                         
                        <a href={'http://71.78.236.20/laptopzone/cron_job/c_cron_job/downloadOrders/4'} className='btn btn-primary pull-right' target='_blank' getSellerOrders >Sync to App</a>
                        </div>

                      </div>
                    </form>
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


export default DownloadOrders
  

