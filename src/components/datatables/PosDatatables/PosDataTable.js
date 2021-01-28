import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import Select from 'react-select'
import $ from 'jquery'

const editButton = (cell, row) => {
  return (
    <React.Fragment>
      <Button
        className='btn btn-danger'
        size='sm'
        onClick={() => that.onClickDelete(cell, row)}
      >
        <span className='glyphicon glyphicon-trash p-b-5' aria-hidden='true' />
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
    { value: 'RT', label: 'Retail' },
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
class LineTypes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: true,
      line_type_id: ''
    }
  }
  handleChangeLine = line_type_id => {
    this.setState({
      ...this.state,
      line_type_id: line_type_id
    })
  }
  componentDidUpdate (prevProps, prevState) {
    if (
      prevState.line_type_id !== this.state.line_type_id &&
      this.state.line_type_id !== ''
    ) {
      const data = {
        barcode: this.props.row.BARCODE_NO,
        line_type: this.state.line_type_id.value
      }
      that.props.change_line_type(data, that.props.exempt)
    }
  }
  render () {
    const Line_types = [
      {
        value: 'PT',
        label: 'Parts'
      },
      { value: 'SR', label: 'Service' },
      { value: 'SH', label: 'Shipping' },
      { value: 'RT', label: 'Retail' },
      { value: 'OT', label: 'Other' }
    ]
    return (
      <React.Fragment>
        <div className='form-group'>
          <div className='form-group has-feedback' id='packing_type'>
            <Select
              id='state'
              options={Line_types}
              value={this.state.line_type_id}
              onChange={this.handleChangeLine}
              className='basic-select'
              classNamePrefix='select'
              required
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}
const line_Type = (cell, row) => {
  // if (row.LINE_TYPE == 'SR') {
  //   const Line_types = [
  //     // {
  //     //   value: 'PT',
  //     //   label: 'Parts'
  //     // },
  //     { value: 'SR', label: 'Service' }
  //     // { value: 'SH', label: 'Shipping' },
  //     // { value: 'OT', label: 'Other' }
  //   ]
  //   const val = Line_types.filter(item => item.value == 'SR')

  //   return (
  //     <React.Fragment>
  //       <div className='form-group'>
  //         <div className='form-group has-feedback' id='packing_type'>
  //           <Select
  //             id='state'
  //             options={Line_types}
  //             value={val[0]}
  //             // onChange={this.handleChangeLine}
  //             className='basic-select'
  //             classNamePrefix='select'
  //             required
  //           />
  //         </div>
  //       </div>
  //     </React.Fragment>
  //   )
  // } else {
  return <LineTypes row={row} cell={cell} />
  // }
}
var that = ''
class PosDataTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      button_status: false
    }
    that = this
  }
  onClickDelete = (cell, row) => {
    // console.log(row)
    this.props.delete_pos_barcode(cell)
  }
  renderShowsTotal (start, to, total) {
    return (
      <p style={{ color: '#696969' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    )
  }

  render () {
    const footerData = [
      [
        {
          label: 'Total',
          columnIndex: 0
        },
        {
          label: 'COST PRICE',
          columnIndex: 5,
          align: 'center',
          formatter: tableData => {
            let sum = 0
            for (
              let i = 0, tableDataLen = tableData.length;
              i < tableDataLen;
              i++
            ) {
              sum += Number(tableData[i].COST_PRICE)
            }
            $('#cost_price').val('$ ' + sum.toFixed(2))
            return <strong>{'$ ' + sum.toFixed(2)}</strong>
          }
        },
        {
          label: 'QUANTITY',
          columnIndex: 4,
          align: 'center',
          formatter: tableData => {
            let sum = 0
            for (
              let i = 0, tableDataLen = tableData.length;
              i < tableDataLen;
              i++
            ) {
              sum += Number(tableData[i].QUANTITY)
            }
            $('#quantity').val(sum)
            return <strong>{sum}</strong>
          }
        },
        {
          label: 'DISCOUNT_PER',
          columnIndex: 6,
          align: 'center',
          formatter: tableData => {
            let sum = 0
            for (
              let i = 0, tableDataLen = tableData.length;
              i < tableDataLen;
              i++
            ) {
              sum += Number(tableData[i].DISCOUNT_PER)
            }
            $('#dis_per').val('$ ' + sum.toFixed(2))
            return <strong>{'$ ' + sum.toFixed(2)}</strong>
          }
        },
        {
          label: 'DISCOUNT_AMOUNT',
          columnIndex: 7,
          align: 'center',
          formatter: tableData => {
            let sum = 0
            for (
              let i = 0, tableDataLen = tableData.length;
              i < tableDataLen;
              i++
            ) {
              sum += Number(tableData[i].DISCOUNT_AMOUNT)
            }
            $('#dis_amount').val('$ ' + sum.toFixed(2))
            return <strong>{'$ ' + sum.toFixed(2)}</strong>
          }
        },
        {
          label: 'NET_PRICE',
          columnIndex: 8,
          align: 'center',
          formatter: tableData => {
            let sum = 0
            for (
              let i = 0, tableDataLen = tableData.length;
              i < tableDataLen;
              i++
            ) {
              const value =
                tableData[i].NET_PRICE == null
                  ? tableData[i].COST_PRICE
                  : tableData[i].NET_PRICE
              sum += Number(value)
            }
            $('#net_price').val('$ ' + sum.toFixed(2))
            return <strong>{'$ ' + sum.toFixed(2)}</strong>
          }
        }
      ]
    ]
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
          value: this.props.pos_barcode_detail.length
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
        {this.props.pos_barcode_detail.length === 0 ? (
          ''
        ) : (
          <div className='row'>
            <div className='col-sm-12'>
              <div className='col-sm-2' style={{ float: 'right' }}>
                <div className='form-group'>
                  <label htmlFor='net_price' className='control-label'>
                    Total Net Price
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='net_price'
                    name='net_price'
                    disabled
                  />
                </div>
              </div>

              <div className='col-sm-2' style={{ float: 'right' }}>
                <div className='form-group'>
                  <label htmlFor='dis_amount' className='control-label'>
                    Total Dis Amount
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='dis_amount'
                    name='dis_amount'
                    disabled
                  />
                </div>
              </div>

              <div className='col-sm-2' style={{ float: 'right' }}>
                <div className='form-group'>
                  <label htmlFor='cost_price' className='control-label'>
                    Total Cost Price
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='cost_price'
                    name='cost_price'
                    disabled
                  />
                </div>
              </div>

              <div className='col-sm-2' style={{ float: 'right' }}>
                <div className='form-group'>
                  <label htmlFor='quantity' className='control-label'>
                    Total Quantity
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='quantity'
                    name='quantity'
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <BootstrapTable
          data={this.props.pos_barcode_detail}
          striped
          // hover
          condensed
          pagination
          search
          options={options}
          searchPlaceholder='Search...'
          csvFileName='Barcode Detail'
          exportCSV
          footerData={footerData}
          footer
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
            editable={false}
            dataField='LINE_TYPE'
            dataFormat={line_Type}
            dataSort
          >
            Line Type
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
            dataField='ITEM_MT_DESC'
            dataSort
            editable={false}
          >
            Description
          </TableHeaderColumn>

          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='QUANTITY'
            dataSort
            editable={false}
          >
            Quantity
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
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
            dataField='DISCOUNT_PER'
            editable
            dataFormat={dis_per}
            dataSort
          >
            Dis %
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='DISCOUNT_AMOUNT'
            editable
            dataFormat={dis_amount}
            dataSort
          >
            Dis Amt
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
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='BARCODE_NO'
            dataFormat={Dis_Charge}
            dataSort
          >
            MPN|UPC|Manuf| Condi
          </TableHeaderColumn>
          {/* <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='LINE_TYPE'
            dataFormat={line_val}
            dataSort
          >
            Line Type
          </TableHeaderColumn> */}
        </BootstrapTable>
      </React.Fragment>
    )
  }
}
export default PosDataTable
