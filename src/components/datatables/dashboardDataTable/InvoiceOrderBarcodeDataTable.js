import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
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
        <span className='glyphicon glyphicon-saved p-b-5' aria-hidden='true' />
      </Button>
    </React.Fragment>
  )
}

var that = ''
class InvoiceOrderBarcodeDataTable extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    that = this
  }
  onClickEdit = (cell, row) => {
    console.log(cell, row)

    // this.props.get_order_id_barcode(data)
  }
  onclickToVerified = () => {
    const data = {
      data: this.props.order_barcode,
      user_id: localStorage.getItem("userId")
    }
    this.props.verified_all_barcode(data)
  }

  onclickToUnVerified = () => {
    const data = {
      data: this.props.order_barcode,
      user_id: localStorage.getItem("userId")
    }

    this.props.un_verified_all_barcode(data)
  }
  renderShowsTotal (start, to, total) {
    return (
      <p style={{ color: '#696969' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    )
  }

  render () {
    // console.log(this.props.order_data)
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
          value: this.props.order_barcode || [].length
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
        <div className='row'>
          <div className='col-sm-1'>
            <div className='form-group' style={{ marginTop: '25px' }}>
              <button
                type='button'
                className='btn btn-primary btn-block btn-flat btn-primary'
                onClick={this.onclickToVerified}
                title='Verified The All Record'
              >
                Verified
              </button>
            </div>
          </div>
          <div className='col-sm-1'>
            <div className='form-group' style={{ marginTop: '25px' }}>
              <button
                type='button'
                className='btn btn-primary btn-block btn-flat btn-warning'
                onClick={this.onclickToUnVerified}
                title='Un Verified The All Record'
              >
                Un Verified
              </button>
            </div>
          </div>
        </div>
        <BootstrapTable
          data={this.props.order_barcode || []}
          striped
          // hover
          condensed
          pagination
          search
          options={options}
          searchPlaceholder='Search...'
          csvFileName='Invoice Order'

          // containerStyle={ { background: '#00ff00' } }
          // tableStyle={{ background: '#DCDCDC' }}
          // headerStyle={{ background: '#DCDCDC' }}
        >
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='LZ_BARCODE_MT_ID'
            dataFormat={editButton}
            isKey
            dataSort
            hidden
          >
            Action
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='ORDER_ID'
            dataSort
            hidden
          >
            Order Id
          </TableHeaderColumn>

          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='BARCODE_NO'
            dataSort
          >
            Barcode No
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='EBAY_ITEM_ID'
            dataSort
          >
            Ebay Item Id{' '}
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='BIN_ID'
            dataSort
          >
            Bin Id
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='SALE_RECORD_NO'
            dataSort
          >
            Sale No
          </TableHeaderColumn>

          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='AUDIT_DATETIME'
            dataSort
          >
            Audit Time
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='USER_NAME'
            dataSort
          >
            Verified By
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='STATUS'
            dataSort
          >
            Status
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    )
  }
}
export default InvoiceOrderBarcodeDataTable
