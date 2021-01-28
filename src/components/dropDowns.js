import React from 'react';
import ReactDOM from 'react-dom';

class CondDrop extends React.Component {
	constructor (props){
		console.log('12321');
		
		super(props);
		this.state ={
			error: null,
      		isLoaded: false,
      		conditions: [],
      		shipname: [],

		};
		
	}
	componentDidMount(){
    
  	 fetch("http://localhost/laptopzone/reactcontroller/c_react/get_dropdowns")
      .then(res => res.json())
      .then(
        (result) => {
        	console.log(result);
          this.setState({
            isLoaded: true,
            conditions: result.condition_quer,
            shipname: result.ship_quer

          });
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render(){
  	const { error, isLoaded, conditions } = this.state;
		if (error) {
      	return <div> Error: {error.message}</div>;
    	}else if (!isLoaded) {
      	return <div><h1>Loading...</h1></div>;
    	}else {
    	console.log(conditions);

    	var conditionValues = this.state.conditions.map(function(cond) {
            return (
                <option key={cond.ID} value={cond.COND_NAME}>{cond.COND_NAME}</option>
            );
        });
         var shipValues = this.state.shipname.map(function(ship) {
            return (
                <option key={ship.SHIPING_NAME} value={ship.SHIPING_NAME}>{ship.SHIPING_NAME}</option>
            );
        });

        return (
        <h1>ashdjs</h1>
        );
    }

  }

}
export default CondDrop;