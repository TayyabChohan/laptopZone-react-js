/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */
/* eslint space-infix-ops: 0 */
/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { css } from 'glamor';
import $ from "jquery";



function getInvoicBarc(servRateId) {
  var getUrl = window.location;
  var finalurl = getUrl.protocol + "//" + getUrl.hostname;

  let insertUrl =   finalurl + "/laptopzone/reactcontroller/c_react/merch_servic_invoice_barcode";
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: insertUrl,
      dataType: "json",
      type: "POST",
      data: {'servRateId': servRateId }
    }).then(
      function(data) {
        resolve(data);
      },
      function(err) {
        reject(err);
      }
    );
  });
}

var that = "";
function loadBarcode(servRateId) {
  
  // alert(servRateId);
  var barcode = [];
  $.LoadingOverlay("show");
  getInvoicBarc(servRateId)
    .then(result => {
      $.LoadingOverlay("hide");
      //console.log(result);
      //if (result) {
        //var barcodesList ='';
        
        barcode = result.mer_inv_barcode;
        alert(barcode);
        var barcodesList = [];

        var length = barcode.length;
        console.log('lengths'+ length);
        

        for (var i = 0; i < length; i++) {
          barcodesList.push({
            pk: barcode[i].PK,            
            title: barcode[i].ITEM_TITLE,            
            ebay_price: barcode[i].EBAY_PRICE,            
            cond: barcode[i].DEFAULT_COND            
          });
        }
        
        // alert(barcodesList);
         alert('h111111');
        that.setState({
          bars: barcodesList
        });
        
       
      // } else {
      //   //console.log('error');
      //   // notify("error", result.message);
      //   // swal("Empty", result.message, "error");
      // }
    })
    .catch(err => {
      $.LoadingOverlay("hide");
      //console.log(err);
    });
}










function onRowSelect(row, isSelected) {
  console.log(row);
  console.log(`selected: ${isSelected}`);
}

function onSelectAll(isSelected) {
  console.log(`is select all: ${isSelected}`);
}

function onAfterSaveCell(row, cellName, cellValue) {
  console.log(`Save cell ${cellName} with value ${cellValue}`);
  console.log('The whole row :');
  console.log(row);
}

function onAfterTableComplete() {
  console.log('Table render complete.');
}

function onAfterDeleteRow(rowKeys) {
  console.log('onAfterDeleteRow');
  console.log(rowKeys);
}

function onAfterInsertRow(row) {
  console.log('onAfterInsertRow');
  console.log(row);
}

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  selected: [], // default select on table
  bgColor: 'rgb(238, 193, 213)',
  onSelect: onRowSelect,
  onSelectAll: onSelectAll
};

// const cellEditProp = {
//   mode: 'click',
//   blurToSave: true,
//   afterSaveCell: onAfterSaveCell
// };

const options = {
  paginationShowsTotal: true,
  sortName: 'name',  // default sort column name
  sortOrder: 'desc',  // default sort order
  afterTableComplete: onAfterTableComplete, // A hook for after table render complete.
  afterDeleteRow: onAfterDeleteRow,  // A hook for after droping rows.
  afterInsertRow: onAfterInsertRow   // A hook for after insert rows
};


function priorityFormatter(cell, row) {
  if (cell === 'A') return '<font color="red">' + cell + '</font>';
  else if (cell === 'B') return '<font color="orange">' + cell + '</font>';
  else return cell;
}

// function trClassNameFormat(rowData, rIndex) {
//   return rIndex % 3 === 0 ? 'third-tr' : '';
// }
function nameValidator(value) {
  if (!value) {
    return 'Job Name is required!';
  } else if (value.length < 3) {
    return 'Job Name length must great 3 char';
  }
  return true;
}
function priorityValidator(value) {
  if (!value) {
    return 'Priority is required!';
  }
  return true;
}

class LoadServiceMode extends React.Component {
  
  constructor(props) {
    
    
    var getUrl = window.location;
    var finalurl = getUrl.protocol + "//" + getUrl.hostname;
   
      super(props);       
      
      this.state = {
      bars : []
      };   

    }
    // componentDidMount(){
    //   loadBarcode(this.props.serRatedata);

    // }


  render() {
     
    // console.log('123');
     loadBarcode(this.props.serRatedata);
     const {
      bars
    } = this.state;
   
    // console.log('hahah');
      console.log(this.state.bars);
    return (
      <BootstrapTable data={bars} 
        
        selectRow={ selectRowProp }        
              
        search        
        hover
        pagination>
        
        <TableHeaderColumn  dataField="pk"   isKey 
            headerAlign='center'
            dataAlign='center'>PK</TableHeaderColumn>
        <TableHeaderColumn  dataField="title"
         width='40%'   
            headerAlign='center'
            dataAlign='left'>Item Title</TableHeaderColumn>
        <TableHeaderColumn  dataField="ebay_price" 
            headerAlign='center'
            dataAlign='center' >Ebay Price</TableHeaderColumn>        
        <TableHeaderColumn  dataField="cond"    
            headerAlign='center'
            dataAlign='center' >Condiotion</TableHeaderColumn>
      
      </BootstrapTable>
    );
  }
}
export default  LoadServiceMode;
