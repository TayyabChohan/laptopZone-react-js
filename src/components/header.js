import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
// import ReactDOM from 'react-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    sessionStorage.setItem("userName", "");
    sessionStorage.clear();
    localStorage.setItem("userName", "");
    localStorage.clear();
    localStorage.setItem("login", "");
    localStorage.clear();
    window.location.href = "/login";
  }

  render() {
    return (
      <React.Fragment>
        <header className="main-header">
          <a href="../../index2.html" className="logo">
            <span className="logo-lg">
              <b>List</b>Jeannie
            </span>
          </a>

          <nav className="navbar navbar-static-top">
            
            <a
              href="#"
              className="sidebar-toggle"
              data-toggle="push-menu"
              role="button"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </a>

            <div className="navbar-custom-menu">
              {/* {localStorage.getItem("userId") ? ( */}
                <button
                  type="button"
                  className="btn btn-danger btn-block btn-flat"
                  onClick={this.logout}
                >
                  Logout
                </button>
              {/* ) : (
                ""
              )} */}
            </div>
          </nav>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
