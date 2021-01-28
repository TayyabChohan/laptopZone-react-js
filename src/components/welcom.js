import React from "react";
import { Redirect } from "react-router-dom";

class welcom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false
    };
  }
  componentWillMount() {
    if (sessionStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }

    return (
      <section className="content">
        <div className="row">
          <h1>welcom to laptopzone </h1>
        </div>
      </section>
    );
  }
}

export default welcom;
