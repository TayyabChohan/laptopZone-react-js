
import React from 'react';
import { BrowserRouter as Router,Route, Link,  Switch,Redirect } from "react-router-dom";
class NotFound extends React.Component {

	constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false
      
    };
    
  }
  	componentWillMount(){
  		if(sessionStorage.getItem("userName")){
  			console.log('setion find');

  		}else{

  			this.setState({redirectToReferrer: true});

  		}


  	}

	render(){

		if (this.state.redirectToReferrer ){
	 	return ( <Redirect to={{  pathname: "/login" }} />);
		}

		return (

			<div><h1>NotFound </h1></div>

			);
	}

}

export default NotFound;