import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

const editButton = (cell, row) => {
  return (
    <React.Fragment>
      <Button
        style={{ margin: '3px' }}
        className='btn btn-primary'
        size='xs'
        data-toggle='modal'
        data-target='#myModal'
        onClick={() => that.onConfirmAlert(cell, row)}
      >
        <span class='glyphicon glyphicon-edit' aria-hidden='true' />
      </Button>
      <Button
        className='btn btn-danger'
        size='xs'
        onClick={() => that.onClickDelete(cell)}
        title='Delete'
      >
        <span className='glyphicon glyphicon-remove' aria-hidden='true' />
      </Button>
    </React.Fragment>
  )
}
var that = ''
class ServiceBillDataTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cell_Id: '',
      open: false,
      detailModel: '',
      updateserviceqty: '',
      updateservicerate: ''
    }
    that = this
  }
  onConfirmAlert = (cell, row) => {
    // confirmAlert({
    //   title: 'Delete', // Title dialog
    //   message: 'Are you sure to do this.', // Message dialog
    //   closeOnEscape: true,
    //   buttons: [
    //     {
    //       label: 'Yes',
    //       onClick: () => {
    //         this.handleOnClicked(cell)
    //       }
    //     },
    //     {
    //       label: 'No',
    //       onClick: () => alert('Click No')
    //     }
    //   ]
    // })
    this.setState({
      ...this.state,
      detailModel: row,
      updateserviceqty: row.QTY,
      updateservicerate: row.RATE
    })
  }
  onClickDelete = cell => {
    confirmAlert({
      title: 'Delete', // Title dialog
      message: 'Are you sure to do this.', // Message dialog
      closeOnEscape: true,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.handleOnClickedDelete(cell)
          }
        },
        {
          label: 'No'
          //   onClick: () => alert('Click No')
        }
      ]
    })
  }
  renderShowsTotal (start, to, total) {
    return (
      <p style={{ color: '#696969' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    )
  }
  updateModelService = e => {
    const { name, value } = e.target
    this.setState(
      {
        ...this.state,
        [name]: value
      },
      () => {
        if (this.state.updateserviceqty <= 0) {
          this.setState({
            ...this.state,
            updateserviceqty: ''
          })
        }
        if (this.state.updateservicerate <= 0) {
          this.setState({
            ...this.state,
            updateservicerate: ''
          })
        }
      }
    )
  }
  updateServiceValues = e => {
    // e.preventDefault()
    const data = {
      qty: this.state.updateserviceqty,
      rate: this.state.updateservicerate,
      id: this.state.detailModel.STORAGE_ID
    }
    this.props.update_service_detail(data)
    console.log(data)
  }
  handleOnClickedDelete = cell => {
    this.props.delete_service_bill({ cell })
  }
  render () {
    const enable =
      this.state.updateservicerate > 0 && this.state.updateserviceqty
    console.log(this.state)
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
        <div class='modal fade' id='myModal' role='dialog'>
          <div class='modal-dialog'>
            <div class='modal-content'>
              <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal'>
                  &times;
                </button>
                <h4 class='modal-title'>Service Invoice Detail</h4>
              </div>
              {/* <form onSubmit={this.updateServiceValues}> */}
              <div class='modal-body'>
                <h4> Service Invoice </h4>
                <div className='row'>
                  <div className='col-sm-3'>
                    <div className='form-group has-feedback'>
                      <label for='no_of_item'>Merchant Name</label>
                      <input
                        type='text'
                        className='form-control'
                        value={this.state.detailModel.CONTACT_PERSON}
                        disabled
                      />
                    </div>
                  </div>
                  <div className='col-sm-3'>
                    <div className='form-group has-feedback'>
                      <label for='no_of_item'>Service Name</label>
                      <input
                        type='text'
                        className='form-control'
                        value={this.state.detailModel.SERVICE_DESC}
                        disabled
                      />
                    </div>
                  </div>
                  <div className='col-sm-3'>
                    <div className='form-group has-feedback'>
                      <label for='no_of_item'>Rate</label>
                      <input
                        type='number'
                        className='form-control'
                        value={this.state.updateservicerate}
                        name='updateservicerate'
                        onChange={this.updateModelService}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-sm-3'>
                  <div className='form-group has-feedback'>
                    <label for='no_of_item'>Qty</label>
                    <input
                      type='number'
                      className='form-control'
                      value={this.state.updateserviceqty}
                      name='updateserviceqty'
                      onChange={this.updateModelService}
                    />
                  </div>
                </div>
              </div>
              {/* <div className='col-sm-4'>
                    <div className='form-group has-feedback'>
                      <label for='no_of_item'>Appoint Date</label>
                      <input
                        type='text'
                        className='form-control'
                        value={this.state.detailModel.APPOINTMENT_DATE}
                        disabled
                      />
                    </div>
                  </div>
                </div> */}
              <div class='modal-footer'>
                <button
                  type='button'
                  class='btn btn-primary'
                  data-dismiss='modal'
                  onClick={this.updateServiceValues}
                  disabled={!enable}
                >
                  Update
                </button>
                <button
                  type='button'
                  class='btn btn-default'
                  data-dismiss='modal'
                >
                  Close
                </button>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
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
            dataField='STORAGE_ID'
            dataFormat={editButton}
          >
            Action
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='CONTACT_PERSON'
          >
            Merchant Name
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='QTY'
            isKey
            dataSort
          >
            Qty
          </TableHeaderColumn>

          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='RATE'
          >
            Rate
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='AMOUNT'
          >
            Amount
          </TableHeaderColumn>

          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='FROMDATE'
          >
            From Date
          </TableHeaderColumn>

          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='TODATE'
          >
            To Date{' '}
          </TableHeaderColumn>
          <TableHeaderColumn
            width='15%'
            headerAlign='center'
            dataAlign='center'
            tdStyle={{ whiteSpace: 'normal' }}
            dataField='CREATED_DATE'
          >
            Create Date
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    )
  }
}
export default ServiceBillDataTable
