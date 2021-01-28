import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
// const ThermalPrinter = require('node-thermal-printer').printer
// const PrinterTypes = require('node-thermal-printer').types
// const printer = require( 'node-thermal-printer' );
const editButton = (cell, row) => {
  return (
    <React.Fragment>
      <Button
        className='btn btn-danger'
        size='xs'
        title='Delete'
        disabled={row.GNRTD_DC_ID !== null && row.GNRTD_INV_ID !== null}
        onClick={() => that.onDeleteConfirmAlert(cell, row)}
      >
        <span className='glyphicon glyphicon-trash p-b-5' aria-hidden='true' />
      </Button>
      <Button
        style={{ margin: '3px' }}
        className='btn btn-secondary'
        size='xs'
        title='Print Invoice'
        onClick={() => that.onClickPrint(cell, row)}
      >
        <span className='glyphicon glyphicon-print p-b-5' aria-hidden='true' />
      </Button>
      {/* <Link
        to={`/posFormEdit/${cell}`}
        // to={{
        //   pathname: `/posFormEdit/${cell}`,
        //   state: { lz_pos_mt_id: cell }
        // }}
        // target='_blank'
        style={{ margin: '3px' }}
        className='btn btn-warning'
        size='xs'
      >
        <span className='glyphicon glyphicon-pencil p-b-5' aria-hidden='true' />
      </Link> */}
      <Button
        // to={`/posFormEdit/${cell}`}
        style={{ margin: '3px' }}
        className='btn btn-warning'
        size='xs'
        title='Edit'
        onClick={() => that.onClickEdit(cell, row)}
        disabled={
          row.POST_YN == '0' &&
          row.GNRTD_DC_ID !== null &&
          row.GNRTD_INV_ID !== null
        }
      >
        <span className='glyphicon glyphicon-pencil p-b-5' aria-hidden='true' />
      </Button>
      <Button
        // to={`/posFormEdit/${cell}`}
        style={{ margin: '3px' }}
        className='btn btn-warning'
        size='xs'
        title={
          row.POST_YN == '0' &&
          row.GNRTD_DC_ID !== null &&
          row.GNRTD_INV_ID !== null
            ? 'Un Post'
            : 'Post Invoice'
        }
        onClick={() => that.onTogglePostConfirmAlert(cell, row)}
        // disabled={
        //   row.POST_YN == '0' &&
        //   row.GNRTD_DC_ID !== null &&
        //   row.GNRTD_INV_ID !== null
        // }
      >
        {row.POST_YN == '0' &&
        row.GNRTD_DC_ID !== null &&
        row.GNRTD_INV_ID !== null
          ? 'Un Post'
          : 'Post'}
        {/* <span className='glyphicon glyphicon-saved p-b-5' aria-hidden='true' /> */}
      </Button>
      <Button
        style={{ margin: '3px' }}
        className='btn btn-secondary'
        size='xs'
        title='Print Invoice EPSON'
        onClick={() => that.onClickPrintEpos(cell, row)}
      >
        <span className='glyphicon glyphicon-print p-b-5' aria-hidden='true' />
      </Button>
    </React.Fragment>
  )
}

const price = (cell, row) => {
  const value = Number(row.PRICE)
  return '$ ' + value.toFixed(2)
}

const disc_amt = (cell, row) => {
  const value = Number(row.DISC_AMT)
  return '$ ' + value.toFixed(2)
}
const disc_perc = (cell, row) => {
  const value = Number(row.DISC_PERC)
  return value.toFixed(2) + ' %'
}

const sale_tax_perc = (cell, row) => {
  const value = Number(row.SALES_TAX_PERC)
  return value.toFixed(2) + ' %'
}
const net_total = (cell, row) => {
  const value = Number(row.NET_TOTAL)
  return '$ ' + value.toFixed(2)
}
const amt_paid = (cell, row) => {
  const value = Number(row.AMOUNT_PAID)
  return '$ ' + value.toFixed(2)
}
var that = ''
class PosReceiptDataTable extends Component {
  constructor (props) {
    super(props)

    this.state = {
      button_status: false,
      move: false,
      cell: ''
    }
    that = this
  }

  onDeleteConfirmAlert = (cell, row) => {
    confirmAlert({
      title: 'Delete', // Title dialog
      message: 'Are you sure to do this.', // Message dialog
      closeOnEscape: true,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const data = {
              lz_pos_mt_id: cell,
              user_id: localStorage.getItem('userId')
            }
            this.props.delete_invoice(data)
          }
        },
        {
          label: 'No'
          // onClick: () => alert('Click No')
        }
      ]
    })
  }

  onTogglePostConfirmAlert = (cell, row) => {
    confirmAlert({
      title: row.GNRTD_DC_ID == null ? 'Un Post' : 'Post', // Title dialog
      message: 'Are you sure to do this.', // Message dialog
      closeOnEscape: true,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const data = {
              lz_pos_mt_id: cell,
              GNRTD_DC_ID: row.GNRTD_DC_ID,
              GNRTD_INV_ID: row.GNRTD_INV_ID
            }

            this.props.toggle_post_unpost_invoice(data)
          }
        },
        {
          label: 'No'
          // onClick: () => alert('Click No')
        }
      ]
    })
  }
  onClickPrintEpos = (cell, row) => {
    const data = {
      lz_pos_mt_id: cell
    }
    this.props.print_invoice_Epos(data)
  }

  onClickPrint = (cell, row) => {
    const data = {
      lz_pos_mt_id: cell
    }
    this.props.print_invoice(data)
  }
  // onClickPost = (cell, row) => {
  //   const data = {
  //     lz_pos_mt_id: cell,
  //     GNRTD_DC_ID: row.GNRTD_DC_ID,
  //     GNRTD_INV_ID: row.GNRTD_INV_ID
  //   }

  //   this.props.toggle_post_unpost_invoice(data)
  // }
  onClickEdit = (cell, row) => {
    const data = {
      lz_pos_mt_id: cell
    }
    this.setState({
      move: true,
      cell: cell
    })
    // window.open(`http://localhost:3000/posFormEdit`)
    // this.props.history.push(`/posFormEdit/${cell}`)
    // this.props.edit_invoice_receipt(data)
  }
  renderShowsTotal (start, to, total) {
    return (
      <p style={{ color: '#696969' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    )
  }
  // onclickToUnPostAll = () => {
  //   // const data = {
  //   //   data: this.props.pos_receipt_detail
  //   // }
  //   this.props.unpost_all_pos_invoice()
  // }
  onclickToUnPostAll = () => {
    confirmAlert({
      title: 'Post All', // Title dialog
      message: 'Are you sure to do this.', // Message dialog
      closeOnEscape: true,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // this.props.post_all_pos_invoice()
            this.props.unpost_all_pos_invoice()
          }
        },
        {
          label: 'No'
          // onClick: () => alert('Click No')
        }
      ]
    })
  }

  onclickToPostAll = () => {
    confirmAlert({
      title: 'Un Post', // Title dialog
      message: 'Are you sure to do this.', // Message dialog
      closeOnEscape: true,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // this.props.unpost_all_pos_invoice()
            this.props.post_all_pos_invoice()
          }
        },
        {
          label: 'No'
          // onClick: () => alert('Click No')
        }
      ]
    })
  }

  // onclickToPostAll = () => {
  //   // const data = {
  //   //   data: this.props.pos_receipt_detail
  //   // }
  //   this.props.post_all_pos_invoice()
  // }

  onclickToDeleteAll = () => {
    confirmAlert({
      title: 'Delete All', // Title dialog
      message: 'Are you sure to do this.', // Message dialog
      closeOnEscape: true,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const data = {
              user_id: localStorage.getItem('userId')
            }
            this.props.delete_all_pos_invoice(data)
          }
        },
        {
          label: 'No'
          // onClick: () => alert('Click No')
        }
      ]
    })
  }
  // onclickToDeleteAll = () => {
  //   // const data = {
  //   //   data: this.props.pos_receipt_detail
  //   // }
  //   this.props.delete_all_pos_invoice()
  // }

  render () {
    if (this.state.move) {
      return (
        <Redirect
          to={{
            pathname: `/posFormEdit`,
            state: { lz_pos_mt_id: this.state.cell }
          }}
        />
      )
    }
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
          value: this.props.pos_receipt_detail.length || []
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
    // let colums = []
    return (
      <React.Fragment>
        <div className='row'>
          <div className='col-sm-3' style={{ float: 'right' }}>
            <div className='form-group' style={{ marginTop: '25px' }}>
              <button
                type='button'
                className='btn btn-primary btn-block btn-flat btn-danger'
                onClick={this.onclickToDeleteAll}
                disabled={!this.props.pos_receipt_detail.length || [] > 0}
              >
                Delete All
              </button>
            </div>
          </div>
          <div className='col-sm-3' style={{ float: 'right' }}>
            <div className='form-group' style={{ marginTop: '25px' }}>
              <button
                type='button'
                className='btn btn-primary btn-block btn-flat btn-primary'
                onClick={this.onclickToPostAll}
                disabled={!this.props.pos_receipt_detail.length || [] > 0}
              >
                Un Post All
              </button>
            </div>
          </div>
          <div className='col-sm-3' style={{ float: 'right' }}>
            <div className='form-group' style={{ marginTop: '25px' }}>
              <button
                type='button'
                className='btn btn-primary btn-block btn-flat btn-primary'
                onClick={this.onclickToUnPostAll}
                disabled={!this.props.pos_receipt_detail.length || [] > 0}
              >
                Post All
              </button>
            </div>
          </div>
        </div>
        <BootstrapTable
          data={this.props.pos_receipt_detail || []}
          striped
          // hover
          condensed
          pagination
          search
          options={options}
          searchPlaceholder='Search...'
          csvFileName='Barcode Detail'
          exportCSV
          //   footerData={footerData}
          //   footer
          //   cellEdit={cellEditProp}
          // containerStyle={ { background: '#00ff00' } }
          // tableStyle={{ background: '#DCDCDC' }}
          // headerStyle={{ background: '#DCDCDC' }}
        >
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='LZ_POS_MT_ID'
            dataFormat={editButton}
            isKey
            dataSort
          >
            Action
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            editable={false}
            dataField='DOC_NO'
            // dataFormat={line_Type}
            dataSort
          >
            Receipt No
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            editable={false}
            dataField='DOC_DATE'
            dataSort
          >
            Receipt Date
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='BUYER_NAME'
            dataSort
            editable={false}
          >
            Name
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='BUYER_EMAIL'
            editable
            // dataFormat={cost_price}
            dataSort
          >
            Email
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='BUYER_PHONE_ID'
            dataSort
            editable={false}
          >
            Phone No
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='PRICE'
            editable={false}
            dataFormat={price}
            dataSort
          >
            Price
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='DISC_AMT'
            // editable
            dataFormat={disc_amt}
            dataSort
          >
            Discount Amount
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='DISC_PERC'
            // editable
            dataFormat={disc_perc}
            dataSort
          >
            Discount Per
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='SALES_TAX_PERC'
            dataFormat={sale_tax_perc}
            dataSort
          >
            Sale Tax
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='NET_TOTAL'
            dataFormat={net_total}
            dataSort
          >
            Grand Total
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='AMOUNT_PAID'
            editable
            dataFormat={amt_paid}
            dataSort
          >
            Amount Paid
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='USER_NAME'
            // dataFormat={Dis_Charge}
            dataSort
          >
            Entered By
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    )
  }
}
export default PosReceiptDataTable
