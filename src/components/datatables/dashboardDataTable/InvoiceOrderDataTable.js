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
        onClick={() => that.onClickDetail(cell, row)}
        title='Get Barcodes'
      >
        <span className='glyphicon glyphicon-list p-b-5' aria-hidden='true' />
      </Button>
    </React.Fragment>
  )
}

var that = ''
class InvoiceOrderDataTable extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    that = this
  }
  onClickDetail = (cell, row) => {
    console.log(cell, row)
    const data = {
      order_id: row.ORDER_ID
    }
    this.props.get_order_id_barcode(data)
  }
  onclickToVerified = () => {
    this.props.get_Verify()
  }

  onclickToUnVerified = () => {
    this.props.get_UnVerify()
  }
  onclickToGetAll = () => {
    this.props.get_all_record()
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
          value: this.props.order_data || [].length
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
          <div className='col-sm-1' style={{ float: 'right' }}>
            <div className='form-group' style={{ marginTop: '25px' }}>
              <button
                type='button'
                className='btn btn-primary btn-block btn-flat btn-primary'
                onClick={this.onclickToVerified}
                title='Get Verified Record'
              >
                Verified
              </button>
            </div>
          </div>
          <div className='col-sm-1' style={{ float: 'right' }}>
            <div className='form-group' style={{ marginTop: '25px' }}>
              <button
                type='button'
                className='btn btn-primary btn-block btn-flat btn-Warning'
                onClick={this.onclickToUnVerified}
                title='Get Un Verified Record'
              >
                Un Verified
              </button>
            </div>
          </div>
          <div className='col-sm-1'>
            <div className='form-group' style={{ marginTop: '25px' }}>
              <button
                type='button'
                className='btn btn-primary btn-block btn-flat btn-primary'
                onClick={this.onclickToGetAll}
                title='Get All Record'
              >
                All Record
              </button>
            </div>
          </div>
        </div>
        <BootstrapTable
          data={this.props.order_data || []}
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
            dataField='ORDER_PACKING_ID'
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
            dataField='EBAY_ID'
            dataSort
          >
            Ebay Id
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='ORDER_ID'
            dataSort
          >
            Order Id
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='ITEM_TITLE'
            dataSort
          >
            Item Title
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='EBAY_PRICE'
            dataSort
          >
            Ebay Price
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='SALE_PRICE'
            dataSort
            hidden
          >
            Sale Price
          </TableHeaderColumn>

          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='SALE_DATE'
            dataSort
          >
            Sale Date
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='CHECKOUT_DATE'
            dataSort
          >
            Check Out Date
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
export default InvoiceOrderDataTable
