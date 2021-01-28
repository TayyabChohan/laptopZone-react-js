import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Modal, Button } from 'react-bootstrap'
import DashboardDataTableDetail from './DashboardDataTableDetail.js'
import InvoiiceDataTableDetail2 from './InvocieDataTableDetail2.js'
const editButton = (cell, row) => {
  return (
    <React.Fragment>
      <Button
        className='btn btn-primary'
        size='sm'
        data-toggle='modal'
        data-target='#myModal'
        onClick={() => that.onClickEdit(cell, row)}
      >
        <span className='glyphicon glyphicon-list p-b-5' aria-hidden='true' />
      </Button>
    </React.Fragment>
  )
}

const Dis_Charge = (cell, row) => {
  let value = 0
  value = Number(row.DIFF_AMOUNT)
  return '$ ' + value.toFixed(2)
}

const totalCharge = (cell, row) => {
  let value = Number(row.TOTAL_CHARGES)
  value = value.toFixed(2)
  return '$ ' + value
}
var that = ''
class DashboardInvoiceDataTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cell_Id: '',
      open: false,
      detailModel: {},
      data: []
    }
    that = this
  }
  onClickEdit = (cell, row) => {
    // console.log(cell)
    this.setState({
      detailModel: row
    })
    this.props.get_invoice_data_detail(cell)
  }
  renderShowsTotal (start, to, total) {
    return (
      <p style={{ color: '#696969' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    )
  }

  render () {
    // console.log(this.props.invoice_detail)
    const options = {
      page: 1, // which page you want to show as default
      sizePerPageList: [
        {
          text: '25',
          value: 25
        },
        {
          text: '50',
          value: 50
        },
        {
          text: '75',
          value: 75
        },
        {
          text: 'All',
          value: this.props.invoice_detail.length
        }
      ], // you can change the dropdown list for size per page
      sizePerPage: 25, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5, // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: '<<', // First page button text
      lastPage: '>>', // Last page button text
      prePageTitle: 'Go to previous', // Previous page button title
      nextPageTitle: 'Go to next', // Next page button title
      firstPageTitle: 'Go to first', // First page button title
      lastPageTitle: 'Go to Last', // Last page button title
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      paginationPosition: 'bottom', // default is bottom, top and both is all available
      clearSearch: true
      // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
    }
    // console.log(this.props.datatable_data)
    return (
      <React.Fragment>
        {/*  Model  */}
        <div
          id='myModal'
          className='modal fade'
          role='dialog'
          // data-backdrop='static'
          // data-keyboard='false'
          tabIndex='-1'
        >
          <div className='modal-dialog modal-dialog-custom  modal-lg'>
            {/* Modal content--> */}
            <div className='modal-content' style={{ width: '100%' }}>
              <div className='modal-header'>
                <button type='button' className='close' data-dismiss='modal'>
                  &times;
                </button>
                <h4 className='modal-title'> Invoice Details</h4>
              </div>
              <div className='modal-body'>
                <section className='content'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      {/* <div className='box'> */}
                      {/* <div className='box-header'>
                          <h1 className='box-title' style={{ color: 'black' }}>
                            Invoice Detail
                          </h1>
                          <div className='box-tools pull-right' />
                        </div> */}
                      {/* <div className='modal-body'> */}
                      <div className='col-sm-5'>
                        <label htmlFor='merchant_name'>Merchant Name</label>
                        <ul className='list-group'>
                          <li
                            className='list-group-item'
                            key={this.state.detailModel.INVOICE_ID}
                          >
                            {this.state.detailModel.MERCHANT_NAME}
                          </li>
                        </ul>
                        {/* </div> */}
                      </div>
                      <InvoiiceDataTableDetail2
                        data1={this.props.invoice_data_detail || []}
                        {...this.props}
                      />
                    </div>
                  </div>
                  {/* </div> */}
                </section>
              </div>
            </div>
          </div>
        </div>
        {/* Model End */}
        <BootstrapTable
          data={this.props.invoice_detail}
          striped
          // hover
          condensed
          pagination
          search
          options={options}
          searchPlaceholder='Search...'
          csvFileName='Barcode Detail'
          
          // containerStyle={ { background: '#00ff00' } }
          // tableStyle={{ background: '#DCDCDC' }}
          // headerStyle={{ background: '#DCDCDC' }}
        >
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='INVOICE_ID'
            dataFormat={editButton}
            isKey
            dataSort
          >
            Action
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='INVOICE_CODE'
            dataSort
          >
            Invoice Number
          </TableHeaderColumn>
          {/* <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='BUISNESS_NAME'
            dataSort
          >
            Merchant Name
          </TableHeaderColumn> */}
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='MERCHANT_NAME'
            dataSort
          >
            Merchant Name
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='TOTAL_CHARGES'
            dataFormat={totalCharge}
            dataSort
          >
            Total Charges
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='DIS_AMOUNT'
            dataFormat={Dis_Charge}
            dataSort
            hidden
          >
            Discount Amount
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='DIS_AMOUNT_PERC'
            dataSort
            hidden
          >
            Discount %
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='DIFF_AMOUNT'
            dataFormat={Dis_Charge}
            dataSort
          >
            Discounted Charges
          </TableHeaderColumn>

          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='TOTAL_SERVICES'
            dataSort
          >
            Total services
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='CREATED_DATE'
            dataSort
          >
            Created Date
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='DUE_DATE'
            dataSort
          >
            Due Date
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='INVOICE_STATUS'
          >
            Invoice Status
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    )
  }
}
export default DashboardInvoiceDataTable
