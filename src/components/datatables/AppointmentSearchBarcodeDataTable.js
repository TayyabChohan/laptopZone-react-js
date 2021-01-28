import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import dateFormat from 'dateformat'

const editButton = (cell, row) => {
  return (
    <React.Fragment>
      <Button
        className={
          row.APPOINTMENT_LOG_ID !== null ? 'btn btn-danger' : 'btn btn-primary'
        }
        size='xs'
        title={
          row.APPOINTMENT_LOG_ID !== null ? 'Barcode Consumed' : 'Add Barcode'
        }
        disabled={row.APPOINTMENT_LOG_ID !== null}
        onClick={() => that.onClickEdit(cell, row)}
      >
        <span className='glyphicon glyphicon-saved' aria-hidden='true' />
      </Button>
    </React.Fragment>
  )
}
var that = ''
class AppointmentSearchBarcodeDataTable extends Component {
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
    const customData = {
      // startDate: this.props.searchData.startDate,
      // endDate: this.props.searchData.endDate,
      user_id: localStorage.getItem('userId'),
      service_id: this.props.service_id.value,
      barcode: row.BARCODE_NO,
      label: this.props.service_id.label,
      appointment_id: this.props.detailModel.APPOINTMENT_ID,
      merchant_id: this.props.detailModel.MERCHANT_ID
    }
    // console.log(customData)

    const reducerData = {
      status: this.props.detailModel.APPOINTMENT_STATUS,
      id: this.props.detailModel.APPOINTMENT_ID,
      log_id: this.props.detailModel.APPOINTMENT_LOG_ID
    }
    // console.log(reducerData)
    this.props.InsertSearchCustomBarcode(customData, reducerData)
  }
  renderShowsTotal (start, to, total) {
    return (
      <p style={{ color: '#696969' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    )
  }

  trClassFormat (row, rowIndex) {
    // row is the current row data
    if (row.APPOINTMENT_LOG_ID === null) {
      return 'tr-consumed'
    }
  }

  render () {
    // console.log(this.state.detailModel)
    // console.log(this.props)
    // console.log(this.props.searchData.startDate)
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
      paginationPosition: 'both', // default is bottom, top and both is all available
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
        <BootstrapTable
          data={this.props.data || []}
          striped
          trClassName={this.trClassFormat}
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
            dataField='BARCODE_NO'
          >
            Barcode No
          </TableHeaderColumn>
          {/* <TableHeaderColumn dataField='MERCHANT_ID'>Product Name</TableHeaderColumn> */}
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='MPN_DESCRIPTION'
          >
            Mpn Description
          </TableHeaderColumn>
          {/* <TableHeaderColumn width='5%' headerAlign='center' dataAlign='center' dataField='ISSUED_BY'>
          ISSUED BY
        </TableHeaderColumn> */}
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='CARD_UPC'
          >
            Card Upc
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='CARD_MPN'
          >
            Card Mpn
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='EBAY_ITEM_ID'
          >
            eBay Id
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            isKey
            dataField='Barcode_NO'
            dataFormat={editButton}
          >
            Action
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    )
  }
}
export default AppointmentSearchBarcodeDataTable
