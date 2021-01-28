import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import Select from 'react-select'
import $ from 'jquery'

const editButton = (cell, row) => {
  return (
    <React.Fragment>
      <Button
        className={
          row.pos == true || row.LZ_POS_MT_ID != null
            ? 'btn btn-danger'
            : 'btn btn-primary'
        }
        size='xs'
        onClick={() => that.onClickSave(cell, row)}
        disabled={row.LZ_POS_MT_ID != null}
      >
        <span
          className={
            row.pos == true || row.LZ_POS_MT_ID != null
              ? 'glyphicon glyphicon-saved p-b-5'
              : 'glyphicon glyphicon-saved p-b-5'
          }
          aria-hidden='true'
        />
      </Button>
    </React.Fragment>
  )
}

const Dis_Charge = (cell, row) => {
  const MPN = row.MFG_PART_NO == null ? '' : row.MFG_PART_NO
  const UPC = row.UPC == null ? '' : row.UPC
  const MANU = row.MANUFACTURER == null ? '' : row.MANUFACTURER
  const COND = row.ITEM_CONDITION == null ? '' : row.ITEM_CONDITION
  return MPN + ' | ' + UPC + ' | ' + MANU + ' | ' + COND
}
const cost_price = (cell, row) => {
  const value = Number(row.COST_PRICE)
  return '$ ' + value.toFixed(2)
}

const dis_amount = (cell, row) => {
  const valuee = Number(row.DISCOUNT_AMOUNT)
  return '$ ' + valuee.toFixed(2)
}

const dis_per = (cell, row) => {
  const value = Number(row.DISCOUNT_PER)
  return '$ ' + value.toFixed(2)
}
const net_price = (cell, row) => {
  let value = row.NET_PRICE == null ? row.COST_PRICE : row.NET_PRICE
  value = Number(value)
  return '$ ' + value.toFixed(2)
}

const adv_pay = (cell, row) => {
  let value = Number(row.ADVANCE_PAYMENT).toFixed(2)
  return '$ ' + value
}

const line_val = (cell, row) => {
  const Line_types = [
    {
      value: 'PT',
      label: 'Parts'
    },
    { value: 'SR', label: 'Service' },
    { value: 'SH', label: 'Shipping' },
    { value: 'OT', label: 'Other' }
  ]
  const data = Line_types.filter(item => item.value == row.LINE_TYPE)
  return (
    <ul style={{ listStyleType: 'none' }}>
      {data.map(item => (
        <li>{item.label}</li>
      ))}{' '}
    </ul>
  )
}
const onAfterSaveCell = (row, cellName, cellValue) => {
  if (cellName == 'COST_PRICE') {
    const data = {
      cost_price: row.COST_PRICE,
      barcode: row.BARCODE_NO
    }
    that.props.change_cost_price(data, that.props.exempt)
  }

  if (cellName == 'DISCOUNT_PER') {
    const data = {
      dis_per: row.DISCOUNT_PER,
      barcode: row.BARCODE_NO
    }
    that.props.change_Dis_Amount_Perc(data, that.props.exempt)
  }

  if (cellName == 'DISCOUNT_AMOUNT') {
    const data = {
      dis_amount: row.DISCOUNT_AMOUNT,
      barcode: row.BARCODE_NO
    }
    that.props.change_Dis_Amount(data, that.props.exempt)
  }
}

const onBeforeSaveCell = (row, cellName, cellValue) => {
  // You can do any validation on here for editing value,
  // return false for reject the editing

  return cellValue > -1 || cellValue === ''
}

const cellEditProp = {
  mode: 'click',
  // blurToSave: true
  beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: onAfterSaveCell // a hook for after saving cell
}

var that = ''
class SearchRepairDataTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      button_status: false
    }
    that = this
  }
  onClickSave = (cell, row) => {
    this.props.add_repair_to_pos(cell)
    const data = {
      scan_barcode: cell
    }
    if (!row.pos) {
      this.props.get_scan_barcode_detail(data)
    } else {
      const data = {
        search_barcode: cell
      }
      this.props.get_barcodes_aganist_barcode_repair_search(data)
    }
  }

  renderShowsTotal (start, to, total) {
    return (
      <p style={{ color: '#696969' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    )
  }

  render () {
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
          value: this.props.search_repair_data.length
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
        <BootstrapTable
          data={this.props.search_repair_data}
          striped
          // hover
          condensed
          pagination
          search
          options={options}
          searchPlaceholder='Search...'
          csvFileName='Barcode Detail'
          exportCSV
          cellEdit={cellEditProp}
          // containerStyle={ { background: '#00ff00' } }
          // tableStyle={{ background: '#DCDCDC' }}
          // headerStyle={{ background: '#DCDCDC' }}
        >
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='BARCODE_NO'
            dataFormat={editButton}
            // isKey
            dataSort
            // hidden
          >
            Action
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='TOTAL_BARCODE'
            // dataFormat={line_val}
            dataSort
          >
            Total Barcodes
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            editable={false}
            dataField='BARCODE_NO'
            dataSort
            isKey
          >
            Barcode No
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='MFG_PART_NO'
            dataSort
            editable={false}
          >
            MPN
          </TableHeaderColumn>

          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='PRODUCT_OWNER'
            dataSort
            editable={false}
          >
            Customer Name
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='EMAIL'
            dataSort
            editable={false}
          >
            email{' '}
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='PHONE_NO'
            dataSort
            editable={false}
          >
            Phone No
          </TableHeaderColumn>
          <TableHeaderColumn
            width='7%'
            headerAlign='center'
            dataAlign='center'
            dataField='COST_PRICE'
            editable
            dataFormat={cost_price}
            dataSort
          >
            Price
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='NET_PRICE'
            editable={false}
            dataFormat={net_price}
            dataSort
          >
            Net Price
          </TableHeaderColumn>
          <TableHeaderColumn
            width='7%'
            headerAlign='center'
            dataAlign='center'
            dataField='ADVANCE_PAYMENT'
            dataFormat={adv_pay}
            editable={false}
            dataSort
          >
            Advance Payment
          </TableHeaderColumn>
          <TableHeaderColumn
            width='7%'
            headerAlign='center'
            dataAlign='center'
            dataField='BARCODE_NO'
            dataFormat={Dis_Charge}
            dataSort
          >
            MPN|UPC|Manuf| Condi
          </TableHeaderColumn>
          <TableHeaderColumn
            width='7%'
            headerAlign='center'
            dataAlign='center'
            dataField='LZ_POS_MT_ID'
            dataSort
            hidden
          >
            LZ_POS_MT_ID{' '}
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    )
  }
}
export default SearchRepairDataTable
