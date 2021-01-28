import React, { Component } from "react";
import PostData from "./PostData.js";
import "../conponentByTayyab/login.css";
import { Redirect } from "react-router-dom";
var CHECKLOGIN = "";
class Login extends React.Component {
  constructor(props) {
    super(props);
    CHECKLOGIN = localStorage.getItem("login");
    this.state = {
      username: "",
      password: "",
      // accountType:'',
      redirectToReferrer: false
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login() {
    if (this.state.username && this.state.password) {
      PostData("login", this.state.username, this.state.password).then(
        result => {
          // let responseJSON = result;

          if (result) {
            // console.log(result);
            // console.log(result[0].EMPLOYEE_ID);
            // console.log(result[0].USER_NAME);
            // console.log(result[0].MER_ID);
            // console.log(result[0].MER_NAME);
            sessionStorage.setItem("userName", result[0].USER_NAME);
            sessionStorage.setItem("userId", result[0].EMPLOYEE_ID);
            sessionStorage.setItem("accountId", this.state.accountType);
            sessionStorage.setItem("merName", result[0].MER_NAME);
            sessionStorage.setItem("merId", result[0].MER_ID);
            localStorage.setItem("userName", result[0].USER_NAME);
            localStorage.setItem("userId", result[0].EMPLOYEE_ID);
            localStorage.setItem("accountId", this.state.accountType);
            localStorage.setItem("merName", result[0].MER_NAME);
            localStorage.setItem("merId", result[0].MER_ID);
            localStorage.setItem("login", "true");
            CHECKLOGIN = true;
            
            this.setState({
              redirectToReferrer: true
            });
            window.location.href = "/";
          } else {
            alert("Login Error");
            return false;
          }
        }
      );
    } else {
      alert("Enter Username Or Password");
      return false;
    }
    // }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    
  }
  
  render() {
    
     if (!CHECKLOGIN) {
      return (
        <React.Fragment>
          {/* <div className="login-box"> */}

          <div className="login-box-body loginbox">
            <div className="myclass">
              <div className="col-sm-12">
                <div className="row">
                  <div className="col-sm-4" />
                  {/* <div className='col-md-4'>
         <a href='#'><img src='../../src/logo.png' /></a>
        </div> */}
                  <div className="col-sm-4" />

                  <div className="clearfix" />

                  <div className="col-sm-4" />
                  <div className="col-sm-4 inputReact">
                    <p className="login-box-msg">
                      Sign in to Start Your Session
                    </p>

                    <div className="form-group has-feedback">
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Username"
                        onChange={this.onChange}
                      />
                      <span className="glyphicon glyphicon-envelope form-control-feedback" />
                    </div>
                  </div>
                  <div className="col-sm-4" />

                  <div className="clearfix" />

                  <div className="col-sm-4" />
                  <div className="col-sm-4 inputReact_3">
                    <div className="form-group has-feedback">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        onChange={this.onChange}
                      />
                      <span className="glyphicon glyphicon-lock form-control-feedback" />
                    </div>
                  </div>
                  <div className="col-sm-4" />

                  <div className="clearfix" />

                  <div className="col-sm-4" />
                  <div className="col-sm-4 inputReact_2">
                    <button
                      type="submit"
                      className="btn btn-primary pull-right"
                      onClick={this.login}
                    >
                      {" "}
                      Login{" "}
                    </button>
                  </div>
                  <div className="col-sm-4" />
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
      
    } else {
     // alert('tayyab')
     return (
    ''
     )
    }
  }
}

export default Login;
