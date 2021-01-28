import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

class SerchBarcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serachBarcode: "",
      redirectToReferrer: false
    };
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  componentWillMount() {
    if (sessionStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }

  handleSearchInput(e) {
    const name = e.target.name;

    this.setState({ [name]: e.target.value });
    //console.log(this.state.serachBarcode);
  }

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    return (
      <React.Fragment>
        <section className="content-header">
          <h1>Search Barcode</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-dashboard" /> Home
              </a>
            </li>
            <li>
              <a href="#">Tables</a>
            </li>
            <li className="active">Search Barcode</li>
          </ol>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Search</h3>
                </div>

                <div className="box-body">
                  <div className="input-group">
                    <input
                      type="number"
                      name="serachBarcode"
                      className="form-control"
                      value={this.state.serachBarcode}
                      onChange={this.handleSearchInput}
                      placeholder="Search Barcode ....."
                    />
                    <span className="input-group-btn">
                      <Link
                        to={{
                          pathname: "/varify",
                          state: {
                            barcodePass: this.state.serachBarcode
                          }
                        }}
                      >
                        <button className="btn btn-flat btn-success">
                          Search
                        </button>
                      </Link>
                    </span>
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
export default SerchBarcode;
