import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class UpcTitle extends React.Component {
	constructor(props) {
	    //console.log('1');
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      upcTitile: this.props.upcNum,
	      upcTitleArr:[],

	    };
	    

	    
	    
  	}
  	componentDidMount(){
  	

		$.ajax({
            url: 'http://localhost/laptopzone/reactcontroller/c_react/get_upc_title',
            dataType: 'json',
      		type: 'POST',
           	data:{'upc':this.state.upcTitile},
            success: function(data) {
            	if(data.exist == true){
            		console.log('true');
            	this.setState({
            	isLoaded: true,            	
            	upcTitleArr:data.desc_upc_quer
          		});

            		
            	}else{
            	this.setState({
            	isLoaded: false,            	
            	upcTitleArr:data.desc_upc_quer
          		});

            		
            	}

                // this.setState({successUpdate: response['message']});
            }.bind(this),
            error: function(xhr, resp, text) {
                //show error to console
                console.log(xhr,resp,text);
            }
        });
	}

	


	render(){	
		const { error, isLoaded, items } = this.state;		
		if (error) {
	      return <div> Error: {error.message}</div>;
	    } else if (!isLoaded) {
	      return (
			      <h1>
			        LOADING......
			      </h1>);

	    } else {
	    return (
				<div className="row">
	    		<div className="col-xs-12">		          
			        <div className="box">
			            <div className="box-header">
			              <h3 className="box-title">History Titles</h3>
			            </div>
			            
			            <div className="box-body">
				            <table id="example2" className="table table-bordered table-hover">
				                <thead>
				                <tr>
				                  <th>Category Id</th>
				                  <th>Title</th>
				                  <th>Mpn</th>
				                  <th>Upc</th>
				                  <th>Object</th>
				                  <th>Brand</th>
				                  <th>Condition</th>
				                  <th>Select</th>
				                </tr>
				                </thead>
				                <tbody>
					                {this.state.upcTitleArr.map((tit,index) => (
	                                      <tr key={index}>
	                                          <td>{tit.CATE}</td>
	                                          <td>{tit.TITLE}</td>
	                                          <td>{tit.MPN}</td>
	                                          <td>{tit.UPC}</td>
	                                          <td>{tit.OBJECT_NAME}</td>
	                                          <td>{tit.BRAND}</td>
	                                          <td>{tit.COND_NAME}</td>
	                                          <td>{tit.COND_NAME}</td>                                         
	                                          
	                                      </tr>
	                          		))}				                
				                </tbody>	                
		              		</table>
		              		<button type="button" className="btn btn-info pull-right" onClick ={this.serchSetrem}>Save</button>			              
			            </div>
			            
			        </div>			          
			    </div>  
			    </div>  
	  		
			);
		}
	}

  }

export default UpcTitle;