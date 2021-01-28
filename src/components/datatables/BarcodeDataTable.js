import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import SpecificBarcodeDataTable from '../datatables/SpecificBarcodeDataTable.js'
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
var that = ''
class BarcodeDataTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cell_Id: '',
      open: false,
      detailModel: {},
      data: [],
      add_barcode: ''
    }
    that = this
  }
  onConfirmAlert = cell => {
    confirmAlert({
      title: 'Edit', // Title dialog
      message: 'Are you sure to do this.', // Message dialog
      closeOnEscape: true,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.handleOnClicked(cell)
          }
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    })
  }

  genrateAllBarcode = e => {
    e.preventDefault()
    const mt_id = this.state.detailModel.MT_ID
    this.props.genrateAllBarcodes(mt_id)
  }

  onClickEdit = (cell, row) => {
    this.props.getBarcodeDetail(cell)
    this.setState({
      detailModel: row
      // data: [row]
    })
  }
  handleOnChnage = e => {
    const { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  renderShowsTotal (start, to, total) {
    return (
      <p style={{ color: '#696969' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    )
  }
  onClickSelectAll = () => {
    const mid = localStorage.getItem('merId')
    const user_id = localStorage.getItem('userId')
    const status = 'all'
    this.props.barcodeDataTable(mid, user_id, status)
  }
  onClickSelectLast50 = () => {
    const mid = localStorage.getItem('merId')
    const user_id = localStorage.getItem('userId')
    const status = ''
    this.props.barcodeDataTable(mid, user_id, status)
  }
  handleOnClicked = cell => {
    // alert(cell)
    // this.setState({ open: true, cell_Id: cell })
    // console.log(this.state)
  }
  add_new_barcode = () => {
    const data = {
      total_barcode: this.state.add_barcode,
      mt_id: this.state.detailModel.MT_ID,
      user_id: localStorage.getItem('userId')
    }
    console.log(data)
    this.props.add_new_barcode(data)
  }
  render () {
    const user = localStorage.getItem('userId')
    // console.log(this.state.detailModel)
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
          value: this.props.data.length
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
        <div
          id='myModal'
          className='modal modal-info fade'
          role='dialog'
          tabIndex='-1'
          data-focus-on='input:first'
          style={{ width: '100%' }}
        >
          <div className='modal-dialog' style={{ width: '70%' }}>
            {/* Modal content--> */}
            <div className='modal-content' style={{ width: '100%' }}>
              <div className='modal-header'>
                <button type='button' className='close' data-dismiss='modal'>
                  &times;
                </button>
                <h4 className='modal-title'>Details</h4>
              </div>
              <div className='modal-body' style={{ color: 'black' }}>
                <section className='content'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='box' style={{ borderColor: 'blue' }}>
                        <div
                          className='box-header '
                          style={{ backgroundColor: '#ADD8E6 !important' }}
                        >
                          <h1 className='box-title' style={{ color: 'black' }}>
                            Barcode Detail
                          </h1>
                          <div className='box-tools pull-right' />
                        </div>
                        <div className='box-body '>
                          <div
                            className='col-md-12'
                            style={{ color: 'black ' }}
                          >
                            <div className='col-sm-2'>
                              <div className='form-group'>
                                <label for='merchant_name'>
                                  Merchant Name:
                                </label>
                                <input
                                  // name='merchant_name'
                                  type='text'
                                  id='merchant_name'
                                  className='form-control'
                                  value={this.state.detailModel.BUISNESS_NAME}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className='col-sm-2'>
                              <div className='form-group'>
                                <label for='issued_date'>Issue Date:</label>
                                <input
                                  // name='issued_date'
                                  type='text'
                                  id='issued_date'
                                  className=' form-control '
                                  value={this.state.detailModel.ISSUED_DATE}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className='col-sm-3'>
                              <div className='form-group'>
                                <label for='issued_date'>Barcode Range:</label>
                                <input
                                  // name='issued_date'
                                  type='text'
                                  id='issued_date'
                                  className=' form-control '
                                  value={this.state.detailModel.RANGE_BARCODE}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className='col-sm-2'>
                              <div className='form-group'>
                                <label for='issued_by'>Issued By:</label>
                                <input
                                  // name='issued_by'
                                  type='text'
                                  id='issued_by'
                                  className=' form-control '
                                  value={this.state.detailModel.USER_NAME}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className='col-sm-2'>
                              <div className='form-group'>
                                <label for='barcode_count'>
                                  No. of Barcode:
                                </label>
                                <input
                                  // name='barcode_count'
                                  type='text'
                                  id='barcode_count'
                                  className=' form-control '
                                  value={this.state.detailModel.NO_OF_BARCODE}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className='col-sm-2'>
                              <div className='form-group'>
                                <label for='barcode_count'>Range y/n:</label>
                                <input
                                  // name='range'
                                  type='text'
                                  id='range'
                                  className=' form-control '
                                  value={this.state.detailModel.RANGE}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className='col-sm-2'>
                              <div className='form-group'>
                                <label for='barcode_count'>
                                  Add New Barcode:
                                </label>
                                <input
                                  name='add_barcode'
                                  type='number'
                                  id='add_barcode'
                                  className=' form-control '
                                  onChange={this.handleOnChnage}
                                  value={this.state.add_barcode}
                                />
                              </div>
                            </div>
                            <div className='col-sm-2'>
                              <div className='form-group has-feedback'>
                                <button
                                  type='button'
                                  className='btn btn-primary btn-block btn-flat'
                                  style={{ marginTop: '35px' }}
                                  onClick={this.add_new_barcode}
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className='col-sm-12 ' id='apnd_radi' />

                          <div
                            className='col-md-12 form-scroll'
                            style={{ color: 'black ' }}
                          >
                            <SpecificBarcodeDataTable
                              data1={this.props.detail_barcode}
                              mt_id={this.state.detailModel.MT_ID}
                              {...this.props}
                            />
                          </div>
                          <div className='col-sm-2'>
                            <div className='form-group'>
                              <form
                                onSubmit={this.genrateAllBarcode}
                                acceptCharset='utf-8'
                              >
                                <input
                                  type='hidden'
                                  id='barcode_mt_id'
                                  name='barcode_mt_id'
                                  value=''
                                />

                                <input
                                  type='submit'
                                  className='btn btn-success'
                                  id='printAll'
                                  name='printAll'
                                  value='Print All'
                                />
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div
            className='loader text text-center'
            style={{
              display: 'none',
              position: 'fixed',
              top: '50%',
              left: '50%'
            }}
          >
            <img
              align='center'
              src="<?php echo base_url() . 'assets/images/ajax-loader.gif' ?>"
              alt='ajax loader'
              style={{ width: '100px', height: '100px' }}
            />
          </div>
        </div>
        {user == '2' ? (
          <div className='row'>
            <div className='col-sm-1' style={{ float: 'right' }}>
              <div className='form-group' style={{ marginTop: '25px' }}>
                <button
                  type='button'
                  className='btn btn-primary btn-block btn-flat btn-primary'
                  onClick={this.onClickSelectAll}
                >
                  Display All
                </button>
              </div>
            </div>
            <div className='col-sm-1' style={{ float: 'right' }}>
              <div className='form-group' style={{ marginTop: '25px' }}>
                <button
                  type='button'
                  className='btn btn-primary btn-block btn-flat btn-primary'
                  onClick={this.onClickSelectLast50}
                >
                  Display Latest 50
                </button>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        <BootstrapTable
          data={this.props.data}
          striped
          // hover
          condensed
          pagination
          search
          options={options}
          searchPlaceholder='Search...'
          csvFileName='Barcode Detail'
          exportCSV
          // containerStyle={ { background: '#00ff00' } }
          tableStyle={{ background: '#DCDCDC' }}
          headerStyle={{ background: '#DCDCDC' }}
        >
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            isKey
            dataField='MT_ID'
            dataFormat={editButton}
          >
            Action
          </TableHeaderColumn>
          {/* <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='MT_ID'
            isKey
            dataSort
          >
            Product ID
          </TableHeaderColumn> */}
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='BUISNESS_NAME'
          >
            Merchant Name
          </TableHeaderColumn>
          {/* <TableHeaderColumn dataField='MERCHANT_ID'>Product Name</TableHeaderColumn> */}
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='ISSUED_DATE'
          >
            Issued Date
          </TableHeaderColumn>
          {/* <TableHeaderColumn width='5%' headerAlign='center' dataAlign='center' dataField='ISSUED_BY'>
          ISSUED BY
        </TableHeaderColumn> */}
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='NO_OF_BARCODE'
          >
            No of Barcode
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='RANGE_BARCODE'
          >
            Min-Max
          </TableHeaderColumn>
          {/* <TableHeaderColumn width='10%' headerAlign='center' dataAlign='center' dataField='LOT_ID'>
          LOT ID
        </TableHeaderColumn> */}
          {/* <TableHeaderColumn dataField='RANGE_ID'>RANGE_ID</TableHeaderColumn> */}
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='REF_NO'
          >
            Ref No
          </TableHeaderColumn>
          <TableHeaderColumn
            width='15%'
            headerAlign='center'
            dataAlign='center'
            tdStyle={{ whiteSpace: 'normal' }}
            dataField='LOT_DESC'
          >
            Lot Description
          </TableHeaderColumn>
          {/* <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='BUISNESS_NAME'
          >
           Merchant Name
          </TableHeaderColumn> */}
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='RANGE'
          >
            Range
          </TableHeaderColumn>

          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='USER_NAME'
          >
            User Name
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    )
  }
}
export default BarcodeDataTable
