import React, {Component} from "react";
//import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./components/login"
//import Header from './components/header.js';
import Aside from "./components/aside.js";
//import Footer from './components/footer.js';
//import Login from './components/login.js';

//import Box from './components/box_component.js';
var that = "";
class Layout extends Component {
  constructor(props){
    super(props);
    that = this;
    this.state = {
      isLogin: false
    }
  }
  // componentWillMount () {
  //   if (sessionStorage.getItem('userName')) {
  //     console.log('setion find')
  //   } else {
  //     this.setState({
  //        redirectToReferrer: true ,
  //        isLogin: true
  //       })
  //   }
  // }
  componentDidMount(){
    var userId = localStorage.getItem("userId");
    if(userId !== null){
      this.setState({
        isLogin: true
      }); 
    }
  }
  setLogin = ()=>{
    this.setState({
      isLogin: true
    });
  }
  render(){
    const {isLogin}=this.state;
  return (
    <React.Fragment>
      
      <Router>
      {localStorage.getItem("userId") ? 
        <div>
          <Aside />
        </div>
         :
         <Login parentClass={that} />
      }
      </Router>
     
     
      
    </React.Fragment>
  );
  }
}

export default Layout;
